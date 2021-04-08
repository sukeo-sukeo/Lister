<template>
<div class="under-menu-outer">
  <copylight-bar/>
  <!-- <api-counter/> -->
</div>
</template>

<script>
// import ApiCounter from './components_parts/ApiCounter.vue'
import CopylightBar from './components_parts/CopylightBar.vue'

export default {
  name: 'UnderSubmenu',
  components: {CopylightBar}
}
</script>

<style scoped>
.under-menu-outer {
  width: 100%;
  height: 24px;
  display: flex;
  position: absolute;
  bottom: 60px;
  /* justify-content: flex-end; */
  align-items: center;
}

</style>