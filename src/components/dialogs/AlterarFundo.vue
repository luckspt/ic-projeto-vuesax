<template>
  <vs-dialog
    v-model="isVisible"
    @close="closeDialog">
    <div style="width:500px;">
      <div class="ml-6 mr-6">
        <h2>Alterar fundo de Câmara</h2>
        <p>Visualização</p>
        <img
          id="imgPreview"
          class="rounded-corners"
          src="https://i.imgur.com/fBl6VBK.png"
          :style="{
            'width': '250px',
            'height': '140px',
            'background-image' :`url('${fundoAtivo ? fundoAtivo.href : $store.state.user.chamada.background}')`,
            'background-size': '100% 100%',
            'pointer': 'cursor',
          }" />
      </div>

      <div class="grid pt-1">
        <p class="ml-6">Fundos</p>
        <vs-row justify="center" align="center">
          <vs-col
            w="5"
            v-for="(imagem, i) in imagensFundo"
            :key="i">
            <img
              @click="() => imagemClick(imagem)"
              :class="`${imagem.ativo ? 'imgselecionada' : ''} rounded-corners`"
              :src="imagem.href"
              v-tooltip="imagem.tooltip"
              width="200px"
              height="112px"
              />
          </vs-col>
        </vs-row>
      </div>
    </div>

    <template #footer>
      <div class="grid" style="width:100%;">
        <vs-row class="ml-6">
          <vs-col w="2">
            <vs-button
              style="margin-left:-8px"
              transparent
              @click="reporFundo">
              <i class="fa-solid fa-reply mr-2"></i>
              Repor
            </vs-button>
          </vs-col>
          <vs-col offset="2" w="6">
            <div style="margin-left:12px">
              <vs-button
                style="float:left;"
                @click="closeDialog">
                <i class="fa-solid fa-xmark mr-2"></i>
                Cancelar
              </vs-button>
              <vs-button
                style="float:left;"
                success
                @click="submeterFundo">
                <i class="fa-solid fa-check mr-2"></i>
                Confirmar
              </vs-button>
            </div>
          </vs-col>
        </vs-row>
      </div>
    </template>
  </vs-dialog>
</template>

<style lang="scss" scoped>
.imgselecionada {
  border: 2px $danger solid;
}
</style>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
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
