<template>
  <div>

    <header-bar
    @plus-icon-click="addListLine"
    />

    <div class="main-content">
      <video-container
       v-if="currentView.video"
       ref="useVideoContainerMethods"
       @fetch-result-data="textToData"
       :videoHeight="videoHeight"
       :createBtnHeight="createBtnHeight"
      />
      <list-container
       v-if="currentView.list"
       ref="useListContainerMethods"
       @save-return-list="updateLoadContainer"
       :listContainerHeight="listContainerHeight"
       :todoText="todoText"
      />
      <load-container
       v-if="currentView.load"
       @db-listdata-click="fetchOneListData"
       :listsData="listsData"
       :listContainerHeight="listContainerHeight"
      />
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
import LoadContainer from './components/LoadContainer'


export default {
  name: 'App',
  components: {
    HeaderBar,
    FooterBar,
    // CreateBtn,
    VideoContainer,
    ListContainer,
    LoadContainer,
  },
  data: () => {
    return {
      videoHeight: '',
      createBtnHeight: '',
      listContainerHeight: '',
      URL: '',
      video: '',
      todoText: '',
      listsData: [],
      currentView: {
        video: true,
        list: false,
        load: false,
      },
    }
  },
  methods: {
    changeMainContent(iconName) {
      if (iconName !== 'camera' && this.currentView.video) {
        this.$refs.useVideoContainerMethods.stop()
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
        case 'save':
          if (this.currentView.list) {
            this.$refs.useListContainerMethods.saveListToDB()
          }
          break; 
        case 'load':
          if (this.currentView.load) {
            return
          } else {
            this.toloadView()
          }
          break; 
      }
    },
    toVideoView() {
      this.currentView.video = true
      this.currentView.list = false
      this.currentView.load = false
    },
    toListView() {
      this.currentView.video = false
      this.currentView.list = true
      this.currentView.load = false
    },
    toloadView() {
      this.currentView.video = false
      this.currentView.list = false
      this.currentView.load = true
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
    updateLoadContainer(data) {
      // this.toListView()
      this.listsData = data
    },
    fetchOneListData(dataKey) {
      console.log(dataKey);
      fetch(this.URL + `load/list?id=${dataKey}`)
      .then(res => res.text())
      .then(data => {
        console.log(data);
        localStorage.setItem('Lister', data)
        this.toListView()
      })
    }
  },
  created() {
    if (location.hostname === 'localhost') {
      this.URL = `http://localhost:5000/lister-424b3/us-central1/app/`;
    } else {
      this.URL = location.href;
    }
    console.log(this.URL);
    fetch(this.URL + `load/lists`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      this.updateLoadContainer(data)
    })
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
    this.listContainerHeight = String(main_H - 44)
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Rhodium+Libre&display=swap');
.main-content {
  margin-top: 20px;
}
</style>