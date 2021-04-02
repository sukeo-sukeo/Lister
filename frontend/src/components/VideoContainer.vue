<template>
<div>
  <div class="video-outer">
    <video ref="myVideo" width="335" :height="videoHeight" autoplay playsinline>
    </video>
    <canvas ref="canvas" width="335" :height="videoHeight"></canvas>
    <loader-circle v-show="loading"/>
  </div>
  <div class="btn-outer" :style="{height: createBtnHeight + 'px' }">
    <create-btn @capture="capture"/>
  </div>
</div>
</template>

<script>
import CreateBtn from './components_parts/CreateBtn.vue';
import LoaderCircle from './components_parts/LoaderCircle.vue';

export default {
  components: { CreateBtn, LoaderCircle },
  name: 'VideoContainer',
  props: {
    videoHeight: String,
    createBtnHeight: String
  },
  data: () => {
    return {
      loading: false,
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
      this.$emit('stream', this.stream.active)
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
      // this.stop()
      localStorage.removeItem('Lister')
      
      const video = this.$refs.myVideo
      // const canvas = document.createElement('canvas')
      const canvas = this.$refs.canvas
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

      let URL;
      console.log(location.hostname);
      if (location.hostname === 'localhost') {
        URL = `http://localhost:5000/lister-424b3/us-central1/app/`;
      } else {
        URL = location.href;
      }
    
      // const URL = 'http://localhost:5000/lister-424b3/us-central1/app/'
      // const URL = 'https://lister-424b3.firebaseapp.com/'
      // const URL = `http://localhost:3000/`
      console.log(URL);

      // this.loading = true

      fetch(URL + "posts", data)
        .then(res => res.text())
        .then(data => this.$emit('fetch-result-data', data))
      
      // this.loading = false
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

canvas {
  position: absolute;
  margin: 0 20px;
  left: 0;
  z-index: -1;
}

.btn-outer {
  display: flex;
  justify-content: center;
}

</style>

