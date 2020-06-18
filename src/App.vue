<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'App',
        components: {
        },
        mounted() {
            this.$router.push('/Login');
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
