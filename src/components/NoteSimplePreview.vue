<template>
    <router-link :to="{ name: 'NoteEdit', params: { noteId: note.id } }"> 
      <div class="simple-note-preview">
        <h3 class="simple-note-preview__subject">{{ note.subject }}</h3>
        <p class="simple-note-preview__date">
          {{ formatDate(note.creationDate) }}
        </p>
      </div>
    </router-link>
  </template>
  
  <script>
  export default {
    name: 'NoteSimplePreview',
    props: {
      note: {
        type: Object,
        required: true,
      },
    },
    mounted(){
      console.log(this.note);
    },
    methods: {
      formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString(); // Или любой другой формат
      },
    },
  };
  </script>
  
  <style scoped>
  .simple-note-preview {
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 4px;
  }
  
  .simple-note-preview__subject {
    margin-bottom: 5px;
  }
  </style>