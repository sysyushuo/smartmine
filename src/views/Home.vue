<template>
  <div class="home">
    <div class="main-container">
      <my-earth></my-earth>
    </div>
  </div>
</template>
<script>
import MyEarth from "../components/MyEarth";
export default {
  name: 'Home',
  components: {
    MyEarth,
  },
  data() {
    return {
      earthConfig: MapConfig
    }
  },
  methods:{
    init() {
    },
  },mounted() {
    this.earth = this.$refs.myEarth;
  }
}
</script>
<style scoped>
  .main-container{
    width: 100%;
    height: 100%;
    background-color: #526f82;
  }

</style>
