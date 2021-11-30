<template>
  <div class="grid">
    <vs-row
      style="height:720px;"
      justify="center"
      align="center">
      <vs-col w="4">
        <vs-alert
          color="rbg(255,255,255)"
          style="height:180px;">
          <template #title>
            penis seo ola
          </template>

          <!-- <small class="ml-1">Nome de utilizador</small> -->
          <vs-input
            v-model="nome"
            @keypress="checkSubmit"
            @input="checkErro"
            class="mt-3"
            block
            icon-before
            label-placeholder="Nome de utilizador">
            <template #icon>
              <i class="fa-solid fa-user"></i>
            </template>

            <template #message-danger v-if="erro" class="mb-0">
              {{ erro }}
            </template>
          </vs-input>

          <vs-button
            color="primary"
            :disabled="!!erro"
            @click="iniciarSessao"
            class="ml-0">
            Continuar
          </vs-button>
        </vs-alert>
      </vs-col>
    </vs-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Contacto } from '@/typings/typings';

export default Vue.extend({
  data: () => ({
    nome: '',
    erro: 'Nome obrigatório',
  }),
  mounted() {
    if (sessionStorage.getItem('user')) { this.nome = this.$store.state.user.contacto.nome; }
  },
  methods: {
    iniciarSessao() {
      this.$store.dispatch('user/setUsername', this.nome);
      this.$router.push({ name: 'Chat' });
    },
    checkSubmit({ code }: KeyboardEvent) {
      if (code === 'Enter' && !this.erro) this.iniciarSessao();
    },
    checkErro() {
      if (!this.nome) this.erro = 'Nome obrigatório';
      else if (this.nome.length > 20) this.erro = 'Comprimento máximo: 20 caracteres';
      else if (this.$store.state.contactos.recentes.find((c: Contacto) => c.nome === this.nome)) this.erro = 'Já existe um grupo ou contacto com esse nome';
      else this.erro = '';
    },
  },
});
</script>
