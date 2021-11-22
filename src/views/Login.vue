<template>
  <div class="grid">
    <vs-row
      style="height:720px;"
      justify="center"
      align="center">
      <vs-col w="3">
        <vs-alert relief style="height:160px;">
          <template #title>
            Iniciar Sessão
          </template>

          <!-- <small class="ml-1">Nome de utilizador</small> -->
          <vs-input
            v-model="username"
            @keypress="checkSubmit"
            class="mt-3"
            color="#ffffff"
            block
            icon-before
            label-placeholder="Nome de utilizador">
            <template #icon>
              <i class="fa-solid fa-user"></i>
            </template>
          </vs-input>

          <vs-button
            color="dark"
            :disabled="!username"
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

export default Vue.extend({
  data: () => ({
    username: '',
  }),
  mounted() {
    if (sessionStorage.getItem('user')) { this.username = this.$store.state.user.contacto.nome; }
  },
  methods: {
    iniciarSessao() {
      this.$store.dispatch('user/setUsername', this.username);
      this.$router.push({ name: 'Chat' });
    },
    checkSubmit({ code }: KeyboardEvent) {
      if (code === 'Enter' && this.username) this.iniciarSessao();
    },
  },
});
</script>
