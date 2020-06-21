<template>
    <div class="td-header">
        <DateTime></DateTime>
        <div class="v-title">智慧矿山三维可视化平台</div>
        <ul class="buttons">
            <li v-for="(item,index) in buttons" v-on:click="menuClicked(item)">
                <img style="float: left;" v-bind:src="item.icon" />
                <span class="lds" >{{item.name}}</span>
            </li>
        </ul>
    </div>
</template>
<script>
    import DateTime from "./DateTime.vue";

    export default {
        name: "MainHeader",
        components: {
            DateTime
        },
        data: function () {
            return {
                buttons: [
                    { index: 0, name: "退出", icon: "img/home/sysout.png" },
                ]
            };
        },
        methods: {
            //菜单点击
            menuClicked: function (menu) {
                if (menu.index === 0) {
                    //退出
                    this.logout();
                }
            },

            //退出系统
            logout() {
                this.$router.push('/Login');
            }
        }
    };
</script>
<style>
    .v-title{
        font-size: 35px;
        font-weight: bold;
        text-align: center;
        height: 40px;
        line-height: 40px;
        margin-top: 30px;
    }
    .lds {
        height: 31px;
        line-height: 31px;
        vertical-align: middle;
        float: left;
        margin-left: 4px;
        text-shadow: 4px -4px 28px black;
        font-weight: bold;
    }

    .td-header {
        position: absolute;
        top: 0px;
        width: 100%;
        height: 102px;
        color: #ffffff;
        text-align: center;
        background: url(../../../public/img/home/bg.png) no-repeat;
    }

        .td-header .title {
            position: absolute;
            left: calc(50% - 210px);
            width: 420px;
            display: inline-block;
            margin-top: 12px;
            font-size: 30px;
            font-family: "Microsoft YaHei";
            text-shadow: 2px 2px 4px #6b6b6b;
        }

    .buttons {
        position: absolute;
        right: calc(50% - 960px);
        color: #fff;
        top: 8px;
        background-image: -webkit-gradient( linear, 0 0, 0 bottom, from(rgba(255, 255, 255, 1)), to(rgba(141, 211, 255, 1)) );
        font-weight: bold;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-shadow: 0 0 0 10px black;
    }

        .buttons li {
            list-style: none;
            float: right;
            margin-left: 18px;
            margin-right: 18px;
            cursor: pointer;
        }
</style>
