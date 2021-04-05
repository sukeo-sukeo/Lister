<template>
<!-- <div> -->
  <div class="btn-wrapper">
    <button 
     class="create-btn"
     @click="$emit('capture')"
    >{{btnName}}</button>
  </div>
<!-- </div> -->
</template>

<script>
export default {
  name: 'CreateBtn',
  data: () => {
    return {
      btnName: 'createList'
    }
  },
  methods: {
    
  }
}
</script>

<style scoped>
.btn-wrapper {
  text-align: center;
  align-self: center;
}

.create-btn {
  width: 214px;
  height: 52px;
  background: #54EF89;
  border-radius: 25px;
  font-family: Rhodium Libre;
  font-style: normal;
  font-weight: normal;
  font-size: 1.8rem;
  line-height: 51px;
  text-align: center;
}
</style>