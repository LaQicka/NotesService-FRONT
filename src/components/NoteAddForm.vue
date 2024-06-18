<template>
    <div class="upload-form">
      <h1>Создание заметки</h1>
  
      <div class="file-input">
        <label for="file">Выберите файл:</label>
        <input type="file" id="file" ref="fileInput" @change="uploadFile">
      </div>
  
      <div class="doc-type-select">
        <label for="docType">Тип документа:</label>
        <select id="docType" v-model="docType">
          <option value="">Выберите тип</option>
          <option v-for="docType in docTypes" :key="docType.id" :value="docType">{{ docType.title }}</option>
        </select>
      </div>
  
      <div class="note-type-select">
        <label for="noteType">Тип записи:</label>
        <select id="noteType" v-model="noteType">
          <option value="">Выберите тип</option>
          <option v-for="noteType in noteTypes" :key="noteType.id" :value="noteType">{{ noteType.TypeName }}</option>
        </select>
      </div>
  
      <div class="form-group">
        <label for="subject">Название:</label>
        <input type="text" id="subject" v-model="subject">
      </div>

      <div class="form-group">
        <label for="payload">Описание:</label>
        <textarea id="payload" v-model="payload"></textarea>
      </div>

      <button @click="submitForm">Отправить</button>
    </div>
</template>
        


<script>
import axios from 'axios'

export default {
    name: 'NoteAddForm',
    data() {
        return {
        file: null,
        docTypes: [],
        noteTypes: [],
        docType: 
        {
            id: null,
            title: null
        },
        noteType: 
        {
            id: null,
            TypeName: null
        },
        subject: '',
        payload: ''
        };
    },

  mounted() {
    this.getDocTypes()
    this.getNoteTypes()
  },

  methods: {

    uploadFile(event) {
      this.file = event.target.files[0];
    },

    log(){
        // console.log(this.docType)
        // console.log(this.noteType)
    },

    getDocTypes() {
      axios.get('http://localhost:8000/api/doctypes')
        .then(response => {
          this.docTypes = response.data
          console.log(this.docTypes)
        })
        .catch(error => {
          console.error('Ошибка при получении типов документов:', error);
        });
    },

    getNoteTypes() {
      axios.get(`http://localhost:8000/api/noteservice/types`)
        .then(response => {
          this.noteTypes = response.data;
        })
        .catch(error => {
          console.error('Ошибка при получении типов записей:', error);
        });
    },

    submitForm() {
        const DocData = new FormData();
        const NoteData = new FormData();
        DocData.append('file', this.$refs.fileInput.files[0]);
        DocData.append('TypeId', this.docType.id);

        NoteData.append('owner_id', 1); // Заменить на id загружающего пользователя
        NoteData.append('subject', this.subject);
        NoteData.append('payload', this.payload);
        NoteData.append('type_id', this.noteType.id);

        axios.post('http://localhost:8000/api/documents/', DocData, {
            headers: {
            'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            console.log('Документ успешно загружен!');
            console.log(response);
            NoteData.append('document_id', response.data.id);

            axios.post('http://localhost:8000/api/noteservice/notes/', NoteData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
            .then(response => {
              console.log('Запись успешно добавлена!');
              console.log(response);
            })
            .catch(error => {
                console.error('Ошибка загрузки записи:', error);
            });

            this.$refs.fileInput.value = null;
        })
        .catch(error => {
            console.error('Ошибка загрузки документа:', error);
        });
    }

  },
};
</script>
