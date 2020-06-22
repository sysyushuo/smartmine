<template>
    <div id="app">
        <router-view/>
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
        vertical-align: middle;
        text-align: center;
        margin: 0px;
        padding: 0px;
    }
</style>
