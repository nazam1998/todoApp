<template>
  <div class="container">
    <form-todo :todos="todos" />
    <todo-list-header
      :todoListHeaders="todoListHeaders"
      :on-click-handler="onClickHandler"
    />
    <ion-list class="todo-list-wrapper">
      <div v-if="showCurrentTodo.length > 0">
        <transition-group name="list">
          <ion-item
            v-for="todo in showCurrentTodo"
            :key="todo.id"
            @click="onTodoItemClick(todo.id)"
            :color="getTodoColor(todo.isCompleted)"
          >
            <ion-label>{{ todo.title }}</ion-label>
          </ion-item>
        </transition-group>
        </div>
        <div v-else>
          <ion-item>
            <ion-label>No Item Found</ion-label>
          </ion-item>
        </div>
    </ion-list>
  </div>
</template>

<script lang="ts">
import { IonList, IonItem, IonLabel } from "@ionic/vue";
import { ref, TransitionGroup } from "vue";
import TodoListHeader from "@/components/TodoListHeader.vue";
import FormTodo from "./FormTodo.vue";

export default {
  components: {
    IonList,
    IonItem,
    IonLabel,
    TodoListHeader,
    FormTodo,
    TransitionGroup,
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

    return {
      todos,
      todoListHeaders,
    };
  },
  methods: {
    getHeaderById(id: number) {
      return this.todoListHeaders.findIndex((item) => item.id === id);
    },
    resetSelection() {
      this.todoListHeaders.forEach((item) => {
        item.isSelected = false;
        item;
      });
    },

    onClickHandler(id: number) {
      const selectedHeaderIndex = this.getHeaderById(id);
      const isSelected = this.todoListHeaders[selectedHeaderIndex]?.isSelected;
      if (!isSelected) {
        this.resetSelection();
        this.todoListHeaders[selectedHeaderIndex].isSelected = !isSelected;
      }
    },
    onTodoItemClick(id: number) {
      const todoIndex = this.todos.findIndex((todo) => todo.id === id);
      this.todos[todoIndex].isCompleted = !this.todos[todoIndex].isCompleted;
    },
    getTodoColor(isCompleted: boolean) {
      return isCompleted ? "success" : "";
    },
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
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
