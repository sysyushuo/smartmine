<!-- 组件说明 -->
<template>
    <div class="datetime">
        <div class="time">{{time | timefilter}}</div>
        <div class="cutline"></div>
        <div class="date">{{time | datefilter}}</div>
        <div class="cutline"></div>
        <div class="week">{{time | weekfilter}}</div>
    </div>
</template>

<script>
    import moment from "moment";
    moment.locale("zh-cn");

    export default {
        name: "DateTime",
        components: {},
        data() {
            return {
                time: new Date()
            };
        },
        computed: {},
        methods: {},
        filters: {
            timefilter: function (value) {
                return moment(value).format("HH:mm:ss");
            },
            weekfilter: function (value) {
                return moment(value).format("dddd");
            },
            datefilter: function (value) {
                return moment(value).format("YYYY.MM.DD");
            }
        },
        mounted() {
            var _this = this; //声明一个变量指向vue实例this,保证作用域一致
            this.timer = setInterval(function () {
                _this.time = new Date(); //修改数据date
            }, 1000);
        },
        beforeDestroy() {
            if (this.timer) {
                clearInterval(this.timer); //在vue实例销毁钱，清除我们的定时器
            }
        } //生命周期 - 销毁之前
    };
</script>
<style scoped>
    .datetime {
        height: 30px;
        line-height: 30px;
        margin-top: 8px;
        background-image: -webkit-gradient( linear, 0 0, 0 bottom, from(rgba(255, 255, 255, 1)), to(rgba(141, 211, 255, 1)) );
        font-weight: bold;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        width: 320px;
        left: calc(50% - 960px);
        position: absolute;
    }

        .datetime div {
            color: #fff;
            float: left;
            margin-left: 16px;
            font-size: 18px;
            text-shadow: 0 0 0 10px black;
            /* box-shadow: 0px 10px 0px 0px #eede15; */
        }

    .cutline {
        width: 1px;
        height: 16px;
        background: #ccc;
        margin-top: 8px;
    }
</style>
