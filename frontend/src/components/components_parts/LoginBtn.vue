<template>
<div>
  <div
  class="log-btn"
  :class="isLogin? 'logined': ''"
  @click="$emit('log-btn-click')"
  >
  <span class="iconify" data-inline="false" data-icon="ic:baseline-login"></span>
  </div>
  <!-- <button
  class="log-btn"
  @click="$emit('log-btn-click')"
  >{{ isLogin? 'ログアウト' : 'ログイン' }}</button> -->
</div>
</template>

<script>
export default {
  name: 'LoginBtn',
  props: {
    isLogin: Boolean
  }
}
</script>

<style scoped>
.log-btn {
  height: 44px;
  font-size: 32px;
  line-height: 52px;
  margin-right: 20px;
}

.logined {
  opacity: .5;
}
</style>