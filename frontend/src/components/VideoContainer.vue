<template>
<div>
  <video ref="myVideo" width="335" height="480" autoplay playsinline></video>
  <create-btn @capture="capture"/>
</div>
</template>

<script>
import CreateBtn from './components_parts/CreateBtn.vue';

export default {
  components: { CreateBtn },
  name: 'VideoContainer',
  data: () => {
    return {
      stream: '',
    }
  },
  methods: {
    getDeviceStream(option) {
      if ("getUserMedia" in navigator.mediaDevices) {
        return navigator.mediaDevices.getUserMedia(option);
      } else {
        return new Promise(function (resolve, reject) {
          navigator.getUserMedia(option, resolve, reject);
        });
      }
    },
    async loadAndPlay() {
      const video = this.$refs.myVideo
      this.stream = await this.getDeviceStream({
        video: { facingMode: "environment" },
        audio: false,
      })
      video.srcObject = this.stream
    },
    stop() {
      const video = this.$refs.myVideo
      const tracks = this.stream.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
      video.srcObject = null;
    },
    async capture() {
      const video = this.$refs.myVideo
      const canvas = document.createElement('canvas')
      const context = canvas.getContext("2d");

      context.drawImage(video, 0, 0, video.width, video.height);
      // data:image/png;base64,iVBORw0KGgoAAAAN.... base64に変換
      const imgData = await canvas.toDataURL("001.png");
      this.sendImage(imgData)
    },
    sendImage(imgData) {
      const data = {
        method: "POST",
        body: imgData
      }
    
      // const URL = 'http://localhost:5000/lister-424b3/us-central1/app/'
      const URL = 'https://lister-424b3.firebaseapp.com/'
      console.log(URL);
      // const URL = `http://localhost:3000/`
      fetch(URL + "posts", data)
        .then(res => res.text())
        .then(data => this.$emit('fetch-result-data', data))
    }
  },
  mounted() {
    this.loadAndPlay()
  },
  created() {
    
  }
}

</script>

<style scoped>
video {
  background: black;
  margin: 0 20px;
}
</style>

