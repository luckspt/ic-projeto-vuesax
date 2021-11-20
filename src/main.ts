import Vue from 'vue';
import Vuesax from 'vuesax';
import VueSkeletonLoader from 'skeleton-loader-vue';

import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

import 'vuesax/dist/vuesax.min.css';
import '@/scss/helpers.scss';

const ignoreWarnMessage = 'The .native modifier for v-on is only valid on components but it was used on <div>.';
Vue.config.warnHandler = (msg) => {
  // eslint-disable-next-line no-useless-return
  if (msg === ignoreWarnMessage) return;
};

Vue.config.productionTip = false;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
Vue.use(Vuesax as any, {
  colors: {
    primary: '#6495ed', // '#1a5cff',
    success: '#46c93a',
    danger: '#ff4757',
    warning: '#ffba00',
    dark: '#141417',
  },
});

Vue.component('vue-skeleton-loader', VueSkeletonLoader);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
