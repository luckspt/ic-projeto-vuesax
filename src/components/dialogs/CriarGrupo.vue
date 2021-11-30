<template>
  <vs-dialog
    prevent-close
    v-model="isVisible"
    @close="closeDialog" >
    <div style="width:500px;">
      <div class="ml-6 mr-6">
        <h2>Criar Grupo</h2>

        <!-- NOME DO GRUPO -->
        <vs-input
          block
          primary
          label="Nome do Grupo"
          class="mt-4"
          v-model="nome"
          id="inputgroup"
          @input="nomeErrors">
          <template
            #message-danger
            v-if="errosNome">
            {{ errosNome }}
          </template>
        </vs-input>

        <!-- ADICIONAR CONTACTOS -->
        <vs-select
          block
          primary
          class="mt-4"
          label="Contactos"
          multiple
          filter
          collapse-chips
          v-model="selecionados"
          @input="contactosErrors">
          <template
            #message-danger
            v-if="errosContactos">
            {{ errosContactos }}
          </template>

          <vs-option
            v-for="(contacto, i) in contactos"
            :key="i"
            :label="contacto.nome"
            :value="contacto">
            {{ contacto.nome }}
          </vs-option>
        </vs-select>

        <!-- ADICIONAR P/MAIL -->
        <!-- TODO add botão confirmar; espaço c/lista de mails; botão remover cada mail; -->
        <vs-input
          primary
          block
          class="mt-5"
          label="Adicionar participante por e-mail"
          type="text"
          v-model="txtEmail"
          @input="emailErrors"
          @click-icon="add"
          icon-after>
          <template #icon>
            <i class='fa-solid fa-plus' id="btnAdicionar"></i>
          </template>

          <template
            #message-danger
            v-if="errosEmail">
            {{ errosEmail }}
          </template>
        </vs-input>

        <!-- Contactos email -->
        <div class="grid">
          <vs-row justify="center" align="center">
            <vs-col
              v-for="(email, i) in selecionadosEmail"
              :key="i">
              <span
                class="vs-select__chips__chip">
                {{ email }}
                <!-- TODO meter reticencias se comprimento > x; hover se comprimento > x -->
                <!-- TODO @click -->
                <span class="vs-select__chips__chip__close">
                  <i class="vs-icon-close vs-icon-hover-less"></i>
                </span>
              </span>
            </vs-col>
          </vs-row>
        </div>
      </div>
    </div>

    <template #footer>
      <!-- CONFIRMAR E CANCELAR -->
      <vs-button
        @click="submit"
        :disabled="!canSubmit"
        success
        style="float:right;"
        class="mb-2">
        <i class="fa-solid fa-check mr-2"></i>
        Confirmar
      </vs-button>
      <vs-button
        @click="closeDialog"
        style="float:right;">
        <i class="fa-solid fa-xmark mr-2"></i>
        Cancelar
      </vs-button>
    </template>
  </vs-dialog>
</template>

<style lang="scss">
.vs-select__label {
  left: 24px !important;
}

.vs-select__chips__input {
  color: white;
}

// TODO get parent e por no parent
#btnAdicionar {
  border: 5px $primary solid;
  border-radius: 10px;
}
</style>

<script lang="ts">
import Vue from 'vue';
import { Contacto } from '@/typings/typings';

export default Vue.extend({
  props: {
    isVisible: {
      type: Object as () => boolean,
    },
  },
  data: () => ({
    nome: '',
    txtEmail: '',
    selecionados: [],
    selecionadosEmail: [] as string[],
    errosNome: '',
    errosEmail: '',
    errosContactos: '',
    contactos: [],

  }),
  computed: {
    canSubmit() {
      return !this.errosNome && (this.selecionados.length || this.selecionadosEmail.length);
    },
  },
  beforeMount() {
    this.contactos = this.$store.state.contactos.recentes
      .filter((c: Contacto) => !c.grupo && !c.hidden)
      .sort((a: Contacto, b: Contacto) => {
        if (a.favorito && !b.favorito) return -1;
        if (b.favorito && !a.favorito) return 1;
        if (a.nome < b.nome) return -1;
        if (a.nome > b.nome) return 1;

        return 0;
      });
    this.resetFields();
  },
  methods: {
    nomeErrors() {
      console.log(this.$store.state.contactos.recentes.find((c: Contacto) => c.nome === this.nome));
      if (!this.nome.length) this.errosNome = 'Nome obrigatório';
      else if (this.nome.length > 20) this.errosNome = 'Comprimento máximo: 20 caracteres';
      else if (this.$store.state.contactos.recentes.find((c: Contacto) => c.nome === this.nome)) this.errosNome = 'Já existe um grupo ou contacto com esse nome';
      else this.errosNome = '';
    },
    emailErrors() {
      if (!this.txtEmail.length) this.errosEmail = 'E-mail obrigatório';
      else if (this.txtEmail.length > 128) this.errosEmail = 'Comprimento máximo: 128 caracteres';
      else if (!this.emailValid(this.txtEmail)) this.errosEmail = 'Email inválido — Não apresenta formato de e-mail.';
      else this.errosEmail = '';
    },
    contactosErrors() {
      if (!this.selecionados.length) this.errosContactos = 'Pelo menos um contacto obrigatório';
      else this.errosContactos = '';
    },
    submit() {
      this.$store.dispatch('contactos/createGroup', { nome: this.nome, contactos: this.selecionados });

      this.resetFields();
      this.closeDialog();
    },
    add() {
      this.selecionadosEmail.push(this.txtEmail);
    },
    resetFields() {
      this.nome = '';
      this.errosNome = 'Nome obrigatório';
      this.txtEmail = '';
      this.errosEmail = 'Insira um email válido.';
      this.selecionados = [];
      this.errosContactos = 'Pelo menos um contacto obrigatório';
      this.selecionadosEmail = [];
    },
    closeDialog() {
      this.$emit('close');
    },
    emailValid(email: string) {
      return email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
    },
  },
});
</script>
