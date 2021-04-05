<template>
<div>
  <title-input-box/>
  <ul :style="{height: listContainerHeight + 'px' }">
    <li v-for="todo in todos" :key="todo.id">
      <input type="checkbox" :id="todo.id" :value="todo.item" v-model="todo.isDone">
      <label :for="todo.id" :class="{done: todo.isDone}">{{todo.item}}</label>
      <span @click="doEdit(todo.id, todo.item)">
        <span class="iconify" data-inline="false" data-icon="ic:baseline-edit"></span>
      </span>
    </li>
  </ul>
  <div class="under-menu-outer">
    <remove-list-btn
    @remove-icon-click-parts="removeListLine"
    />
  </div>
</div>
</template>

<script>
import RemoveListBtn from './components_parts/removeListBtn.vue'
import TitleInputBox from './components_parts/TitleInputBox.vue'

export default {
  name: 'ListContainer',
  components: {RemoveListBtn, TitleInputBox},
  props: {
    todoText: String,
    listContainerHeight: String,
  },
  data: () => {
    return {
      todos: [],
      limitLine: 100
    }
  },
  methods: {
    createList(dataPlace, list) {
      if (dataPlace === 'store') {
        this.todos = JSON.parse(list)
        return
      }

      if (dataPlace === 'new') {
        const textArray = list.split('\n')
        console.log(textArray);
        // 最後の空行を除去する処理
        const lastElm = textArray[textArray.length-1]
        if (lastElm === '') {
          textArray.pop()
        }        
        textArray.forEach((text, i) => {
          const todoObj = {}
          todoObj.id = i
          todoObj.item = text
          todoObj.isDone = false
          this.todos.push(todoObj)
        })
      }

    },
    doEdit(targetId, beforeText) {
      const afterText = prompt(`「${beforeText}」を編集`, beforeText)
      if (afterText) {
        for (let key of this.todos) {
          if (targetId === key.id) {
            key.item = afterText
          }
        }
      } else {
        return
      }
    },
    addListLine() {
      if (this.todos.length === this.limitLine) {
        return
      }

      let lastTodoID;
      if (this.todos.length === 0) {
        lastTodoID = 0
      } else {
        lastTodoID = this.todos[this.todos.length-1].id
      }

      const todoObj = {}
      todoObj.id = lastTodoID + 1 
      todoObj.item = ''
      todoObj.isDone = false

      this.todos.push(todoObj)
    
    },
    removeListLine() {
      if (this.todos.length === 0) {
        return
      }
      this.todos.pop()
    },
    resetList() {
      if (this.todos.length === 0) {
        return
      }
      localStorage.removeItem('Lister')
      this.todos.splice(0, this.todos.length)
    },
    async saveListToDB() {
      if (this.todos.length === 0) {
        return
      }
      console.log('saveing');

      const listData = localStorage.getItem('Lister')
      const uuid = await this.getUniqueStr()
      const time = await this.getTimeStr()
      const json = JSON.stringify({uuid, time, listData})
      
      const data = {
        method: "POST",
        body: json
      }

      let URL;
      if (location.hostname === 'localhost') {
        URL = `http://localhost:5000/lister-424b3/us-central1/app/`;
      } else {
        URL = location.href;
      }

      console.log(URL);
      console.log(data);

      fetch(URL + "/save/list", data)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          this.$emit('save-return-list', data.lists)
        })

      this.resetList()
      this.todos.splice(0, this.todos.length)

    },
    getTimeStr() {
      const date = new Date()
      const month = date.getMonth() + 1
      const day = date.getDate()
      const h = date.getHours()
      const m = date.getMinutes()
      console.log(month, day, h, m);
      return `${month}/${day} ${h}時${m}分`
    },
    getUniqueStr(myStrong) {
      let strong = 1000;
      if (myStrong) strong = myStrong;
      return new Date().getTime().toString(16)  + Math.floor(strong*Math.random()).toString(16)
    }
  },
  watch: {
    todos: {
      handler() {
        localStorage.setItem('Lister', JSON.stringify(this.todos))
      },
      deep: true
    }
  },
  created() {
  },
  mounted() {
    const hasList = localStorage.getItem('Lister')
    if (hasList) {
      // 前のリストを編集している場合ローカルストアからリスト作成
      this.createList('store', hasList)
    } else {
      // 新たにリストをつくった場合はpropsからリスト作成
      this.createList('new', this.todoText)
    }

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

.done {
  text-decoration: line-through;
}

.iconify {
  margin-left: 5px;
  opacity: .3;
}

.under-menu-outer {
  display: flex;
  justify-content: flex-end;
}

</style>