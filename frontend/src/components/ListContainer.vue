<template>
<div>
  <ul>
    <li v-for="todo in todos" :key="todo.id">
      <input type="checkbox" :id="todo.id" :value="todo.item" v-model="todo.isDone">
      <label :for="todo.id" :class="{done: todo.isDone}">{{todo.item}}</label>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  name: 'ListContainer',
  props: {
    todoText: String
  },
  data: () => {
    return {
      todos: [],
    }
  },
  methods: {
    createList() {
      const textArray = this.todoText.split('\n')
      console.log(textArray);
      textArray.forEach((text, i) => {
        const todoObj = {}
        todoObj.id = i
        todoObj.item = text
        todoObj.isDone = false
        this.todos.push(todoObj)
      })
    }
  },
  mounted() {
    console.log(this.todoText);
    if (this.todoText) {
      this.createList()
    } else {
      return
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
</style>