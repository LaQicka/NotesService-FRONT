<template>
    <div class="navbar">
      <router-link to="/">Домашняя страница</router-link>
      <router-link to="/createnote">Создать заметку</router-link>
      <router-link to="/searchnote">Поиск заметки</router-link>
      <router-link to="/createtag">Создать тег</router-link> 
      <router-link to="/tagsmenu">Поиск тега</router-link>
    </div>
  </template>
  
  <script>
  // ... (остальной код)
  </script>
  
  <style scoped>
  .navbar {
    background-color: #f0f0f0;
    /* margin-top: 10px;  */ /* Убрали отступ сверху */
    min-width: 1000px;
    width: max-content;
    padding: 10px 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed; /* Добавили позиционирование */
    top: 0; /* Прикрепили к верхней границе */
    left: 0; /* Прикрепили к левой границе */
    z-index: 100; /* Увеличили z-index для отображения над остальным контентом */
    width: 100%; /* Занимает всю ширину */
  }
  
  /* ... (остальной CSS) */
  </style>