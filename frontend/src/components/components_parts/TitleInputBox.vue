<template>
<div class="input-outer">
  <input type="text" placeholder="" value="new List">
</div>
</template>

<script>
export default {
  name: 'TitleInputBox'
}
</script>

<style scoped>
.input-outer {
  display: flex;
  justify-content: center;
}
input {
  color: gray;
  border: none;
  height: 32px;
  font-size: 28px;
  width: 80%;
  border-bottom: solid 2px lightgray;
  /* font-family: 'Rhodium Libre', serif; */
  font-style: normal;
  font-weight: normal;
}

</style>