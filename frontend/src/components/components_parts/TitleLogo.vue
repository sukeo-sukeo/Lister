<template>
<div>
  <h1>
    {{ title }}
  </h1>
</div>
</template>

<script>
export default {
  name: 'TitleLogo',
  props: {
    title: String
  } 
}
</script>

<style scoped>
h1 {
  margin: 0;
  margin-left: 20px;
  font-family: 'Rhodium Libre', serif;
  font-style: normal;
  font-weight: normal;
  font-size: 32px;
  line-height: 52px;
  display: flex;
  align-items: center;
}
</style>