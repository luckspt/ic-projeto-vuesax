<template>
  <div>
    <div class="p-grid p-jc-center">
      <div class="p-col-12">
        <ScrollPanel style="width:100%;height:429px;">
          <div class="dish p-pt-3">
            <div
              class="participant p-pr-1"
              v-for="(contacto, i) in emChamada"
              :key="i">
              <img
                v-show="loadedImages[contacto.nome]"
                @load="() => setLoadedImage(contacto.nome)"
                :src="contacto.imagem ? contacto.imagem : 'https://i.imgur.com/xKbkmS8.png'"
                :style="{
                  'width': '297px',
                  'height': '165px',
                  'border-radius': '20px',
                  'background-image': `${contacto.background ? `url('${contacto.background}')` : ''}`,
                  'background-size': '100% 100%'}"
                />
              <Skeleton
                v-show="!loadedImages[contacto.nome]"
                width="297px"
                height="165px" />
              <p class="p-text-center">{{ contacto.nome.replace('$$user$$', $store.state.user.contacto.nome) }}</p>
            </div>
          </div>
        </ScrollPanel>
      </div>
      <div class="p-col-9">
        <div class="p-grid p-jc-center">
            <Button class="p-mr-1" @click="openDialogSoundboard">
              <i class="fa-solid fa-volume-high p-mr-2"></i>
              Sons &amp; Música
            </Button>
            <Button
              class="p-mr-1"
              @click="toggleUserVideo">
              <i :class="`fa-solid fa-video${!$store.state.user.chamada.imagem ? '-slash' : ''} p-mr-2`"></i>
              Câmara
            </Button>
            <Button
              class="p-mr-1"
              @click="toggleUserMicro">
              <i :class="`fa-solid fa-microphone${!$store.state.user.chamada.micro ? '-slash' : ''} p-mr-2`"></i>
              Microfone
            </Button>
            <Button
              @click="openDialogFundos">
              <i class="fa-solid fa-tv p-mr-2"></i>
              Mudar fundo de ecrã
            </Button>
        </div>
      </div>

      <div class="p-col-9">
        <div class="p-grid p-jc-center">
          <Button
            @click="leaveCall"
            class="p-button-danger p-mr-1">

            <i class="fa-solid fa-phone p-mr-2"></i>
            Desligar Chamada
          </Button>

          <Button
            class="p-button-warning"
            @click="$router.push({ name: 'Chat' })"
            label="Voltar ao Chat"
            icon="pi pi-angle-double-up" />
        </div>
      </div>
    </div>

    <AlterarFundo
      :isVisible.sync="dialogFundos"
      @close="closeDialogFundos" />

    <Soundboard
      :isVisible.sync="dialogSoundboard"
      @close="closeDialogSoundboard" />
  </div>
</template>

<style lang="scss" scoped>
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
    overflow: hidden;
    display: inline-block;
  }

  img {
    color: none;
    background: none;
  }
}
</style>

<script lang="ts">
import Vue from 'vue';
import Button from 'primevue/button';
import Skeleton from 'primevue/skeleton';
import ScrollPanel from 'primevue/scrollpanel';
import { ParticipanteChamada, Recente } from '@/typings/typings';
import AlterarFundo from '@/components/dialogs/AlterarFundo.vue';
import Soundboard from '@/components/dialogs/Soundboard.vue';

export default Vue.extend({
  components: {
    ScrollPanel,
    Skeleton,
    Button,
    AlterarFundo,
    Soundboard,
  },
  props: ['chat'],
  data: () => ({
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
    toggleUserVideo() {
      this.$store.dispatch('user/toggleImage');
    },
    toggleUserMicro() {
      this.$store.dispatch('user/toggleMicro');
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
