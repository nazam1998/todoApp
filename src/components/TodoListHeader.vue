<template>
  <div>
    <ion-segment
      class="todo-list-header"
      ref="headerSegment"
      v-model="selectedSegment"
      :value="selectedSegment"
    >
      <ion-segment-button
        v-for="item in todoListHeaders"
        :key="item.id"
        @click="() => onClickHandler(item.id)"
        :value="item.id"
      >
        <ion-label>{{ item.title }}</ion-label>
      </ion-segment-button>
    </ion-segment>
  </div>
</template>

<script lang="ts">
import { IonLabel, IonSegmentButton, IonSegment } from "@ionic/vue";
import { ref, toRefs } from "vue";

interface TodoListHeaderType {
  id: number;
  title: string;
  isSelected: boolean;
}
export default {
  props: {
    todoListHeaders: {
      type: Array<TodoListHeaderType>,
      required: true,
    },
    onClickHandler: {
      type: Function,
      required: true,
    },
  },
  components: {
    IonLabel,
    IonSegmentButton,
    IonSegment,
  },
  setup(props) {
    const { todoListHeaders, onClickHandler } = toRefs(props);
    const headerSegment = ref();
    const selectedSegment = ref(todoListHeaders.value[0].id);


    return { todoListHeaders, onClickHandler, headerSegment, selectedSegment };
  },
};
</script>

<style scoped>
.todo-list-header {
  display: flex;
  flex-direction: row;
  margin: 16px 32px;
  border-radius: 8px;
}
</style>
