<template>
  <form @submit.prevent="addTodo">
    <ion-input v-model="inputValue" type="text" :label="'Enter Todo: '" />
    <div class="button-container">
      <ion-button
        type="submit"
        color="primary"
        style="margin: 0 auto; align-self: center"
        :disabled="!inputValue || inputValue === ''"
      >
        Add to list
      </ion-button>
    </div>
  </form>
</template>

<script lang="ts">
import { IonInput, IonButton } from "@ionic/vue";
import { ref } from "vue";

export default {
  props: {
    todos: {
      type: Array,
      required: true,
    },
  },
  components: { IonInput, IonButton },
  setup() {
    const inputValue = ref();
    return { inputValue };
  },
  methods: {
    addTodo() {
      if (!this.inputValue || this.inputValue === "") return;
      this.todos.push({
        id: this.todos.length + 1,
        title: this.inputValue,
        isCompleted: false,
      });
      this.inputValue = "";
    },
  },
};
</script>

<style scoped>
.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 12px;
}
</style>
