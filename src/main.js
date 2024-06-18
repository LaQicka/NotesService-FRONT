import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'

import App from './App.vue'
import FirstComp from './components/FirstComp.vue'
import SecondComp from './components/SecondComp.vue'
import ThirdComp from './components/ThirdComp.vue'
import TagsMenu from './components/TagsMenu.vue'
import NoteSearchComp from './components/NoteSearchComp.vue'
import CreateTagComp from './components/CreateTagComp.vue'
import HomePage from './components/HomePage.vue'

const routes = [
    { path: '/', name: 'HomePage', component: HomePage },
    { path: '/createnote', name: 'CreateNote', component: FirstComp },
    { 
        path: '/noteedit/:noteId', // Измененный путь с параметром noteId
        name: 'NoteEdit', 
        component: SecondComp,
        props: true // Передавать noteId как prop в SecondComp
    },
    {
        path: '/third/:tagId', // Измененный путь с параметром tagId
        name: 'TagNotes', 
        component: ThirdComp,
        props: true // Передавать tagId как prop в ThirdComp
    },
    { path: '/createtag', name: 'TagCreate', component: CreateTagComp },
    { path: '/tagsmenu', name: 'TagsMenu', component: TagsMenu },
    { path: '/searchnote', name: 'NoteSearch', component: NoteSearchComp}
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
}); 



createApp(App).use(router).mount('#app')
