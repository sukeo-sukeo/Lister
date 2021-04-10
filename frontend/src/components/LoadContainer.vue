<template>
<div>
  <ul :style="{height: Number(listContainerHeight) + Number(56) + 'px' }">
    <li class="list-name"
     v-for="(listData, key) in listsData" :key="key">
      <span
       @click="$emit('db-listdata-click', key)"
      >
      {{ listData.title }}
      <!-- {{Object.keys(listData)[0]}} -->
      </span>
      <span class="edit"
       @click="updateListTitle(key, listData.title)">
        <span class="iconify" data-inline="false" data-icon="ic:baseline-edit"></span>
      </span>
      <span class="delete"
        @click="deleteList(key)">
        <span class="iconify"
        data-inline="false" data-icon="ic:baseline-delete"></span>
      </span>
      <small class="time">
        {{listData.time}}
      </small>
    </li>
  </ul>
  <under-submenu/>
</div>
</template>

<script>
import UnderSubmenu from './UnderSubmenu.vue'

export default {
  name: 'LoadContainer',
  components: {UnderSubmenu},
  props: {
    listsData: [Array, Object],
    listContainerHeight: String,
    baseURL: String
  },
  data: () => {
    return {
      // reversedListData: []
    }
  },
  methods: {
    updateListTitle(key, oldTitle) {
      const newTitle = prompt(`タイトル「${oldTitle}」を編集`, oldTitle)
      // console.log(newTitle);
      if (!newTitle || newTitle === oldTitle) {
        return
      } else {
        fetch(this.baseURL + `update/list?key=${key}&newtitle=${newTitle}`)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          this.$emit('save-return-list')
        })
      }
    },
    deleteList(key) {
      // console.log(key);
      // console.log(this.baseURL);
      fetch(this.baseURL + `delete/list?key=${key}`).then(res => res.json())
        .then(data => {
          console.log(data);
          this.$emit('save-return-list')
        })
    },
    // objRevers() {
    //   console.log(this.listsData);
    //   // console.log(Object.values(this.listsData));
    //   const tmp = Object.values(this.listsData).sort(function(a, b) {
    //     if (a.time > b.time) {
    //         return -1;
    //     } else {
    //         return 1;
    //     }
    //   });
    //   this.reversedListData = tmp
    //   console.log(this.reversedListData);
    // }
  },
  mounted() {
    
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
  margin-left: 20px;
  opacity: .3;
}

/* .under-menu-outer {
  height: 44px;
  line-height: 44px;
} */
.time {
  color: lightgray;
  font-size: 12px;
  /* display: inline-block; */
  height: 24px;
  line-height: 38px;
  float: right;
}

.delete {
  float: right;
}
</style>