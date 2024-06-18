<script>
import NotePreviewComp from './NotePreviewComp.vue';

export default {
  name: 'SecondComp',
  components: {
    NotePreviewComp,
  },
  props: {
    noteId: {
      type: Number,
      required: true,
    },
  },
};
</script>


<template>
  <div class="hello">
    <h1>Страница заметки</h1>
    <NotePreviewComp :noteId="noteId" />  </div>
</template>

