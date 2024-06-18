<template>
    <div class="tags-list">
        <div class="search-bar">
            <input type="text" v-model="searchQuery" placeholder="Поиск по тегам...">
        </div>
        <ul v-for="tag in filteredTagList" :key="tag.id">
            <div class="tag">
                <router-link class="tag-link" :to="{ path: `/third/${tag.id}` }">{{ tag.title }} </router-link>
            </div>
        </ul>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "TagsListComp",
    data() {
        return {
            tagList: [],
            searchQuery: ""
        };
    },

    computed: {
        filteredTagList() {
            if (this.searchQuery === "") {
                return this.tagList;
            } else {
                return this.tagList.filter(tag => {
                    return tag.title.toLowerCase().includes(this.searchQuery.toLowerCase());
                });
            }
        }
    },

    mounted() {
        this.getTagsList();
    },

    methods: {
        async getTagsList() {
            axios.get("http://127.0.0.1:8000/api/noteservice/tags/")
                .then((response) => {
                    this.tagList = response.data;
                    this.tagList.sort((a, b) => b.tag_note_sub_count - a.tag_note_sub_count);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
};
</script>

<style scoped>
.tags-list {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.search-bar {
    margin-bottom: 10px;
}

.tag {
    padding: 10px;
    display: flex;
    border-radius: 4px;
    margin-right: 25px;
    text-decoration: none;
}

.tag-count, .tag-link {
    margin-left: auto;
}
</style>