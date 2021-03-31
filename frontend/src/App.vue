<template>
  <div>
    <header-bar/>
    <div class="main-content">
      <component ref="videoContainer" :is="currentView"></component>
    </div>
    <footer-bar
    @changeMainContent="changeMainContent"
    />
  </div>
</template>

<script>
import HeaderBar from './components/HeaderBar.vue'
import FooterBar from './components/FooterBar.vue'
import VideoContainer from './components/VideoContainer.vue'
import ListContainer from './components/ListContainer.vue'


export default {
  name: 'App',
  components: {
    HeaderBar,
    FooterBar,
    // CreateBtn,
    VideoContainer,
    ListContainer,
  },
  data: () => {
    return {
      currentView: 'VideoContainer',
      URL: '',
      video: ''
    }
  },
  methods: {
    changeMainContent(iconName) {
      switch (iconName) {
        case 'camera':
          this.currentView = 'VideoContainer'
          break;
        case 'list':
          this.$refs.videoContainer.stop()
          this.currentView = 'ListContainer'
          break; 
        case 'delete':
          console.log('deleteします！');
          break; 
        case 'chart':
          console.log('chart機能乞うご期待！');
          break; 
      }
    }
  },
  created() {
    this.URL = location.href
    console.log(this.URL);
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Rhodium+Libre&display=swap');

</style>