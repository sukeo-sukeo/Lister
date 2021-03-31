<template>
  <div>
    <header-bar/>
    <div class="main-content">
      <component 
      ref="useChildMethods"  
      @fetch-result-data="textToData"
      :todoText="todoText"
      :is="currentView"></component>
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
      URL: '',
      video: '',
      todoText: '',
      currentView: 'VideoContainer',
    }
  },
  methods: {
    changeMainContent(iconName) {
      switch (iconName) {
        case 'camera':
          this.currentView = 'VideoContainer'
          break;
        case 'list':
          this.$refs.useChildMethods.stop()
          this.currentView = 'ListContainer'
          break; 
        case 'delete':
          console.log('deleteします！');
          break; 
        case 'chart':
          console.log('chart機能乞うご期待！');
          break; 
      }
    },
    textToData(data) {
      this.todoText = data
      this.$refs.useChildMethods.stop()
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