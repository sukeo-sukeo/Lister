'use strict'

let URL;

document.addEventListener('DOMContentLoaded', () => {
  console.log(location.hostname);
  if (location.hostname === 'localhost') {
    URL = `http://localhost:5000/lister-424b3/us-central1/app/`;
  } else {
    URL = `https://lister-424b3.web.app/`;
  }
})

let stream;

const creatCheckList = (data) => {
  if (data === "") return;
  const ul = document.getElementById("checkLists");
  const arry = data.split("\n");
  console.log(arry);
  arry.forEach((text, i) => {
    const li = document.createElement("li");
    const label = document.createElement("label");
    label.setAttribute("for", `list_${i}`);
    const input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.setAttribute("id", `list_${i}`);
    const span = document.createElement("span");
    span.textContent = text;

    label.appendChild(input);
    label.appendChild(span);
    li.appendChild(label);
    ul.appendChild(li);
  });
};

async function loadAndPlay() {
  const video = document.getElementById("myVideo");
  stream = await getDeviceStream({
    video: { facingMode: "environment" },
    audio: false,
  });
  video.srcObject = stream;
  
}

function stop() {
  const video = document.getElementById("myVideo");
  const tracks = stream.getTracks();
  tracks.forEach((track) => {
    track.stop();
  });
  video.srcObject = null;
}

function capture() {
  const video = document.getElementById("myVideo");
  const canvas = document.getElementsByTagName("canvas")[0];
  const context = canvas.getContext("2d");

  context.drawImage(video, 0, 0, video.width, video.height);

  // data:image/png;base64,iVBORw0KGgoAAAAN.... base64に変換
  const imgData = canvas.toDataURL("001.png");
  sendImage(imgData);
}

function sendImage(imgData) {

  const data = {
    method: "POST",
    body: imgData
  }

  fetch(URL + "posts", data)
    .then(res => res.text())
    .then(data => creatCheckList(data))
}

// 未実装 
function download(blob) {
  console.log(URL.createObjectURL(blob));
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "screenshot.jpg";
  document.body.appendChild(a);
  a.textContent = '写真をデバイスに保存'
  // a.click();
}

function getDeviceStream(option) {
  if ("getUserMedia" in navigator.mediaDevices) {
    return navigator.mediaDevices.getUserMedia(option);
  } else {
    return new Promise(function (resolve, reject) {
      navigator.getUserMedia(option, resolve, reject);
    });
  }
}