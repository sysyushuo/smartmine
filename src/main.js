import Vue from 'vue';
import App from './App.vue';

import VueRouter from 'vue-router';
import router from './router'
import store from './store'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import echart from 'echarts';
import axios from 'axios';
Vue.prototype.$echarts = echart;
Vue.prototype.axios = axios;
Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(ViewUI);
Vue.use(VueRouter);

function startup() {
    new Vue({
        router,
        store,
        render: h => h(App)
    }).$mount('#app')
}

XE.ready().then(startup);
