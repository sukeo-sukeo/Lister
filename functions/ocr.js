'use strict'

async function detectText(fileName) {
  // [START vision_text_detection]
  const vision = require("@google-cloud/vision");

  // Creates a client
  const client = new vision.ImageAnnotatorClient();

  // Performs text detection on the local file
  const [results] = await client.textDetection(fileName);

  let result;
  if (!results.textAnnotations.length) {
    result = "";
  } else {
    result = results.textAnnotations[0].description;
  }

  return result
}

exports.detectText = detectText