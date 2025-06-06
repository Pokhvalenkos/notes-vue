<template>
  <div class="max-w-2xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">Notes</h1>
    <NoteForm :note="editingNote" @addNote="addNote" @updateNote="updateNote" />
    <NoteList :notes="notes" @edit="editNote" @delete="deleteNote" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import NoteForm from "~/widgets/note-form/NoteForm.vue";
import NoteList from "~/widgets/note-list/NoteList.vue";

interface Note {
  id: number;
  title: string;
  content: string;
}

const notes = ref<Note[]>([]);
const editingNote = ref<Note | null>(null);

const API_URL = "http://localhost:3001/notes";

const fetchNotes = async () => {
  const res = await fetch(API_URL);
  notes.value = await res.json();
};

onMounted(fetchNotes);

const addNote = async (note: Omit<Note, "id">) => {
  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  await fetchNotes();
  editingNote.value = null;
};

const updateNote = async (note: Note) => {
  await fetch(`${API_URL}/${note.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  await fetchNotes();
  editingNote.value = null;
};

const deleteNote = async (id: number) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  await fetchNotes();
};

const editNote = (note: Note) => {
  editingNote.value = { ...note };
};
</script>
