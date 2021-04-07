<template>
<div class="counter">
  <span>{{ counter }}</span>
</div>
</template>

<script>
export default {
  name: 'ApiCounter',
  props: {
    counter: Number
  },
  data: () => {
    return {
      count: 0
    }
  },
  methods: {
    add() {
      this.count ++
    }
  }
}
</script>

<style scoped>
.counter {
  /* flex-grow: 2; */
  color: gray;
  font-family: 'Rhodium Libre', serif;
  font-style: normal;
  font-weight: normal;
}
</style>