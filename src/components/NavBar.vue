<template>
  <div>
    <vs-navbar dark shadow text-white class="rounded-corners">
      <template #left>
        <img class="py-2" src="@/assets/img/logo.png" height="50" />
        <vs-navbar-item @click="goHome">Concord</vs-navbar-item>
      </template>

      <template #right>

        <vs-tooltip>
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

          <template #tooltip>
            Mudar tema
          </template>
        </vs-tooltip>

        <vs-button
          @click="goHelp"
          v-shortkey="['f1']"
          @shortkey="goHelp">
          <i class="fa-solid fa-circle-question mr-2"></i>
          Ajuda
        </vs-button>

        <vs-button
          danger
          @click="openConfirmarSaida">
          <i class="fas fa-power-off mr-2"></i>
          Terminar Sessão
        </vs-button>
      </template>
    </vs-navbar>

    <ConfirmarSaida
      :isVisible.sync="dialogConfirmarSaida"
      @close="closeConfirmarSaida"
      @signout="signout"/>
  </div>
</template>

<style lang="scss" scoped>
.vs-switch {
  height: 34px !important;
}
</style>

<script lang="ts">
import Vue from 'vue';
import ConfirmarSaida from './dialogs/ConfirmarSaida.vue';

export default Vue.extend({
  components: { ConfirmarSaida },
  data() {
    return {
      dialogConfirmarSaida: false,
      lightMode: false,
    };
  },
  mounted() {
    this.lightMode = localStorage.getItem('vsTheme') === 'light';
  },
  methods: {
    changeTheme() {
      console.log('toggleTheme', this.lightMode ? 'light' : 'dark');
      this.$vs.toggleTheme(this.lightMode ? 'light' : 'dark');
    },
    goHome() {
      if (this.$route.name !== 'Chat') this.$router.push({ name: 'Chat' });
      this.$emit('goHome');
    },
    goHelp() {
      if (this.$route.name !== 'Help') this.$router.push({ name: 'Help', params: { p: this.$route.name as string } });
    },
    openConfirmarSaida() {
      this.dialogConfirmarSaida = true;
    },
    closeConfirmarSaida() {
      this.dialogConfirmarSaida = false;
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
