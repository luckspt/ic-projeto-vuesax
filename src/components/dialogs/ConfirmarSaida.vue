<template>
  <div class="grid p-2">
    <vs-dialog
      prevent-close
      v-model="isVisible"
      @close="closeDialog">
      <div class="ml-6 mr-6">
        <h2>Deseja terminar sessão?</h2>
      </div>

      <div class="grid">
        <vs-row
          primary
          justify="center"
          align="center">
          <vs-col w="4">
            <vs-button
              danger
              @click="submit">
              Confirmar
              <template #animate>
                <i class="fa-solid fa-right-from-bracket"></i>
              </template>
            </vs-button>
          </vs-col>

          <vs-col w="4">
            <vs-button
              @click="closeDialog">
              Cancelar
              <template #animate >
                <i class="fa-solid fa-face-smile-beam"></i>
              </template>
            </vs-button>
          </vs-col>
        </vs-row>
      </div>
    </vs-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    isVisible: {
      type: Object as () => boolean,
    },
  },
  methods: {
    submit() {
      // this.$store.dispatch('contactos/createGroup', { nome: this.nome, contactos: this.selecionados });

      this.$emit('signout');
      this.closeDialog();
    },
    closeDialog() {
      this.$emit('close');
    },
  },
});
</script>
