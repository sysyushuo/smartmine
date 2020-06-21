<template>
    <div class="content">
        <div class="icon"></div>
        <div class="title">{{title}}</div>
    </div>
</template>

<script>
    export default {
        props:['title'],
        name: "CommTitle",
        data() {
            return {}
        },
        mounted() {

        },
        methods: {},
        watch: {}
    }
</script>

<style scoped>
    .content{
        position: absolute;
        width: 100%;
        height: 100%;
        padding: 10px 0px 10px 20px;
    }
    .icon{
        width: 20px;
        height: 20px;
        margin-right: 10px;
        background: url("../../../public/img/home/title-icon.png") center no-repeat;
        background-size: 100% 100%;
        float: left;
    }
    .title{
        color: aqua;
        font-size: 15px;
        font-weight: bold;
        line-height: 20px;
        height: 20px;
        float: left;

    }
</style>
