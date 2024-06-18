<script>
  import NoteByTagList from './NoteByTagList.vue';

  export default 
  {
    name: 'ThirdComp',
    components: {
      NoteByTagList
    },
    props: {
      tagId: {
        type: Number,
        required: true,
      },
    },  
  };
  

</script>

<template>
    <NoteByTagList :tagId="tagId" />
</template>