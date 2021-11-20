<template>
  <Dialog
    :visible.sync="isVisible"
    header="Criar Novo Grupo"
    :style="{width: '50vw'}"
    modal
    @hide="closeDialog" >
    <div style="height:50vh">

      <!-- NOME DO GRUPO -->
      <div class="p-inputgroup">
        <span class="p-inputgroup-addon">
          <i class="fa-solid fa-user-group"></i>
        </span>
        <span class="p-float-label">
          <InputText id="inputgroup" type="text" />
          <label for="inputgroup">Nome do Grupo</label>
        </span>
      </div>

      <!-- ADICIONAR CONTACTOS -->
      <div class="p-mt-3">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="fa-solid fa-user-plus"></i>
          </span>
          <span class="p-float-label">
            <MultiSelect
              display="chip"
              id="multiselect"
              v-model="selecionados"
              :options="contactos"
              optionLabel="nome"
              style="max-width:100%; width:100%"
              emptyFilterMessage="Sem resultados" />
            <label for="multiselect">Adicionar contactos existentes</label>
          </span>
        </div>
      </div>

      <!-- ADICIONAR P/MAIL -->
      <!-- TODO add botão confirmar; espaço c/lista de mails; botão remover cada mail; -->
      <div class="p-mt-3">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="fa-solid fa-user-plus"></i>
          </span>
          <span class="p-float-label" >
            <InputText id="inputgroup" type="text" v-model="txtEmail" />
            <label for="inputgroup">Adicionar participante por e-mail</label>
          </span>
          <Button
            class="p-button-sm p-mr-1"
            icon="pi pi-plus" />
        </div>
      </div>
    </div>

    <template #footer>
      <!-- CONFIRMAR E CANCELAR -->
      <Button @click="closeDialog">
        <i class="fa-solid fa-xmark p-mr-2"></i>
        Cancelar
      </Button>
      <Button @click="confirmGroupCreate($event)">
        <i class="fa-solid fa-check p-mr-2"></i>
        Confirmar
      </Button>
    </template>
  </Dialog>
</template>

<script lang="ts">
//

import Vue from 'vue';
import InputText from 'primevue/inputtext';
import MultiSelect from 'primevue/multiselect';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import { Recente } from '@/typings/typings';

export default Vue.extend({
  components: {
    InputText,
    Dialog,
    Button,
    MultiSelect,
  },
  props: ['isVisible'],
  data: () => ({
    txtEmail: '',
    selecionados: [],
    contactos: [],
  }),
  computed: {
    contactos(): Recente[] {
      return this.$store.state.contactos.recentes.filter((c: Recente) => !c.grupo);
    },
  },
  methods: {
    closeDialog() {
      this.$emit('close');
    },
  },
});
</script>
