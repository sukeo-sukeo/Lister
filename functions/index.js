'use strict'

const functions = require("firebase-functions");

const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const cors = require("cors");
// const port = 3000;
const ocr = require('./ocr.js')

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// firebase realtimeDB////////////////////////
const admin = require("firebase-admin");
// const serviceAccount = require("path/to/lister-424b3-firebase-adminsdk-xzq34-56154fb7bf.json");
// const serviceAccount = require("/Users/yusuke/Documents/working/firebaseProject/checkmaker_app/functions/lister-424b3-firebase-adminsdk-xzq34-56154fb7bf.json");
// const { ref } = require("firebase-functions/lib/providers/database");
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  // credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://lister-424b3-default-rtdb.firebaseio.com",
});
const db = admin.database()
// create is set
// read is on
// update is update
// delete is remove

// test
app.get('/v1/test', (req, res) => {
  console.log('console log test');
  res.send('res send test')
})

// 初期読み出し
// read
app.get('/load/lists', async (req, res) => {
  const uid = req.query.uid
  db.ref(`lists/${uid}`).once("value", snapshot => res.json({ data: snapshot.val() }))}
  )

// 指定の1件の読み出し
// read
app.get("/load/list", async (req, res) => {
  const listID = req.query.id
  const uid = req.query.uid
  db.ref(`lists/${uid}/${listID}`).once("value", snapshot => res.json({ data: snapshot.val() }))
});

// 指定の1件の削除
// delete
app.get("/delete/list", async (req, res) => {
  const listID = req.query.key
  const uid = req.query.uid
  db.ref(`lists/${uid}/${listID}`).remove();
  res.json({msg: 'dbok'})
  // db.ref('lists/').on("value", snapshot => res.json({ data: snapshot.val() }))
});

// タイトルの変更処理
// 該当するキーのtitle:をnewTitleへ変更
// update(listのタイトル)
app.get("/update/list", async (req, res) => {
  const listID = req.query.key;
  const newTitle = req.query.newtitle;
  const uid = req.query.uid
  // dbをアップデート
  db.ref(`lists/${uid}`).child(listID).update({ title: newTitle });
  // console.log(tmp);
  res.json({ msg: "dbok" });
  // アップデート後の呼び出し
  // db.ref('lists/').on("value", snapshot => res.json({ data: snapshot.val() }))
});

// userdataをとってくる
app.post("/load/user", async (req, res) => {
  const data = JSON.parse(req.body);
  const uid = data.uid
  db.ref("lists/" + uid).once("value", (snapshot) =>
    res.json({ data: snapshot.val() })
  );
})

// create listの保存
app.post("/save/list", async (req, res) => {
  const data = JSON.parse(req.body)
  const uid = data.uid
  const count = data.count
  const listId = data.listId
  const time = data.time
  const listData = data.listData
  const listTitle = data.listTitle
  console.log(uid, count);
  // console.log(listTitle);
  // console.log(listData);
  // console.log(uuid);
  // console.log(time);
  db.ref(`lists/${uid}/${listId}`).set({
    title: listTitle,
    lists: listData,
    time: time
  })
  res.json({ msg: "dbok" });
  // db.ref(`lists/`).on("value", snapshot => res.json({ data: snapshot.val() }))
});

// create userデータの登録
app.post('/regist/user', async (req, res) => {
  const user = JSON.parse(req.body)
  const uid = user.uid
  const name = user.name
  console.log(user);
  console.log(name);
  console.log(uid);
  db.ref(`lists/${uid}`).set({
    username: name,
    apicount: 0
  })
  res.json({ username: name, apicount: 0 })
})

////////////////////////////////////////////////////


// ocr処理
app.post("/posts", async (req, res) => {
  console.log('posts');
  const data = JSON.parse(req.body)

  let apicount = data.count
  const uid = data.uid
  const imgData = data.img
  console.log(uid, 'apicount:', apicount);
  
  const b64img = imgData.split(',')[1]
  const base64 = require("urlsafe-base64");
  const img = base64.decode(b64img);
  
  let result = await ocr.detectText(img)

  if (!result) {
    result = 'テキストが認識できませんでした'
  }

  apicount++
  db.ref(`lists/${uid}`).update({ apicount : apicount });
  res.status(200).json({ result, apicount })

});

exports.app = functions.https.onRequest(app);
// app.listen(port, () => console.log(`Example app listening on port ${port}!`));
