<template>
    <div id="app">
        <MyEarth></MyEarth>
    </div>
</template>

<script>
    import MyEarth from './components/MyEarth.vue'

    export default {
        name: 'App',
        components: {
            MyEarth
        }
    }
</script>

<style>

    #app {
        height: 100%;
        width: 100%;
        background: #0094ff;
        margin: 0px;
        padding: 0px;
    }
</style>
