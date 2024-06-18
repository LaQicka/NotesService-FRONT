<template class="main">
    <h1 v-if="tag">Заметки по тегу {{ tag.tag_info.title }}</h1>

    <div class = "tag-page">
      <div v-if="editing">
        <ChangeTagComp :tag = "this.tag"/>
      </div>

      <div>
        <div class="tag-notes" v-if="tag && !editing">

          <NoteByTagListPart :notes="notes"/>
          
        </div>
        
        <div v-if="tag">
          <h2>Родительские теги:</h2>
          <div class="tag-relations" v-for="parentTag in this.tag.parent_tags" :key="parentTag.id">
            <router-link :to="{ name: 'TagNotes', params: { tagId: parentTag.id }}">
              {{ parentTag.title }}
            </router-link>
            <button v-if="editing">Удалить отношение</button>

            <div v-if="!editing">
              <NoteByTagListPart :notes="this.notes_parent[parentTag.id]" />
            </div>
            
          </div>

          <h2>Дочерние теги:</h2> 
          <div class = "tag-relations" v-for="childTag in tag.child_tags" :key="childTag.id">
            <router-link :to="{ name: 'TagNotes', params: { tagId: childTag.id }}">
              {{ childTag.title }}
            </router-link>
            <button v-if="editing">Удалить отношение</button>

            <div v-if="!editing"> 
              <NoteByTagListPart :notes="this.notes_child[childTag.id]" />
            </div>

          </div>
        </div>
        
      </div>

      <div>
        <button @click="toggleEditMode">
          {{ editing ? 'Сохранить' : 'Редактировать' }}
        </button>
      </div>

      <div v-if="editing">
        <button @click="tagDelete">
          Удалить тег
        </button>
      </div>
      <p v-if="message">{{ this.message }}</p>
    </div>

</template>
  
  <script>
  import axios from 'axios';
  import NoteSimplePreview from './NoteSimplePreview.vue';
  import ChangeTagComp from './ChangeTagComp.vue';
  import NoteByTagListPart from './NoteByTagListPart.vue';

  export default {
    name: 'TagNotes',
    components: {
      NoteSimplePreview,
      ChangeTagComp,
      NoteByTagListPart
    },
    props: {
      tagId: {
        type: Number,
        required: true,
      },
    },
    data() {
      return {
        tag: null,
        parent_tags: [],
        child_tags: [],
        notes: [],
        notes_child: [],
        notes_parent: [],
        loading: false,
        message: null,
        editing: false,
      };
    },
    mounted() {
      this.getTagInfo()
      this.getTagNotes()
    },
    methods: {
        async getTagInfo() {
            this.loading = true;
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/noteservice/tags/${this.tagId}/`);
                this.tag = response.data;
                this.parent_tags = response.data.parent_tags;
                this.child_tags = response.data.child_tags;
            } catch (error) {
                console.error('Ошибка загрузки заметки:', error);
            } finally {
                this.loading = false;
            }
        },

        findTagTitle(tagId) {
          const tag = this.tag.child_tags.find(tag => tag.id === parseInt(tagId));
          console.log(tag)
          return tag ? tag.title : 'Тег не найден'; 
        },

        async getTagNotes() {
            this.loading = true;
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/noteservice/notes/by_tag/${this.tagId}/`);
                this.notes = response.data.notes;
                this.notes_child = response.data.notes_child;
                this.notes_parent = response.data.notes_parent;
            } catch (error) {
                console.error('Ошибка загрузки данных:', error);
            } finally {
                this.loading = false;
            }
        },

        async tagDelete(){
          try {
            // Отправляем DELETE запрос
            const response = await axios.delete(`http://127.0.0.1:8000/api/noteservice/tags/${this.tagId}/`);
            this.message = "Тег удалена"
            // Обработка успешного удаления
            if (response.status === 204) {
              
              this.$emit('tagDeleted', tagId); // Передаем событие для обновления списка
            } else {
              // Обработка ошибки (нестандартный статус ответа)
              this.message = "Ошибка удаления"
              console.error('Ошибка удаления:', response.data);
            }
          } catch (error) {
            // Обработка ошибки запроса
            console.error('Ошибка:', error);
          }
        },

        toggleEditMode(){
          this.editing = !this.editing
        },

        forceReload() {
          this.$router.go(0); 
        }

    },
  };
</script>



<style>

.tag-page
{
    display:list-item
}

.tag-relations {
    align-items: center;
}

</style>