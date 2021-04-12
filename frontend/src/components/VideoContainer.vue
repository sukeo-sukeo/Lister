<template>
<div>
  <div class="video-outer">
    <video ref="myVideo" width="335" :height="videoHeight" autoplay playsinline>
    </video>
    <canvas ref="canvas" width="335" :height="videoHeight"></canvas>
    <api-counter :counter="apiCounter"/>
    <loader-circle v-if="loading"/>
  </div>
  <div class="btn-outer" :style="{height: Number(createBtnHeight) - Number(28) + 'px' }">
    <create-btn 
    :isLogin="isLogin"
    @capture="capture"/>
  </div>
  <under-submenu/>
</div>
</template>

<script>
import ApiCounter from './components_parts/ApiCounter.vue';
import CreateBtn from './components_parts/CreateBtn.vue';
import LoaderCircle from './components_parts/LoaderCircle.vue';
import UnderSubmenu from './UnderSubmenu.vue';

export default {
  components: { CreateBtn, LoaderCircle, UnderSubmenu, ApiCounter },
  name: 'VideoContainer',
  props: {
    isLogin: Boolean,
    apiCounter: Number,
    uid: String,
    videoHeight: String,
    createBtnHeight: String,
    baseURL: String
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
      if (!this.isLogin) {
        alert('こちらの機能は登録後使用できます')
        this.$emit('notloggedin-createbtn-click')
        return
      }
      // this.stop()
      localStorage.removeItem('Lister')
      localStorage.removeItem('ListTitle')
      
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
      const json = JSON.stringify({
        img: imgData,
        uid: this.uid,
        count: this.apiCounter
      })
      const data = {
        method: "POST",
        body: json
      }

      // console.log(this.baseURL);
      this.loading = true

      fetch(this.baseURL + "posts", data)
        .then(res => res.json())
        .then(data => {
          console.log(data.result);
          console.log(data.apicount);
          this.$emit('fetch-result-data', data)
          this.loading = false
        })
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

/* .under-menu-outer {
  height: 26px;
  line-height: 44px;
} */

.counter {
  position: absolute;
  margin-left: 20px;
  left: 0%;
}
</style>

