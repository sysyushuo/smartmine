<template>
    <div class="content">
        <div class="type">
            <p>
                <img src="../../../public/img/home/tem.png" alt="">
            </p>
            <p>
                <span class="big">25</span>
                <span class=""> ℃</span>
            </p>
            <p>
                温度
            </p>
        </div>
        <div class="type">
            <p>
                <img src="../../../public/img/home/wind.png" alt="">
            </p>
            <p>
                <span class="big">东南</span>
                <span class="">  </span>
            </p>
            <p>
                风向
            </p>
        </div>
        <div class="type">
            <p>
                <img src="../../../public/img/home/cold.png" alt="">
            </p>
            <p>
                <span class="big"> 25</span>
                <span class="">%</span>
            </p>
            <p>
                湿度
            </p>
        </div>
        <div class="type">
            <p>
                <img src="../../../public/img/home/pm.png" alt="">
            </p>
            <p>
                <span class="big"> 120</span>
                <span class=""></span>
            </p>
            <p>
                PM2.5
            </p>
        </div>
        <div class="type">
            <p>
                <img src="../../../public/img/home/rain.png" alt="">
            </p>
            <p>
                <span class="big"> 32</span>
                <span class="">mm</span>
            </p>
            <p>
                降雨量
            </p>
        </div>
    </div>

</template>
<script>
export default {
  name: "RealEnv",
  components: {
  },
  data: function() {
    return {
      bj: {}
    };
  },
  methods: {
  },
  created() {
  },
  mounted() {
  }
};
</script>
<style scoped>
.type {
  width: 25%;
  height: 100px;
  color: #fff;
}

.type p {
  text-align: center;
}

.content {
  overflow: hidden;
  width: 400px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 30px;
  position: relative;
}

.tit {
  position: absolute;
  color: #ffffff;
  top: 12px;
  left: 48px;
  font-family: Microsoft YaHei;
  font-weight: 300;
}

.big {
  font-size: 14px;
  /* font-weight: bold; */
  color: white;
}

p:nth-child(2) {
  height: 30px;
  text-align: center;
  line-height: 30px;
}

p:nth-child(3) {
  height: 20px;
  text-align: center;
  line-height: 20px;
}
</style>
