<template class = "temp">

<div class = "d1">
    <h1>Система управления материалами конспектов</h1>
    <div class="annot">
        Система позволяет: <br />
        <ul>
            <li>загружать, скачивать и просматривать файлы материалов конспектов;</li>
            <li>добавлять описание материалов (в виде метаданных и тегов);</li>
            <li>осуществлять поиск заметок по их названию или тегам.</li>
        </ul>
    </div>
    <p align="left">Для добавления новой заметки перейдите в раздел <router-link to="/createnote">Создать заметку</router-link>.</p>
    <p align="left">Для поиска заметок перейдите в раздел <router-link to="/searchnote">Поиск заметки</router-link>.</p>
    <p align="left">Для добавления нового ключевого слова (тега) перейдите в раздел <router-link to="/createtag">Создать тег</router-link>.</p>
    <p align="left">Для добавления поиска ключевых слов (и заметок по ним) перейдите в раздел <router-link to="/tagsmenu">Поиск тега</router-link>.</p>
</div>

</template>

<script>

export default{
    name: "HomePage"
}

</script>

<style>

.annot{
    text-align: justify;
}

</style>