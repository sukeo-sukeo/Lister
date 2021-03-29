<template>
<div class="header">
  <div class="header-inner">
    <title-logo :title=title />
    <menu-icon/>
  </div>
</div>
</template>

<script>
import MenuIcon from './componetnst_parts/MenuIcon.vue'
import TitleLogo from './componetnst_parts/TitleLogo.vue'

export default {
  name: 'HeaderBar',
  components: { TitleLogo, MenuIcon },
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