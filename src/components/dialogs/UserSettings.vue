<!-- TODO -->
<template>
  <Dialog
    :visible.sync="isVisible"
    modal
    :style="{width: '500px'}"
    @hide="closeDialog">
    <template #header>
      <h3>Definições de Utilizador</h3>
    </template>

    <InputText
      v-model="username"
      style="width:100%"/>

    <template #footer>
    <Button
      label="Cancelar"
      icon="pi pi-times"
      class="p-button-danger"
      @click="closeDialog"/>
    <Button
      label="Confirmar"
      icon="pi pi-check"
      class="p-button-success"
      @click="submeterDefinicoes"/>
    </template>
  </Dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';

export default Vue.extend({
  components: {
    Button,
    Dialog,
    InputText,
  },
  props: {
    isVisible: {
      type: Object as () => boolean,
    },
  },
  data: () => ({
    username: '',
  }),
  mounted() {
    console.log('us', this.isVisible);
  },
  methods: {
    closeDialog(): void {
      this.$emit('close');
    },
    submeterDefinicoes(): void {
      // this.$store.dispatch('user/', );
      this.closeDialog();
    },
  },
});
</script>
