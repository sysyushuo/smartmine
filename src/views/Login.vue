<template>
  <div class="login">
    <bt @click="login" class="btn">点击登录</bt>
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
    text-align: center;
    vertical-align: middle;
    position: absolute;
  }
  .btn{
    width: 100px;
    height: 30px;
    border: 1px dashed #22ee22;
  }

</style>
