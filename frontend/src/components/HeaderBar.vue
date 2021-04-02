<template>
<div class="header">
  <div class="header-inner">
    <title-logo :title=title />
    <plus-list-btn
     @plus-icon-click-parts="$listeners['plus-icon-click']"
    />
  </div>
</div>
</template>

<script>
import PlusListBtn from './components_parts/PlusListBtn.vue'
import TitleLogo from './components_parts/TitleLogo.vue'

export default {
  name: 'HeaderBar',
  components: { TitleLogo, PlusListBtn },
  data: () => {
    return {
      title: 'Lister'
    }
  }
}
</script>

<style scoped>
.header {
  height: 44px;
  background: #C3E1FD;
}
.header-inner {
  display: flex;
  justify-content: space-between;
}
</style>