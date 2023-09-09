<!-- make base structure of ionic vue component -->
<template>
  <todo-list-header
    :todoListHeaders="todoListHeaders"
    :on-click-handler="onClickHandler"
  />
  <ion-list class="todo-list-wrapper">
    <ion-item v-for="todo in showCurrentTodo" :key="todo.id">
      <ion-label>{{ todo.title }}</ion-label>
    </ion-item>
  </ion-list>
</template>

<script lang="ts">
import { IonList, IonItem, IonLabel } from "@ionic/vue";
import { ref } from "vue";
import TodoListHeader from "@/components/TodoListHeader.vue";

export default {
  components: {
    IonList,
    IonItem,
    IonLabel,
    TodoListHeader,
  },
  setup() {
    // 
    const todoListHeaders = ref([
      { id: 1, title: "Todo", isSelected: true },
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
      const selectedInderHeader = getHeaderById(id);
      if (!todoListHeaders.value[selectedInderHeader].isSelected) {
        resetSelection();
        todoListHeaders.value[selectedInderHeader].isSelected =
          !todoListHeaders.value[selectedInderHeader].isSelected;
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
.todo-list-wrapper {
  margin: 20px 32px;
  border-radius: 8px;
}
</style>