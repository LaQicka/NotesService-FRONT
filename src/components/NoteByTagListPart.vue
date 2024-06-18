<template>

<div v-if="notes.length > 0">
    <NoteSimplePreview 
        v-for="note in notes"
        :note=note />
</div>
<div v-else>
    Нет заметок с этим тегом.
</div>

</template>


<script>

import NoteSimplePreview from './NoteSimplePreview.vue';

export default {
  name: 'NoteListPart',
  components: {
    NoteSimplePreview
  },
  props: {
    notes: {
      type: Array,
      required: true,
    },
  },
};
</script>