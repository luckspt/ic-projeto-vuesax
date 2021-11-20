import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import ChatContainer from '@/containers/ChatContainer.vue';
import Chat from '@/views/Chat.vue';
import Call from '@/views/Call.vue';
import Login from '@/views/Login.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: Login,
    name: 'Login',
  },
  {
    path: '/app',
    component: ChatContainer,
    children: [
      {
        path: '',
        name: 'Chat',
        component: Chat,
      },
      {
        path: 'call',
        name: 'Call',
        component: Call,
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'hash',
  base: '/', // '/~ic024/entregas/iteracao2/E2-1/',
  routes,
});

export default router;
