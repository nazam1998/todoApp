<template>
  <div class="container">
    <form-todo :todos="todos" />
    <todo-list-header
      :todoListHeaders="todoListHeaders"
      :on-click-handler="onClickHandler"
    />
    <ion-list class="todo-list-wrapper">
      <ion-item v-for="todo in showCurrentTodo" :key="todo.id">
        <ion-label>{{ todo.title }}</ion-label>
      </ion-item>
    </ion-list>
  </div>
</template>

<script lang="ts">
import { IonList, IonItem, IonLabel } from "@ionic/vue";
import { ref } from "vue";
import TodoListHeader from "@/components/TodoListHeader.vue";
import FormTodo from "./FormTodo.vue";

export default {
  components: {
    IonList,
    IonItem,
    IonLabel,
    TodoListHeader,
    FormTodo,
  },
  setup() {
    const todoListHeaders = ref([
      { id: 1, title: "All", isSelected: true },
      { id: 2, title: "In Progress", isSelected: false },
      { id: 3, title: "Completed", isSelected: false },
    ]);

    const todos = ref([
      { id: 1, title: "Learn Vue 3", isCompleted: false },
      { id: 2, title: "Learn Ionic Vue", isCompleted: true },
      { id: 3, title: "Make a project using Ionic Vue ", isCompleted: false },
    ]);

    const getHeaderById = (id: number) => {
      return todoListHeaders.value.findIndex((item) => item.id === id);
    };
    const resetSelection = () => {
      todoListHeaders.value.forEach((item) => {
        item.isSelected = false;
        item;
      });
    };
    const onClickHandler = (id: number) => {
      const selectedHeaderIndex = getHeaderById(id);
      const isSelected = todoListHeaders.value[selectedHeaderIndex].isSelected
      if (!isSelected) {
        resetSelection();
        todoListHeaders.value[selectedHeaderIndex].isSelected =
          !isSelected;
      }
    };

    return {
      todos,
      todoListHeaders,
      onClickHandler,
    };
  },
  computed: {
    showTodoList() {
      return this.todos.filter((elem) => !elem.isCompleted);
    },
    showCompleted() {
      return this.todos.filter((elem) => elem.isCompleted);
    },
    showAll() {
      return this.todos;
    },
    getCurrentSelectList() {
      return this.todoListHeaders.find((header) => header.isSelected)?.id;
    },
    showCurrentTodo() {
      if (this.getCurrentSelectList === 1) {
        return this.showAll;
      }
      if (this.getCurrentSelectList === 2) {
        return this.showTodoList;
      }
      return this.showCompleted;
    },
  },
};
</script>

<style scoped>
.container {
  margin: 20px 32px;
}
.todo-list-wrapper {
  margin: 20px 0;
  border-radius: 8px;
}
</style>
