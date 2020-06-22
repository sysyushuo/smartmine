<template>
    <div class="main-container">
      <main-header></main-header>
      <div class="v-left">
        <dv-border-box-8 class="panel">
          <dv-border-box-12 >
            <comm-title :title="'实时环境'"></comm-title>
            <RealEnv ref="RealEnv" v-if="true"></RealEnv>
          </dv-border-box-12>
        </dv-border-box-8>
        <br>
        <dv-border-box-8 class="panel">
          <dv-border-box-12 >
            <comm-title :title="'7日天气'"></comm-title>
            <future-weather></future-weather>
          </dv-border-box-12>
        </dv-border-box-8>
        <br>
        <dv-border-box-8 title="电子围栏" style="width: 400px">dv-border-box-11</dv-border-box-8>
        <br>
        <dv-border-box-8 title="周界报警" style="width: 400px">dv-border-box-11</dv-border-box-8>
      </div>
      <div class="v-right">
        <dv-border-box-8 :reverse="true" style="width: 450px">dv-border-box-11</dv-border-box-8>
        <dv-border-box-8 :reverse="true" style="width: 450px">dv-border-box-11</dv-border-box-8>
        <dv-border-box-8 :reverse="true" style="width: 450px">dv-border-box-11</dv-border-box-8>
        <dv-border-box-8 :reverse="true" style="width: 450px">dv-border-box-11</dv-border-box-8>
      </div>
      <!--<my-earth></my-earth>-->
    </div>
</template>
<style scoped>
  .panel{
    width: 400px;
    background-color: rgba(5,31,123,0.8)
  }

  .main-container{
    width: 100%;
    height: 100%;
  }
  .v-left{
    position: absolute;
    top: 60px;
    left: 42px;
    width: auto;
    height: calc(100% - 100px);
    background: #fff0;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: space-around;
  }
  .v-right{
    position: absolute;
    top: 60px;
    right: 42px;
    width: auto;
    height: calc(100% - 100px);
    background: #fff0;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: space-around;
  }
</style>
<script>
// import MyEarth from "../components/MyEarth";
import MainHeader from "../components/home/MainHeader";
import RealEnv from "../components/home/RealEnv";
import CommTitle from "../components/home/CommTitle";
import FutureWeather from "../components/home/FutureWeather";
export default {
  name: 'Home',
  components: {
    FutureWeather,
    CommTitle,
    RealEnv,
    MainHeader,
    // MyEarth,
  },
  data() {
    return {
    }
  },
  methods:{
  },mounted() {
  }
}
</script>
