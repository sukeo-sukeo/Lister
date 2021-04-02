<template>
<div>
  <div class="remove-list-icon"
   @click="$emit('remove-icon-click-parts')"
  >
    <span class="iconify" data-inline="false" data-icon="ic:baseline-minus"></span>
  </div>
</div>
</template>

<script>


export default {
  name: 'removeListBtn',
  
}
</script>

<style scoped>
.remove-list-icon {
  height: 44px;
  font-size: 32px;
  line-height: 52px;
  margin-right: 20px;
}
</style>