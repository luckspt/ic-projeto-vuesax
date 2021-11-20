<template>
  <div class="grid">
    <vs-row id="cont" align="center" justify="center">
      <vs-col id="app" class="rounded-corners">
        <transition
          name="fade"
          mode="out-in">
          <router-view />
        </transition>
      </vs-col>
    </vs-row>

    <!-- <Login
      :isVisible.sync="dialogLogin"
      @close="closeDialogLogin" /> -->

  </div>
</template>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}
</style>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  created() {
    this.$vs.setTheme('dark');

    // Login pela primeira vez
    if (this.$route.name !== 'Login' && !sessionStorage.getItem('user')) {
      this.$router.push({ name: 'Login' });
      return;
    }

    // Carregar contactos (inclui mensagens) da sessionStorage
    this.$store.dispatch('contactos/fetch');
    // Carregar definições utilizador
    this.$store.dispatch('user/fetch');
  },
  mounted() {
    // this.ataque();
  },
  methods: {
    getCor() {
      return Math.floor(Math.random() * 16777215).toString(16);
    },
    ataque() {
      const el = document.getElementById('cont');
      if (el) {
        setInterval(() => {
          el.style.backgroundColor = `#${this.getCor()}`;
        }, 500);
      }
    },
  },
});
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Poppins&display=swap');
@import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');

*{
  font-family: Poppins, Montserrat, 'Courier New', Courier, monospace;
}

body {
  margin: 0;
  padding: 0;
}

#app {
  min-width: 1280px !important;
  min-height: 720px !important;
  max-width: 1280px !important;
  width: 1280px !important;
  max-height: 720px !important;
  height: 720px !important;
  padding: 0;
  margin: 0;
  background-color: $dark;
}

#cont {
  width: 100vw;
  height: 100vh;
  transition: background 3s;
  background-color: #7289da;
}
</style>
