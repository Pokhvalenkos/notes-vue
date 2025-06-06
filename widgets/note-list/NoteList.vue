<template>
  <div>
    <div
      v-for="note in notes"
      :key="note.id"
      class="bg-white p-4 rounded shadow mb-2"
    >
      <h2 class="font-bold">{{ note.title }}</h2>
      <p>{{ note.content }}</p>
      <div class="mt-2 space-x-2">
        <button @click="$emit('edit', note)" class="text-blue-500">Edit</button>
        <button @click="$emit('delete', note.id)" class="text-red-500">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ notes: { id: number; title: string; content: string }[] }>();
</script>
