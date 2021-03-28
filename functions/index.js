'use strict'

const functions = require("firebase-functions");

const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const cors = require("cors");
const port = process.env.PORT || 3000;
const ocr = require('./ocr.js')

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post("/posts", async (req, res) => {
  const b64img = req.body.split(',')[1]
  const base64 = require("urlsafe-base64");
  const img = base64.decode(b64img);

  // const result = await ocr.detectText(img)
  
  const result = `test
  test
  test
  test
  test
  test`
  res.status(200).send(result)

});

exports.app = functions.https.onRequest(app);
// app.listen(port, () => console.log(`Example app listening on port ${port}!`));
