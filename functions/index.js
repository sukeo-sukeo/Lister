'use strict'

const functions = require("firebase-functions");

const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const cors = require("cors");
const port = 3000;
const ocr = require('./ocr.js')

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post("/posts", async (req, res) => {
  console.log('posts');
  const b64img = req.body.split(',')[1]
  const base64 = require("urlsafe-base64");
  const img = base64.decode(b64img);
  
  let result = await ocr.detectText(img)
//   let result = `ハロー ハロー
// 河原木忠司口
// DVD D`;
  if (!result) {
    result = 'テキストが認識できませんでした'
  }

  res.status(200).send(result)

});
exports.app = functions.https.onRequest(app);
// app.listen(port, () => console.log(`Example app listening on port ${port}!`));
