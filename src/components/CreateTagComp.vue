<template>
    <div class="create-tag-form">
      <h2>Создать новый тег</h2>
      <form @submit.prevent="createTag">
        <div class="form-group">
          <label for="tag-name">Название тега:</label>
          <input type="text" id="tag-name" v-model="tagName" required>
        </div>
        <button type="submit">Создать</button>
      </form>
      <div v-if="message" class="message">{{ message }}</div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'CreateTagComp',
    data() {
      return {
        tagName: '',
        message: '',
      };
    },
    methods: {
      async createTag() {
        try {
          const response = await axios.post('http://127.0.0.1:8000/api/noteservice/tags/', { 
            title: this.tagName 
          });
          
          this.message = 'Тег успешно создан!';
          this.tagName = ''; // Очищаем поле ввода
          this.$emit('tag-created'); // Отправляем сигнал об успешном создании
  
          // Дополнительные действия:
          // - Обновить список тегов, если он отображается в другом компоненте
          // - Перенаправить пользователя на страницу с созданным тегом
  
        } catch (error) {
          this.message = 'Ошибка при создании тега.';
          console.error(error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  
  .form-group {
    margin-bottom: 10px;
  }
  
  .message {
    margin-top: 10px;
    color: green; /* Или другой цвет для сообщений */
  }
  </style>