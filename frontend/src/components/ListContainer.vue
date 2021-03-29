<template>
<div>
  <ul>
    <li v-for="n of 5" :key="n">
      <label for="">
        <input type="checkbox" id="">
        <span>test{{n}}</span>
      </label>
    </li>
  </ul>
</div>
</template>

<script>
export default {

}
</script>

<style scoped>
ul {
  width: 640px; 
  height: 480px;
}
</style>