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
</div>
</template>

<script>
export default {
  name: 'ListContainer',
  props: {
    todoText: String,
  },
  data: () => {
    return {
      todos: [],
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
    }
  },
  watch: {
    todos: {
      handler() {
        console.log('someObj changed')
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
</style>