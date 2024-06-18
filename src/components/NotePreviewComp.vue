<template>
  <div class="note-preview" v-if="note">

    <input 
          v-if="editing"
          type="text" 
          class="note-preview__subject-input" 
          v-model="note.subject" 
          @input="updateSubject">

    
    <div class="note-preview__content">
      
      <div class="note-preview__info">
          <h2 v-if="!editing">{{ note.subject }}</h2>
          <p>Дата создания: {{ formatDate(note.creationDate) }}</p>
          
          <select v-if="editing">
            <option v-for="type in noteTypes" :key="type.id" :value="type.id">
              {{ type.TypeName }}
            </option>
          </select>
          <div v-if=!editing> Тип заметки: {{ note.typename }} </div>

          <a v-if="!editing" :href="`http://localhost:8000/api/documents/${note.docId}/download`" target="_blank">
            Скачать документ
          </a>
          <select v-if="editing">
            <option v-for="doc in documentsList" :key="doc.id" :value="doc.id">
              {{ doc.file }}
            </option>
          </select>
      </div>

      <div class="note-preview__tags" v-if="availableTags.length > 0">
        <h3>Теги:</h3>
        <ul>
          <li v-for="tag in relatedTags" :key="tag.id">
            <router-link :to="{ path: `/third/${tag.id}` }">{{ tag.title }}</router-link>
            <button v-if="editing" @click="removeTag(tag.id)">Удалить</button>
          </li>
        </ul>

        <div v-if="editing">
          <select v-model="selectedTagId">
            <option v-for="tag in availableTags" :key="tag.id" :value="tag.id">
              {{ tag.title }}
            </option>
          </select>
          <button @click="addTag">Добавить тег</button>
        </div>
        

      </div>

    </div>

    <div>
      <textarea
            v-if="editing" 
            class="note-preview__payload-textarea" 
            v-model="note.payload" 
            @input="updatePayload"
          ></textarea>
      <span v-if="!editing">{{ note.payload }}</span>
    </div>


    <div>
      <button @click="toggleEditMode">
        {{ editing ? 'Сохранить' : 'Редактировать' }}
      </button>
    </div>
    <div>
      <button v-if="editing" @click="deleteNote(note.id)">Удалить</button>
    </div>
    <span v-if="message" class="message">{{ message }}</span>

  </div>
  <div v-else-if="loading" class="note-preview__loading">
    Загрузка заметки...
  </div>
  <div v-else class="note-preview__not-found">
    Заметка не найдена.
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'NotePreviewComp',
  props: {
    noteId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      editing: false,
      note: null,
      relatedTags: [],
      availableTags: [],
      noteTypes: [],
      documentsList: [],
      selectedTagId: null,
      selectedNoteType: null,
      selectedDocument: null,
      loading: false,
      message: null
    };
  },
  mounted() {
    this.getNote();
  },
  methods: {
    async getNote() {
      this.loading = true;
      try {
        const nresponse = await axios.get(`http://127.0.0.1:8000/api/noteservice/notes/${this.noteId}/`);
        this.note = nresponse.data.note_info;
        this.relatedTags = nresponse.data.related_tags;

        this.getTags()
        this.getNoteTypes()
        this.getDocuments()

        const tresponse = await axios.get(`http://127.0.0.1:8000/api/noteservice/types/${this.note.typeId}/`)
        this.note.typename = tresponse.data.TypeName
      } catch (error) {
        console.error('Ошибка загрузки заметки:', error);
      } finally {
        this.loading = false;
      }
    },

    async getTags() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/noteservice/tags/');
        this.availableTags = response.data;


        const relatedTagIds = new Set(this.relatedTags.map(tag => tag.id));
        this.availableTags = this.availableTags.filter(tag => !relatedTagIds.has(tag.id));
      } catch (error) {
        console.error('Ошибка загрузки заметки:', error);
      }
    },

    async getDocuments(){
      try{
        const response = await axios.get('http://127.0.0.1:8000/api/documents');
        this.documentsList = response.data
      } catch (error) {
        console.error('Ошибка загрузки документов заметки:', error);
      }
    },

    async getNoteTypes(){
      try{
        const response = await axios.get('http://127.0.0.1:8000/api/noteservice/types');
        this.noteTypes = response.data
      } catch (error) {
        console.error('Ошибка загрузки типов заметки:', error);
      }

    },

    toggleEditMode(){
      this.editing = !this.editing;
    },

    async deleteNote(noteId) {
      try {
        // Отправляем DELETE запрос
        const response = await axios.delete(`http://127.0.0.1:8000/api/noteservice/notes/${noteId}/`);
        this.message = "Заметка удалена"
        // Обработка успешного удаления
        if (response.status === 204) {
          
          this.$emit('noteDeleted', noteId); // Передаем событие для обновления списка
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

    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    },

    updateSubject() {
      // Отправка запроса на обновление темы на сервер
      this.updateNote('subject', this.note.subject);
    },

    updatePayload() {
      // Отправка запроса на обновление содержимого на сервер
      this.updateNote('payload', this.note.payload);
    },
    
    async updateNote(field, value) {
      try {
        await axios.patch(`http://127.0.0.1:8000/api/noteservice/notes/${this.noteId}/`, {
          [field]: value,
        });
        // Обработка успешного обновления, например, можно отобразить сообщение
        console.log(`Поле ${field} успешно обновлено`);
      } catch (error) {
        console.error(`Ошибка обновления поля ${field}:`, error);
        // Обработка ошибки обновления
      }
    },

    async removeTag(tagId) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/noteservice/notes/${this.note.id}/remove_tag/`, { 
          data: { tag_id: tagId } 
        });
        // Обновляем локальную копию заметок (можно перезагрузить с сервера)
        this.getNote(); 
      } catch (error) {
        console.error('Ошибка удаления тега:', error);
      }
    },

    async addTag() {
      try {
        await axios.post(`http://127.0.0.1:8000/api/noteservice/notes/${this.note.id}/add_tag/`, { 
          note_id: this.note.id,
          tag_id: this.selectedTagId
        });
        // Обновляем локальную копию заметок (можно перезагрузить с сервера)
        this.getNote(); 
      } catch (error) {
        console.error('Ошибка добавления тега:', error);
      }
    },

  },
};

</script>

<style scoped>
/* ... предыдущие стили ... */

.note-preview__content {
  width: 750px;
  display: flexbox;
}

.note-preview__subject-input {
  width: 100%;
  margin-bottom: 20px;
}

.note-preview__payload-textarea {
  width: 500%;
  height: 250px; 
  margin-top: 20px;
  resize: vertical;
}



.note-preview__left {
  flex: 1; /* Левая часть займет доступное пространство */
  margin-right: 20px; /* Отступ между левой и правой частью */
}

.note-preview__right {
  flex: 1; /* Правая часть тоже займет доступное пространство */
}

.note-preview__payload-textarea {
  width: 100%;
  height: 250px; /* Пример высоты */
  resize: vertical; 
}
</style>