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
        @click="deleteList(key, listData.title)">
        <span class="iconify"
        data-inline="false" data-icon="ic:baseline-delete"></span>
      </span>
      <small class="time">
        saved {{listData.time}}
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
    baseURL: String,
    uid: String
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
        fetch(this.baseURL + `update/list?key=${key}&newtitle=${newTitle}&uid=${this.uid}`)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          this.$emit('save-return-list')
        })
      }
    },
    deleteList(key, title) {
      if (confirm(`${title}を削除しますか?`)) {
        fetch(this.baseURL + `delete/list?key=${key}&uid=${this.uid}`).then(res => res.json())
          .then(data => {
            console.log(data);
            this.$emit('save-return-list')
          })
      }
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
.edit {
  font-size: 16px;
}
.delete {
  float: right;
}
</style>