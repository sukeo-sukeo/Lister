<template>
<div class="header">
  <div class="header-inner">
    <title-logo
     @title-logo-click="$listeners['title-logo-click']"
     :title=title />
    <span class="username">{{username}}</span>
    <plus-list-btn
     v-show="currentView.list"
     @plus-icon-click-parts="$listeners['plus-icon-click']"
    />
    <login-btn 
    @log-btn-click="$listeners['logout-btn-click']"
    v-show="!currentView.list"
    v-if="!currentView.login"
    :isLogin="isLogin"
    />
  </div>
</div>
</template>

<script>
import LoginBtn from './components_parts/LoginBtn.vue'
import PlusListBtn from './components_parts/PlusListBtn.vue'
import TitleLogo from './components_parts/TitleLogo.vue'

export default {
  name: 'HeaderBar',
  components: { TitleLogo, PlusListBtn, LoginBtn },
  props: {
    isLogin: Boolean,
    currentView: Object,
    username: String
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
.username {
  font-family: 'Rhodium Libre', serif;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 52px;
}
</style>