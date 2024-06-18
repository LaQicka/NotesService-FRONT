<template>
    <h1>Поиск заметки</h1>
    <div>
      <input type="text" v-model="searchQuery" placeholder="Поиск по заголовку...">
      <div v-if="filteredNotes.length > 0">
        <NoteSimplePreview 
            v-for="cur_note in filteredNotes"
            :key="cur_note.id"
            :note=cur_note />
      </div>
      <p v-else>Заметки не найдены.</p>
    </div>
  </template>
  
  <script>
  import NoteSimplePreview from './NoteSimplePreview.vue';
  import axios from 'axios';
  
  export default {
    name: 'NoteSearchComp',
    components: {
      NoteSimplePreview
    },
    data() {
      return {
        notes: [],
        searchQuery: '' 
      };
    },
    computed: {
      filteredNotes() {
        if (this.searchQuery === '') {
          return this.notes;
        } else {
          return this.notes.filter(note => {
            return note.subject.toLowerCase().includes(this.searchQuery.toLowerCase());
          });
        }
      }
    },
    mounted() {
      this.getNotes()
    },
    methods: {
      async getNotes() {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/noteservice/notes`);
          this.notes = response.data;
        } catch (error) {
          console.error('Ошибка загрузки данных:', error);
        }
      }
    }
  };
  </script>