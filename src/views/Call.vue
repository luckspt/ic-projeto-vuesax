<template>
  <div class="grid" justify="center">
    <vs-row>
      <vs-col w="12">
        <div style="width:100%;height:429px;">
          <div class="dish" style="height:429px;overflow-y:scroll;">
            <div
              class="participant mr-3 mb-3"
              v-for="(contacto, i) in emChamada"
              :key="i">
              <vs-card
                class="participantCard">
                <template #img>
                  <img
                    :src="`${getContactoImage(contacto.nome, contacto.imagem)}`"
                    :width="297"
                    :height="165"
                    :style="{
                      'background-image': `${contacto.imagem && contacto.background ? `url('${contacto.background}')` : ''}`,
                      'background-size': '100% 100%'}"
                    />
                </template>
                <template #interactions>

                  <vs-button
                    class="no-hover"
                    v-if="!contacto.micro"
                    danger
                    icon
                    flat
                    relief>
                    <i class="fa-solid fa-microphone-slash"></i>
                  </vs-button>
                  <vs-button
                    class="no-hover"
                    v-if="!contacto.imagem"
                    danger
                    icon
                    flat
                    relief>
                    <i class="fa-solid fa-video-slash"></i>
                  </vs-button>

                  <h4>{{ parseNome(contacto.nome) }}</h4>
                </template>
              </vs-card>
            </div>
          </div>
        </div>
      </vs-col>
      <vs-col w="12">
        <div class="grid p-jc-center">
          <vs-row justify="center">
            <vs-button
              v-if="reRenderToggles"
              @click="toggleUserVideo">
              <i :class="`fa-solid fa-video${!$store.state.user.chamada.imagem ? '-slash' : ''} mr-2`" />
              Câmara
            </vs-button>

            <vs-button
              v-if="reRenderToggles"
              @click="toggleUserMicro">
              <i :class="`fa-solid fa-microphone${!$store.state.user.chamada.micro ? '-slash' : ''} mr-2`" />
              Microfone
            </vs-button>

            <vs-button
              @click="openDialogFundos">
              <i class="fa-solid fa-tv mr-2"></i>
              Fundos Câmara
            </vs-button>

            <vs-button
              @click="openDialogSoundboard">
              <i class="fa-solid fa-volume-high mr-2"></i>
              Sons &amp; Música
            </vs-button>
          </vs-row>
        </div>
      </vs-col>

      <vs-col w="12">
        <div class="grid">
          <vs-row justify="center">
            <vs-button
              danger
              @click="leaveCall">

              <i class="fa-solid fa-phone mr-2"></i>
              Terminar Chamada
            </vs-button>

            <vs-button
              @click="$router.push({ name: 'Chat' })">
              <i class="fa-solid fa-angles-up mr-2"></i>
              Voltar à Conversa
            </vs-button>
          </vs-row>
        </div>
      </vs-col>
    </vs-row>

    <AlterarFundo
      :isVisible.sync="dialogFundos"
      @close="closeDialogFundos" />

    <Soundboard
      :isVisible.sync="dialogSoundboard"
      @close="closeDialogSoundboard" />
  </div>
</template>

<style lang="scss" scoped>
.no-hover {
  pointer-events: none;
}

.participantCard,.vs-card,.vs-card__image {
  border: none !important;
  box-shadow: none !important;
}

.dish {
  display: flex;
  align-content: center;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  position: absolute;
  left: 0px;
  bottom: 0px;
  top: 0px;
  right: 0px;

  div {
    position: relative;
    vertical-align: middle;
    align-self: center;
    border-radius: 10px;
    display: inline-block;
  }

  img {
    color: none;
    background: none;
  }
}
</style>

<script lang="ts">
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

import Vue from 'vue';
import { ParticipanteChamada, Recente } from '@/typings/typings';
import AlterarFundo from '@/components/dialogs/AlterarFundo.vue';
import Soundboard from '@/components/dialogs/Soundboard.vue';

export default Vue.extend({
  components: {
    AlterarFundo,
    Soundboard,
  },
  props: ['chat'],
  data: () => ({
    reRenderToggles: true,
    dialogFundos: false,
    dialogSoundboard: false,
    loadedImages: {} as Record<string, boolean>,
  }),
  computed: {
    emChamada(): ParticipanteChamada[] {
      if (!this.chat.naChamada?.length) return [];
      return [...this.chat.naChamada, this.$store.state.user.chamada];
    },
  },
  watch: {
    chat: {
      immediate: true,
      handler(val: Recente, oldVal: Recente) {
        // Go to chat if
        if (val != null && oldVal != null) {
          this.$router.push({ name: 'Chat' });
          return;
        }

        this.resetLoadedImages();
      },
    },
  },
  methods: {
    forceRerenderToggles() {
      this.reRenderToggles = false;

      this.$nextTick().then(() => {
        this.reRenderToggles = true;
      });
    },
    getContactoImage(nome: string, chamadaImagem: string) {
      return chamadaImagem || require(`@/assets/img/avatars/${this.$store.state.contactos.avatars[nome]}`);
    },
    parseNome(nome: string) {
      return nome.replace('$$user$$', this.$store.state.user.contacto.nome);
    },
    toggleUserVideo() {
      this.$store.dispatch('user/toggleImage');
      this.forceRerenderToggles();
    },
    toggleUserMicro() {
      this.$store.dispatch('user/toggleMicro');
      this.forceRerenderToggles();
    },
    setLoadedImage(nome: string) {
      this.$set(this.loadedImages, nome, true);
    },
    resetLoadedImages() {
      this.loadedImages = {};
    },
    leaveCall() {
      this.$store.dispatch('user/leaveCall');
      this.$router.push({ name: 'Chat' });
    },
    openDialogFundos() {
      this.dialogFundos = true;
    },
    closeDialogFundos() {
      this.dialogFundos = false;
    },
    openDialogSoundboard() {
      this.dialogSoundboard = true;
    },
    closeDialogSoundboard() {
      this.dialogSoundboard = false;
    },
  },
});
</script>
