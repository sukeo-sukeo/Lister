<template>
<div class="header">
  <div class="header-inner">
    <title-logo
     @title-logo-click="$listeners['title-logo-click']"
     :title=title />
    <span>username</span>
    <plus-list-btn
     v-show="currentView.list"
     @plus-icon-click-parts="$listeners['plus-icon-click']"
    />
    <button @click="$emit('logout-btn-click')"
    v-show="!currentView.list"
    v-if="!currentView.login"
    >{{ isLogin? 'ログアウト' : 'ログイン' }}</button>
  </div>
</div>
</template>

<script>
import PlusListBtn from './components_parts/PlusListBtn.vue'
import TitleLogo from './components_parts/TitleLogo.vue'

export default {
  name: 'HeaderBar',
  components: { TitleLogo, PlusListBtn},
  props: {
    isLogin: Boolean,
    currentView: Object
  },
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