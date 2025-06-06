<template>
  <form @submit.prevent="submit" class="bg-white p-4 rounded shadow mb-6">
    <div class="mb-4">
      <input
        v-model="title"
        class="w-full border p-2 rounded"
        placeholder="Title"
      />
    </div>
    <div class="mb-4">
      <textarea
        v-model="content"
        class="w-full border p-2 rounded"
        placeholder="Content"
      ></textarea>
    </div>
    <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
      {{ props.note ? "Update" : "Save" }}
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";

const emit = defineEmits(["addNote", "updateNote"]);
const props = defineProps<{
  note: { id: number; title: string; content: string } | null;
}>();

const title = ref("");
const content = ref("");

watch(
  () => props.note,
  (newVal) => {
    if (newVal === null) {
      title.value = "";
      content.value = "";
    }
  }
);

watchEffect(() => {
  if (props.note) {
    title.value = props.note.title;
    content.value = props.note.content;
  } else {
    title.value = "";
    content.value = "";
  }
});

const submit = () => {
  const values = { title: title.value, content: content.value };
  if (props.note) {
    emit("updateNote", { ...props.note, ...values });
  } else {
    emit("addNote", { ...values });
    title.value = "";
    content.value = "";
  }
};
</script>
