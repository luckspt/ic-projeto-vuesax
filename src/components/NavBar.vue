<template>
  <div>
    <vs-navbar color="dark" shadow text-white class="rounded-corners">
      <template #left>
        <img class="py-2" src="@/assets/img/logo.png" height="50" />
        <vs-navbar-item @click="goHome">Concord</vs-navbar-item>

        <vs-navbar-item @click="openCriarGrupo">
          Criar Grupo
        </vs-navbar-item>
      </template>

      <template #right>
        <vs-button @click="goHelp">
          Ajuda
        </vs-button>
        <vs-button flat @click="signout">
          <i class="fas fa-power-off mr-2"></i>
          Terminar Sessão
        </vs-button>
      </template>
    </vs-navbar>

    <CriarGrupo
      :isVisible.sync="dialogCriarGrupo"
      @close="closeCriarGrupo" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import CriarGrupo from './dialogs/CriarGrupo.vue';

export default Vue.extend({
  components: { CriarGrupo },
  data() {
    return {
      dialogCriarGrupo: false,
      items: [
        {
          label: 'Criar',
          icon: 'pi pi-fw pi-plus',
          items: [
            {
              label: 'Grupo',
              icon: 'pi pi-fw pi-users',
              command: () => {
                alert('Não implementado.');
                this.$data.dialogCriarGrupo = true;
              },
            },
            {
              label: 'Contacto',
              icon: 'pi pi-fw pi-user',
              command: () => {
                alert('Não implementado.');
              },
            },

          ],
        },
        {
          label: 'Ajuda',
          icon: 'pi pi-fw pi-question-circle',
          command: () => {
            alert('Não implementado.');
          },
        },
      ],
    };
  },
  methods: {
    goHome() {
      if (this.$route.name !== 'Chat') this.$router.push({ name: 'Chat' });
    },
    goHelp() {
      if (this.$route.name !== 'Help') this.$router.push({ name: 'Help' });
    },
    openCriarGrupo() {
      this.dialogCriarGrupo = true;
    },
    closeCriarGrupo(): void {
      this.dialogCriarGrupo = false;
    },
    submitGroupCreate(): void {
      // todo group create submit
    },
    async signout() {
      await this.$store.dispatch('user/reset');
      await this.$store.dispatch('contactos/reset');
      await this.$router.push({ name: 'Login' });
      window.location.reload();
    },
  },
});
</script>
