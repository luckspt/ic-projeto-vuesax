<template>
  <div
    style="max-height:720px;height:720px;overflow-y:auto;"
    class="mr-1">
    <div class="grid p-3">
      <!-- style="height:200px;" -->
      <!-- style="overflow-y:auto;height:200px" -->
      <vs-row
        justify="center"
        align="center">
        <vs-col w="6">
          <h1>Ajuda</h1>
          <h3>Início de Sessão</h3>
          <p>Insira o seu nome de utilizador e clique em "Continuar"</p>
          <img src="https://cdn.discordapp.com/attachments/890231352732057641/915721029890998302/unknown.png" alt="Início de Sessão" >
        </vs-col>
        <vs-col w="6">

          <h3>Chat</h3>
          <p>Depois de iniciar sessão, escolha uma conversa que pretende no chat lateral à esquerda</p>
          <img src="https://cdn.discordapp.com/attachments/890231352732057641/915723573065310318/unknown.png" alt="Escolher conversa" >
        </vs-col>
      </vs-row>
      <vs-row>
        <vs-col w="6">
          <h3>Envio de Mensagens</h3>
          <p>Após selecionar uma conversa, no campo de texto insira a sua mensagem e carregue no enviar</p>
          <img src="https://cdn.discordapp.com/attachments/890231352732057641/915727821018628146/unknown.png" alt="Enviar mensagem" >
        </vs-col>
        <vs-col w="6">
          <h3>Pesquisa de contactos</h3>
          <p>Pesquise ao escrever o nome no campo de texto ou filtre através do botão "filtro"</p>
          <img src="https://cdn.discordapp.com/attachments/890231352732057641/915727821018628146/unknown.png" alt="Enviar mensagem" >
        </vs-col>
      </vs-row>
      <vs-row>
        <vs-col w="6">
          <h3>Iniciar Chamada de Áudio</h3>
          <p>Após selecionar uma conversa, selecione o botão "Áudio"</p>
          <img src="https://cdn.discordapp.com/attachments/890231352732057641/915727821018628146/unknown.png" alt="Enviar mensagem" >
        </vs-col>
        <vs-col w="6">
          <h3>Mudar Fundo de Vídeo</h3>
          <p>Carregar no botão "Fundo de Vídeo, escolher o fundo e clicar em "Confirmar"</p>
          <p>Para remover o fundo aplicado, Carregar no botão "Fundo de Vídeo" e clicar "Repor"</p>
          <img src="https://cdn.discordapp.com/attachments/890231352732057641/915727821018628146/unknown.png" alt="Enviar mensagem" >
        </vs-col>
      </vs-row>
    </div>
  </div>
</template>

<style lang="scss" scoped>
img {
  border: 3px solid white;
  width: 400px;
}
</style>

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
