<template>
<div>
  <div class="btn-wrapper">
    <button 
     class="create-btn"
     @click="$emit('capture')"
    >{{btnName}}</button>
  </div>
</div>
</template>

<script>
export default {
  name: 'CreateBtn',
  data: () => {
    return {
      btnName: 'create Liste'
    }
  }
}
</script>

<style scoped>
.btn-wrapper {
  text-align: center;
  margin-top: 8px;
}

.create-btn {
  width: 214px;
  height: 52px;
  background: #54EF89;
  border-radius: 25px;
  font-family: Rhodium Libre;
  font-style: normal;
  font-weight: normal;
  font-size: 30px;
  line-height: 51px;
  text-align: center;
}
</style>