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
  display: flex;
  /* justify-content: flex-end; */
  align-items: center;
}
</style>