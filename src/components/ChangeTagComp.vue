<template>
    <div class="tag-relations">

    <div class="add-relation" v-if="selectedTagId">
      <h3>Добавить отношение:</h3>
      <select v-model="relatedTagId">
        <option value="" disabled>Выберите тег</option>
        <option v-for="tag in availableTags" :key="tag.id" :value="tag.id">{{ tag.title }}</option>
      </select>
      <button @click="addParent" :disabled="!relatedTagId">Добавить как родительский</button>
      <button @click="addChild" :disabled="!relatedTagId">Добавить как дочерний</button>
    </div>

    <div class="messages" v-if="message">{{ message }}</div>
  </div>
</template>

<script>

import axios from 'axios';

export default {
    name: "CreateTagComp",
    props: {
        tag: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            tags: [],
            selectedTagId: '',
            relatedTagId: '',
            message: '',
            };
    },
    computed: {
    availableTags() {
        // Исключаем выбранный тег из списка доступных для отношений
        return this.tags.filter(tag => tag.id !== this.selectedTagId);
        },
    },
    mounted() {
        this.selectedTagId = this.tag.tag_info.id
        this.getTags();
        
    },
    methods: {
        async getTags() {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/noteservice/tags/');
            this.tags = response.data;
        } catch (error) {
            this.showError('Ошибка получения списка тегов.');
            console.error(error);
        }
        },
        
        async addParent() {
            await this.updateRelation('parent');
        },
        
        async addChild() {
            await this.updateRelation('child');
        },
        
        async updateRelation(relationType) {
            try {
                const data = {}; // Используем обычный объект для данных JSON

                if (relationType === 'parent') {
                    data.parent_id = this.relatedTagId;
                } else {
                    data.child_id = this.relatedTagId;
                }

                console.log('Отношения тегов:', data);

                const response = await axios.patch(`http://127.0.0.1:8000/api/noteservice/tags/${this.selectedTagId}/update_relations/`, data);

                console.log('Отношения тегов успешно обновлены:', response.data);

                // Дополнительные действия после обновления, например:

            } catch (error) {
                console.error('Ошибка при обновлении отношений тегов:', error);
            }
            },

        showMessage(text) {
            this.message = text;
            setTimeout(() => {
                this.message = '';
            }, 3000);
        },

        showError(text) {
            this.showMessage(`Ошибка: ${text}`);
        },
    },
}

</script>


<style scoped>



</style>