<template>
  <div>
    <header-bar/>
    <div class="main-content">
      <component :is="currentView"></component>
      <!-- <video-container @video="video" /> -->
    </div>
    <footer-bar
    @changeToListContainer="changeToListContainer(icon)"
    />
  </div>
</template>

<script>
import HeaderBar from './components/HeaderBar.vue'
import FooterBar from './components/FooterBar.vue'
// import CreateBtn from './components/CreateBtn.vue'
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
    changeToListContainer(icon) {
      console.log(icon);
      this.currentView = 'ListContainer'
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