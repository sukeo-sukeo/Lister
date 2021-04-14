<template>
<div>
  <div class="input-outer">
    <input class="input-title" type="text" placeholder="new List" v-model="listTitle">
  </div>
  <ul :style="{height: listContainerHeight + 'px' }">
    <li v-for="todo in todos" :key="todo.id">
      <input type="checkbox" :id="todo.id" :value="todo.item" v-model="todo.isDone">
      <label :for="todo.id" :class="{done: todo.isDone}">{{todo.item}}</label>
      <span class="edit" 
       @click="doEdit(todo.id, todo.item)">
        <span class="iconify" data-inline="false" data-icon="ic:baseline-edit"></span>
      </span>
      <span class="delete"
       @click="deleteList(todo.id)">
        <span class="iconify"
        data-inline="false" data-icon="ic:baseline-delete"></span>
      </span>
    </li>
  </ul>
  <div class="under-menu-outer">
    <under-submenu/>
    <!-- <remove-list-btn
    @remove-icon-click-parts="removeListLine"
    /> -->
  </div>
</div>
</template>

<script>
// import RemoveListBtn from './components_parts/removeListBtn.vue'
import UnderSubmenu from './UnderSubmenu.vue'

export default {
  name: 'ListContainer',
  components: {UnderSubmenu},
  props: {
    todoText: String,
    listContainerHeight: String,
    baseURL: String
  },
  data: () => {
    return {
      todos: [],
      listTitle: '',
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
        // console.log(textArray);
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
    deleteList(todoid) {
      const newTodos = this.todos.filter(todo => todo.id != todoid)
      this.todos = newTodos
    },
    resetList() {
      if (this.todos.length === 0) {
        return
      }
      localStorage.removeItem('Lister')
      localStorage.removeItem('ListTitle')
      this.listTitle = ''
      this.todos.splice(0, this.todos.length)
    },
    async saveListToDB(uid, count) {
      if (this.todos.length === 0) {
        return
      }
      // console.log('saveing');

      console.log(uid);
      console.log(count);

      const listData = localStorage.getItem('Lister')
      let listTitle = localStorage.getItem('ListTitle')
      const listId = await this.getUniqueStr()
      const time = await this.getTimeStr()
      if (!listTitle) {
        listTitle = 'new List'
      }

      const json = JSON.stringify({
        uid,
        count,
        listId, 
        time, 
        listData, 
        listTitle
      })
      
      const data = {
        method: "POST",
        body: json
      }


      fetch(this.baseURL + "save/list", data)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          this.$emit('save-return-list')
          this.resetList()
        })


    },
    getTimeStr() {
      const date = new Date()
      const month = date.getMonth() + 1
      const day = date.getDate()
      const h = date.getHours()
      const m = ('0' + date.getMinutes()).slice(-2)
      // console.log(month, day, h, m);
      
      return `${month}/${day} ${h}:${m}`
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
    },
    listTitle() {
      localStorage.setItem('ListTitle', this.listTitle)
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

    const hasTitle = localStorage.getItem('ListTitle')
    if (hasTitle) {
      this.listTitle = hasTitle
    } else {
      localStorage.setItem('ListTitle', '')
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
  margin-left: 10px;
  opacity: .3;
}

/* .edit {
  font-size: 16px;
} */

.delete {
  float: right;
}

/* .under-menu-outer {
  display: flex;
  flex-grow: 2;
  justify-content: flex-end;
  align-items: center;
} */

.input-outer {
  display: flex;
  justify-content: center;
}
.input-title {
  color: gray;
  border: none;
  height: 32px;
  font-size: 28px;
  width: 60%;
  border-bottom: solid 2px lightgray;
  /* font-family: 'Rhodium Libre', serif; */
  font-style: normal;
  font-weight: normal;
}

label {
  display: inline-flex;
  width: 70%;
  overflow: scroll;
}

.input-title:focus {
  outline: 0;
}

</style>