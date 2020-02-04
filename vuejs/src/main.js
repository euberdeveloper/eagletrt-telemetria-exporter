import Vue from 'vue';

// Import Vue Bootstrap
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

// Import Vue Perfect Scrollbar
import PerfectScrollbar from 'vue2-perfect-scrollbar';
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css';

import store from './store';
import App from './App.vue';

Vue.config.productionTip = true;
Vue.use(BootstrapVue);
Vue.use(PerfectScrollbar);

new Vue({
    store,
    render: h => h(App)
}).$mount('#app');
