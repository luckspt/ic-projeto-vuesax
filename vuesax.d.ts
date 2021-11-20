import Vue from 'vue';

declare module 'vue/types/vue' {
  // eslint-disable-next-line no-shadow
  interface Vue {
    $vs: any; // vuesax custom plugin
  }
}

declare module 'vuesax';

declare module 'vue-discord-message';
