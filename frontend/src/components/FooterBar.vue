<template>
<div class="footer">
  <footer-menu @menu-icon-click="$listeners['changeMainContent']"/>
</div>
</template>

<script>
import FooterMenu from './components_parts/FooterMenu.vue'
export default {
  components: { FooterMenu },
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
}
</style>