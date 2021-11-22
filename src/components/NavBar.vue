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
        <vs-button flat >Login</vs-button>
        <vs-button>Ajuda</vs-button>
      </template>
    </vs-navbar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
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
    openCriarGrupo() {
      this.dialogCriarGrupo = true;
    },
    closeCriarGrupo(): void {
      this.dialogCriarGrupo = false;
    },
    submitGroupCreate(): void {
      // todo group create submit
    },
  },
});
</script>
