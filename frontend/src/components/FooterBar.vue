<template>
<div class="footer">
  <footer-menu
  :currentView="currentView"
  @menu-icon-click-parts="$listeners['menu-icon-click']"/>
</div>
</template>

<script>
import FooterMenu from './components_parts/FooterMenu.vue'
export default {
  components: { FooterMenu },
  props: {
    // clickInLoadList: Boolean,
    currentView: Object
  },
  name: 'FooterBar' 
}
</script>

<style scoped>
.footer {
  width: 100%;
  height: 60px;
  background: #C3E1FD;
  position: absolute;
  bottom: 0;
  padding-bottom: 4px;
}
</style>