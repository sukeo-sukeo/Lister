<template>
<div>
  <play-btn @loadAndPlay="loadAndPlay"/>
  <stop-btn @stop="stop" />
  <video ref="myVideo" width="335" height="480" autoplay playsinline></video>
  <create-btn @capture="capture"/>
</div>
</template>

<script>
import PlayBtn from './components_parts/PlayBtn.vue';
import StopBtn from './components_parts/StopBtn.vue';
import CreateBtn from './components_parts/CreateBtn.vue';

export default {
  components: { PlayBtn, StopBtn, CreateBtn },
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
      // console.log(video);
      // this.$emit(video)
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
    
      // const URL = location.href
      const URL = `http://localhost:3000/`
      console.log(data.body);
      console.log(URL + 'posts');
      // fetch(URL + "posts", data)
      //   .then(res => res.text())
      //   // .then(data => creatCheckList(data))
      //   .then(data => console.log(data))
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

