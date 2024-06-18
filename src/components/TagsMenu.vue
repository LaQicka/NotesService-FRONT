
<script>
    import TagsListComp from './TagsListComp.vue';
    import ChangeTagComp from './ChangeTagComp.vue';
    import CreateTagComp from './CreateTagComp.vue';

    export default 
    {
        name: 'TagsMenu',
        components: {
            TagsListComp,
            ChangeTagComp,
            CreateTagComp
        },
        methods: {
            handleTagCreated() {
            // Логика обновления родительского компонента, например:
                this.$forceUpdate();
            }
        } 
    };
</script>

<template class="wrapper">
    <div class="hello">
      <h1>Поиск Тега</h1>
    </div>
    
    <div class = "container">
        <div class="tags-menu__container" allign="left">
            <TagsListComp />
        </div>
    </div>
    
</template>

<style>

.wrapper {
  display: flex;
}

/*.hello {
  flex-shrink: 0; /* Предотвращаем сжатие .hello 
} */

.container {
  flex: 1; /* Позволяем .container занять оставшееся пространство */
  display: grid;
  min-width: 1000px;
}

.tags-menu__container {
  min-width: 100px;
  overflow-y: auto;
}

</style>