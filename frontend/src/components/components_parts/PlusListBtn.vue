<template>
<div>
  <div class="plus-list-icon"
   @click="$emit('plus-icon-click-parts')"
  >
    <span class="iconify" data-inline="false" data-icon="ic:baseline-plus"></span>
  </div>
</div>
</template>

<script>


export default {
  name: 'PlusListBtn',
  
}
</script>

<style scoped>
.plus-list-icon {
  height: 44px;
  font-size: 32px;
  line-height: 52px;
  margin-right: 20px;
}
</style>