<template>
  <div class="login">
      <dv-loading>
        <div style="margin-bottom: 20px">
          Loading...
        </div>
        <br>
        <bt @click="login" class="btn">点击登录</bt>
      </dv-loading>
  </div>
</template>
<script>
    import { Button as bt } from 'view-design';

    export default {
    name: 'Login',
    components: {
      bt
    },
    methods:{
      login(){
        this.$router.push('/Home');
      }
    },
    mounted() {

    }
  }
</script>
<style>
  .login{
    background-color: #282C34;
    width: 1920px;
    height: 1080px;
    text-align: center;
    vertical-align: middle;
    position: absolute;
  }
  .btn{
    width: 200px;
    height: 60px;
    background-color: #526f82;
    border-radius: 5px;
    color: aqua;
    font-size: 20px;
  }

</style>
