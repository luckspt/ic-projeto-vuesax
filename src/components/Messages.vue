<template>
  <div class="mt-2 ic-messages">
    <div
      class="ic-message"
      v-for="(msgs, i) in computedMensagens"
      :key="i"
      :author="parseAutor(msgs[0].autor)">
      <div class="ic-author-avatar">
        <vs-avatar v-if="msgs[0].avatar">
          <img :src="require(`@/assets/img/avatars/${msgs[0].avatar}`)">
        </vs-avatar>
        <vs-avatar v-else>
          <template #text>
            {{ parseAutor(msgs[0].autor) }}
          </template>
        </vs-avatar>
      </div>
      <div class="ic-message-content">
        <!-- autor info -->
        <span class="ic-author-info">
          {{ parseAutor(msgs[0].autor) }}
        </span>

        <span class="ic-message-timestamp">
          {{ msgs[0].momento.toGMTString() }}
        </span>
        <div class="ic-message-body"
          v-for="(mensagem, j) in msgs"
          :key="j">

          {{ mensagem.texto }}

          <!-- FICHEIRO -->
          <a
            class="vs-button vs-button--icon vs-button--dark vs-button--default"
            :style="`text-decoration:none;width:${mensagem.ficheiro.length}em;`"
            v-if="mensagem.ficheiro"
            :href="mensagem.ficheiro"
            download
            >
            <div class="vs-button__content">
              {{ mensagem.ficheiro }}
              <i class="fa-solid fa-download ml-2 mb-1"></i>
            </div>
          </a>

          <!-- TODO CHAMADA -->
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ic-messages {
  color: #fff;
  font-size: 16px;
}

.ic-message {
  background-color: $dark;
  display: flex;
  font-size: 0.9em;
  margin: 1em 0;
  padding: 0.25em 1em 0;
}
.ic-message-body{
  width: 840px;
}
.ic-message-body:hover {
  background-color: darken($dark, 1%);
}
.ic-message .ic-author-avatar {
  margin-top: 1px;
  margin-right: 16px;
  min-width: 40px;
}
.ic-message .ic-author-avatar img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.ic-message .ic-message-timestamp {
  color: #72767d;
  font-size: 12px;
  margin-left: 3px;
}
  c-message .ic-message-content {
  width: 100%;
  line-height: 160%;
  font-weight: normal;
  overflow-wrap: anywhere;
}
.ic-message .ic-message-body {
  position: relative;
}

.ic-message .ic-author-info {
  color: #fff;
  display: inline-flex;
  align-items: center;
  font-size: 15px;
}
.ic-message .ic-author-info .ic-author-username {
  font-size: 1.1em;
  font-weight: 500;
  letter-spacing: 0.5px;
}
.ic-light-theme .ic-message .ic-author-info .ic-author-username {
  color: #23262a;
}
.ic-message .ic-author-info .ic-bot-tag {
  background-color: #7289da;
  font-size: 0.65em;
  margin-left: 5px;
  padding: 3px;
  border-radius: 3px;
  line-height: 100%;
  text-transform: uppercase;
}
.ic-light-theme .ic-message .ic-author-info .ic-bot-tag {
  color: #fff;
}
.ic-compact-mode .ic-message .ic-author-info {
  display: inline-flex;
  flex-direction: row-reverse;
}
.ic-compact-mode .ic-message .ic-author-info .ic-author-username {
  margin-left: 4px;
  margin-right: 4px;
}
.ic-compact-mode .ic-message .ic-author-info .ic-bot-tag {
  margin-left: 0;
  margin-right: 5px;
  padding-left: 3px;
  padding-right: 3px;
  font-size: 0.6em;
}
</style>

<script lang="ts">
import Vue from 'vue';
import { groupBy } from '@/utils';
import { Mensagem } from '@/typings/typings';

export default Vue.extend({
  props: {
    mensagens: {
      type: Object as () => Mensagem[],
    },
  },
  methods: {
    parseAutor(autor: string): string {
      if (autor === '$$user$$') { return this.$store.state.user.contacto.nome; }
      return autor;
    },
  },
  computed: {
    computedMensagens() {
      if (!this.mensagens.length) return [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return groupBy(this.mensagens as Record<string, any>[], 'autor');
    },
  },
});
</script>
