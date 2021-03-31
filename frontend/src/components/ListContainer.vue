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
  data: () => {
    return {
      todos: [
        {id: 1, item: 'テスト1', isDone: false},
        {id: 2, item: 'テスト2', isDone: false},
        {id: 3, item: 'テスト3', isDone: false},
        {id: 4, item: 'テスト4', isDone: false},
        ],
    }
  },
  methods: {
    checkedCheck(event) {
      console.log(event.target.tagName);
      
      // this.isChecked.forEach(check => {
      //   if (check === tageValue) {

      //   }
      // })
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