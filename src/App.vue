<script setup>

    import NavigationBar from './components/NavigationBar.vue';

</script>

<template class = 'main'>
    <NavigationBar/>
    <RouterView :key="$route.fullPath"/>
</template>

<style>

.main{
    background-color: azure;
}

</style>
