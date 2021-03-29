<template>
<div>
  <video id="myVideo" width="335" height="480" autoplay playsinline></video>
</div>  
</template>

<script>
export default {
  name: 'VideoContainer'
}
</script>

<style scoped>
#myVideo {
  background: gray;
  margin: 0 20px;
}
</style>