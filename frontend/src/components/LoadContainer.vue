<template>
<div>
  <ul :style="{height: listContainerHeight + 'px' }">
    <li class="list-name"
     v-for="(listData, key) in listsData" :key="key">
     <span
     @click="$emit('db-listdata-click', key)"
     >
      {{key}}
     </span>
     <span class="edit">
       <span class="iconify" data-inline="false" data-icon="ic:baseline-edit"></span>
     </span>
      <span class="delete"
       @click="deleteList(key)">
        <span class="iconify"
        data-inline="false" data-icon="ic:baseline-delete"></span>
      </span>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  name: 'LoadContainer',
  props: {
    listsData: [Array, Object],
    listContainerHeight: String,
  },
  methods: {
    deleteList(key) {
      let URL;
      if (location.hostname === 'localhost') {
        URL = `http://localhost:5000/lister-424b3/us-central1/app/`;
      } else {
        URL = location.href;
      }
      console.log(key);
      console.log(URL);
      // fetch(URL + `delete/list?key=${key}`)
      //   .then(res => res.text())
      //   .then(console.log)
    },
  },
  mounted() {
    console.log(this.listsData);
  }
}
</script>

<style scoped>
ul {
  overflow: scroll;
  font-size: 24px;
  list-style: none;
  padding: 0;
  margin: 0 20px;
  margin-top: 20px;
  width: 335px; 
  /* height: 480px; */
}

.iconify {
  margin-left: 5px;
  opacity: .3;
}



.delete {
  float: right;
}
</style>