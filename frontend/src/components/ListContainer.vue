<template>
<div>
  <ul>
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
export default {
  name: 'ListContainer',
  components: {RemoveListBtn},
  props: {
    todoText: String,
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
    resetStore() {
      if (this.todos.length === 0) {
        return
      }
      localStorage.removeItem('Lister')
      this.todos.splice(0, this.todos.length)
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
  height: 480px;
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