<template>
  <div>

    <header-bar
    @plus-icon-click="addListLine"
    />

    <div class="main-content">
      <video-container
       v-if="currentView.video"
       ref="useVideoContainerMethods"
       @stream="streamCheck"
       @fetch-result-data="textToData"
       :videoHeight="videoHeight"
       :createBtnHeight="createBtnHeight"
      />
      <list-container
       v-if="currentView.list"
       ref="useListContainerMethods"
       :todoText="todoText"
      />
      <stock-container
       v-if="currentView.stock"
      />
    
      <!-- <component 
      ref="useVideoContainerMethods"  
      @fetch-result-data="textToData"
      :todoText="todoText"
      :videoHeight="videoHeight"
      :createBtnHeight="createBtnHeight"
      :is="currentView"></component> -->
    </div>
    
    <footer-bar
    @menu-icon-click="changeMainContent"
    />

  </div>
</template>

<script>
import HeaderBar from './components/HeaderBar.vue'
import FooterBar from './components/FooterBar.vue'
import VideoContainer from './components/VideoContainer.vue'
import ListContainer from './components/ListContainer.vue'
import StockContainer from './components/StockContainer.vue'


export default {
  name: 'App',
  components: {
    HeaderBar,
    FooterBar,
    // CreateBtn,
    VideoContainer,
    ListContainer,
    StockContainer,
  },
  data: () => {
    return {
      videoHeight: '',
      createBtnHeight: '',
      videoActive: Boolean,
      URL: '',
      video: '',
      todoText: '',
      // currentView: 'VideoContainer',
      currentView: {
        video: true,
        list: false,
        stock: false,
      },
    }
  },
  methods: {
    changeMainContent(iconName) {
      if (iconName !== 'camera') {
        if (this.videoActive) {
          this.$refs.useVideoContainerMethods.stop()
          this.videoActive = false
        }
      } else {
        this.videoActive = true
      }
      switch (iconName) {
        case 'camera':
          if (this.currentView.video) {
            return
          } else {
            this.toVideoView()
          }
          break;
        case 'list':
          if (this.currentView.list) {
            return
          } else {
            this.toListView()
          }
          break; 
        case 'delete':
          if (this.currentView.list) {
             this.$refs.useListContainerMethods.resetStore()
          }
          break; 
        case 'stock':
          if (this.currentView.stock) {
            return
          } else {
            this.toStockView()
          }
          break; 
      }
    },
    toVideoView() {
      this.currentView.video = true
      this.currentView.list = false
      this.currentView.stock = false
    },
    toListView() {
      this.currentView.video = false
      this.currentView.list = true
      this.currentView.stock = false
    },
    toStockView() {
      this.currentView.video = false
      this.currentView.list = false
      this.currentView.stock = true
    },
    addListLine() {
      if (this.currentView.list) {
        this.$refs.useListContainerMethods.addListLine()
      }
    },
    textToData(data) {
      this.todoText = data
      this.$refs.useVideoContainerMethods.stop()
      this.toListView()
    },
    streamCheck(active) {
      console.log(active);
      this.videoActive = active
    }
  },
  created() {
    this.URL = location.href
    console.log(this.URL);
  },
  mounted() {
    const h_f_px = 112 //52px + 60px
    const mt_px = 20 //maincontent margintop 20px
    const innerH = innerHeight
    const main_H = innerHeight - (h_f_px + mt_px)
    const videoH = innerHeight * 0.6
    const c_btnH = main_H - videoH
    console.log('inner', innerH);
    console.log('main_', main_H);
    console.log('video', videoH);
    console.log('c_btn', c_btnH);
    this.videoHeight = String(videoH)
    this.createBtnHeight = String(c_btnH)
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Rhodium+Libre&display=swap');
.main-content {
  margin-top: 20px;
}
</style>