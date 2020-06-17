<template>
    <div class="my-tools">
        <ul>
            <li v-for="(item,index) in tools" @click="_onToolClick(item)">
                {{item.title}}
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        name: "MyTools",
        props: ["earth"],
        data() {
            return {
                tools: [],
                _earth: null
            }
        },
        mounted() {
            this.tools = [
                {
                    title: "测距离",
                    onClick: function () {
                        console.log("--测距离");
                        this._earth.analyzation.measurement.type = "SPACE_DISTANCE";
                    }
                },
                {
                    title: "测面积",
                    onClick: function () {
                        console.log("--测面积");
                        this._earth.analyzation.measurement.type = "SPACE_AREA";
                    }
                },
                {
                    title: "三角测量",
                    onClick: function () {
                        console.log("--三角测量");
                        this._earth.analyzation.measurement.type = "TRIANGLE_DISTANCE";
                    }
                },
                {
                    title: "清除",
                    onClick: function () {
                        console.log("--清除");
                        this._earth.analyzation.measurement.clearResults();
                    }
                }
            ];


        },
        methods: {
            //工具点击事件
            _onToolClick: function (item) {
                if (!this._earth) {
                    this._earth = this.$parent._earth;
                }
                //执行回调函数
                if (item.onClick) {
                    item.onClick.call(this, item);
                }
            }
        },
        beforeDestroy() {
            // vue程序销毁时，需要清理相关资源

        }
    }
</script>
<style scoped>
    .my-tools {
        position:absolute;
        top:10px;
        left:40px;
    }
    .my-tools ul li {
        list-style: none;
    }

    .my-tools li {
        height: 32px;
        width: 60px;
        background: #808080;
        margin-top: 4px;
        font-size:14px;
        cursor:pointer;
        color:white;
        text-align:center;
    }
</style>