<template>
  <div>
    <vs-navbar dark shadow text-white class="rounded-corners">
      <template #left>
        <img class="py-2" src="@/assets/img/logo.png" height="50" />
        <vs-navbar-item @click="goHome">Concord</vs-navbar-item>

        <vs-navbar-item @click="openCriarGrupo">
          Criar Grupo
        </vs-navbar-item>
      </template>

      <template #right>
        <vs-switch
          v-model="lightMode"
          @click="changeTheme">
          <template #on>
            <i class='fa-solid fa-sun mr-2'></i>
            Claro
          </template>
          <template #off>
            <i class='fa-solid fa-moon mr-2'></i>
            Escuro
          </template>
        </vs-switch>
        <vs-button flat @click="goHelp">
          Ajuda
        </vs-button>
        <vs-button
          danger
          @click="signout">
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

<style lang="scss" scoped>
.vs-switch {
  height: 34px;
}
</style>

<script lang="ts">
import Vue from 'vue';
import CriarGrupo from './dialogs/CriarGrupo.vue';

export default Vue.extend({
  components: { CriarGrupo },
  data() {
    return {
      dialogCriarGrupo: false,
      lightMode: false,
    };
  },
  mounted() {
    this.lightMode = localStorage.getItem('vsTheme') !== 'dark';
    this.$vs.setTheme(this.lightMode ? 'light' : 'dark');
  },
  methods: {
    changeTheme() {
      this.$vs.toggleTheme(this.lightMode ? 'light' : 'dark');
    },
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
