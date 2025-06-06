<template>
  <form @submit.prevent="submit" class="bg-white p-4 rounded shadow mb-6">
    <div class="mb-4">
      <input
        v-model="title"
        class="w-full border p-2 rounded"
        placeholder="Title"
      />
      <p v-if="errors.title" class="text-red-500 text-sm mt-1">
        {{ errors.title }}
      </p>
    </div>

    <div class="mb-4">
      <textarea
        v-model="content"
        class="w-full border p-2 rounded"
        placeholder="Content"
      ></textarea>
      <p v-if="errors.content" class="text-red-500 text-sm mt-1">
        {{ errors.content }}
      </p>
    </div>

    <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
      {{ props.note ? "Update" : "Save" }}
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref, watchEffect, watch } from "vue";
import * as yup from "yup";

const emit = defineEmits(["addNote", "updateNote"]);
const props = defineProps<{
  note: { id: number; title: string; content: string } | null;
}>();

const title = ref("");
const content = ref("");
const errors = ref<{ title?: string; content?: string }>({});

const schema = yup.object({
  title: yup.string().required("Title is required").min(2, "Min 2 characters"),
  content: yup
    .string()
    .required("Content is required")
    .min(5, "Min 5 characters"),
});

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

const submit = async () => {
  try {
    errors.value = {};
    const values = { title: title.value, content: content.value };
    await schema.validate(values, { abortEarly: false });

    if (props.note) {
      emit("updateNote", { ...props.note, ...values });
    } else {
      emit("addNote", { ...values });
      title.value = "";
      content.value = "";
    }
  } catch (err: any) {
    if (err.inner) {
      const newErrors: Record<string, string> = {};
      for (const validationError of err.inner) {
        newErrors[validationError.path] = validationError.message;
      }
      errors.value = newErrors;
    }
  }
};
</script>
