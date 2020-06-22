<template>
    <div id="app">
        <MyEarth></MyEarth>
    </div>
</template>
<script>
    //sockjs ¿Í»§¶Ë
    import SockJS from 'sockjs-client';
    import Stomp from 'stompjs';
    //µØÇò
    import MyEarth from './components/MyEarth.vue'

    export default {
        name: 'App',
        data() {
            return {
                stompClient:'',
            }
        },
        components: {
            MyEarth
        },
        mounted() {

        },
        methods: {

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
