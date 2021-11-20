<template>
  <Dialog
    :visible.sync="isVisible"
    modal
    :style="{width: '500px'}"
    @hide="closeDialog">
    <template #header>
      <h3>Mudar fundo de Vídeo</h3>
    </template>
    <h3 style='margin-left:180px;'>Preview</h3>
    <img
      id="imgPreview"
      src="https://i.imgur.com/fBl6VBK.png"
      :style="{
        'background-image' :`url('${fundoAtivo ? fundoAtivo.href : $store.state.user.chamada.background}')`,
        'background-size': '100% 100%',
        'pointer': 'cursor',
        'margin-left': '80px'
      }" />
    <hr>
    <div class="p-grid">
      <div class="p-col" v-for="(imagem, i) in imagensFundo" :key="i">
        <img
          @click="() => imagemClick(imagem)"
          :class="`${imagem.ativo ? 'imgselecionada' : ''}`"
          :src="imagem.href"
          v-tooltip="imagem.tooltip"
          width="200px"
          height="112px"
          />
      </div>
    </div>
    <template #footer>
        <!-- class="p-button-text p-button-danger" -->
      <!-- @click="" -->
      <Button
        class="p-button-text"
        style="margin-right: 120px"
        @click="reporFundo">
        <i class="fa-solid fa-reply p-mr-2"></i>
        Repor
      </Button>
      <Button @click="closeDialog" style="background-color: #B90E0A;">
        <i class="fa-solid fa-xmark p-mr-2"></i>
        Cancelar
      </Button>
      <Button style="background-color: #5BC236;"
        class="p-button-success"
        autofocus
        @click="submeterFundo">
        <i class="fa-solid fa-check p-mr-2"></i>
        Confirmar
      </Button>
    </template>
  </Dialog>
</template>

<style lang="scss" scoped>
.imgselecionada {
  border: 2px red solid;
}
</style>

<script lang="ts">
import Vue from 'vue';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';

export default Vue.extend({
  components: {
    Button,
    Dialog,
  },
  props: ['isVisible'],
  data: () => ({
    imagensFundo: [
      {
        href: 'https://i.imgur.com/sOgLEmI.png',
        ativo: false,
        tooltip: 'Vulcão',
      },
      {
        href: 'https://i.ebayimg.com/images/g/~6AAAOSwo4pYGoey/s-l400.jpg',
        ativo: false,
        tooltip: 'Peixes',
      },
      {
        href: 'https://i.imgur.com/psmtqEZ.jpg',
        ativo: false,
        tooltip: 'Praia',
      },
      {
        href: 'http://www.projecto100rota.com/wp-content/uploads/2017/10/WP_20171018_12_11_14_Pro-2.jpg',
        ativo: false,
        tooltip: 'Leiria',
      },
    ],
  }),
  computed: {
    fundoAtivo(): { href: string, ativo: boolean } | undefined {
      return this.imagensFundo.find((i) => i.ativo);
    },
  },
  methods: {
    imagemClick(imagem: { href: string, ativo: boolean }): void {
      // Meter imagem ativa
      for (let i = 0; i < this.imagensFundo.length; i += 1) {
        if (this.imagensFundo[i].href === imagem.href) {
          this.imagensFundo[i].ativo = true;
        } else {
          this.imagensFundo[i].ativo = false;
        }
      }
    },
    closeDialog(): void {
      this.$emit('close');
    },
    reporFundo(): void {
      this.$store.dispatch('user/resetBackground');
      for (let i = 0; i < this.imagensFundo.length; i += 1) {
        this.imagensFundo[i].ativo = false;
      }

      this.closeDialog();
    },
    submeterFundo(): void {
      this.$store.dispatch('user/setBackground', this.fundoAtivo?.href);
      this.closeDialog();
    },
  },
});
</script>
