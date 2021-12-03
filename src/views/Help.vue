<template>
  <div
    class="mr-1">
    <div class="grid p-3" >
      <vs-button
        @click="goBack" class="ml-6 mb-3">
        <i class="fa-solid fa-circle-arrow-left mr-2"></i>Voltar
      </vs-button>

      <!-- style="height:200px;" -->
      <!-- style="overflow-y:auto;height:200px" -->
      <vs-row
        style="max-height:620px;height:620px;overflow-y:auto;"
        justify="center"
        align="center">
        <!-- Inicio de sessao -->
        <vs-col
          w="5"
          v-for="(help, i) in filteredHelp"
          :key="i"
          :offset="i % 2">
          <h1>{{ help.titulo }}</h1>

          <p
            v-for="(p, i) in help.descricao"
            :key="i">
          {{ p }}
          </p>

          <img
            v-if="help.imagem"
            :src="help.imagem" />
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

export default Vue.extend({
  computed: {
    filteredHelp() {
      return this.helps.filter((h) => h.paginaBefore === this.$route.params.p);
    },
  },
  data: () => ({
    helps: [
      {
        paginaBefore: 'Chat', titulo: 'Chat', descricao: ['Depois de iniciar sessão, escolha uma conversa que pretende no chat lateral à esquerda'], imagem: 'https://cdn.discordapp.com/attachments/890231352732057641/916103652714901504/unknown.png',
      },
      {
        paginaBefore: 'Chat', titulo: 'Pesquisa de contactos', descricao: ['Pesquise ao escrever o nome no campo de texto ou filtre os grupos através do botão que se encontra ao lado da pesquisa de contactos "'], imagem: 'https://cdn.discordapp.com/attachments/890231352732057641/916103540408193094/unknown.png',
      },
      {
        paginaBefore: 'Chat', titulo: 'Envio de Mensagens', descricao: ['Após selecionar uma conversa, no campo de texto insira a sua mensagem e carregue no enviar'], imagem: 'https://cdn.discordapp.com/attachments/890231352732057641/916103399357943848/unknown.png',
      },
      {
        paginaBefore: 'Chat', titulo: 'Enviar ficheiro', descricao: ['Carregar no botão “Ficheiro” e escolher do explorador de ficheiros do seu computador o ficheiro que pretende enviar.'], imagem: 'https://cdn.discordapp.com/attachments/890231352732057641/916108441892847616/unknown.png',
      },
      {
        paginaBefore: 'Chat', titulo: 'Iniciar Jogo', descricao: ['Selecionar o contacto/grupo da pessoa com quem quer jogar, carregar no botão “Jogos”', 'escolher o jogo que pretende jogar e a pessoa com quem quer jogar, e carregar no botão “Confirmar”.'], imagem: 'https://cdn.discordapp.com/attachments/890231352732057641/916108544531656804/unknown.png',
      },
      {
        paginaBefore: 'Chat', titulo: 'Criar grupo', descricao: ['1. Carregar no botão “Criar Grupo” na barra superior.', '2. Escrever o nome do novo grupo.', '3. Selecione os contactos que tem registados na sua lista de contactos carregando no campo seguinte.', '4. Adicionar através de email os contactos que não tenha adicionados.', 'No final deve carregar em “Confirmar” para criar o grupo ou “Cancelar" para cancelar.'], imagem: 'https://cdn.discordapp.com/attachments/890231352732057641/916104970502291507/unknown.png',
      },
      {
        paginaBefore: 'Chat', titulo: 'Iniciar Chamada', descricao: ['1. Escolher no chat o contacto/grupo com o qual pretende iniciar uma chamada.', '2. Carregar no botão “Áudio” ou “Vídeo”.', 'Caso se encontre noutra chamada, pode terminá-la no ecrã de chamada através do botão “Desligar chamada” ou selecionando no chat o contacto/grupo com quem pretende iniciar uma nova chamada carregando no botão “Áudio” ou “Vídeo” e confirmando que pretende continuar através do botão “Continuar”.'], imagem: 'https://cdn.discordapp.com/attachments/890231352732057641/916105526159482940/unknown.png',
      },
      {
        paginaBefore: 'Call', titulo: 'Mudar Fundo de Vídeo', descricao: ['Carregar no botão "Fundo de Vídeo, escolher o fundo e clicar em "Confirmar"', 'Para remover o fundo aplicado, Carregar no botão "Fundo de Vídeo" e clicar "Repor"'], imagem: 'https://cdn.discordapp.com/attachments/890231352732057641/916106684211023892/unknown.png',
      },
      {
        paginaBefore: 'Call', titulo: 'Ativar/desativar microfone', descricao: ['Carregar no botão “Microfone”'], imagem: 'https://cdn.discordapp.com/attachments/890231352732057641/916106759712686080/unknown.png',
      },
      {
        paginaBefore: 'Call', titulo: 'Ativar/desativar câmara', descricao: ['Carregar no botão “Câmara”'], imagem: 'https://cdn.discordapp.com/attachments/890231352732057641/916106405407256606/unknown.png',
      },
      {
        paginaBefore: 'Call', titulo: 'Mudar Fundo de Vídeo', descricao: ['Carregar no botão "Fundo de Vídeo, escolher o fundo e clicar em "Confirmar"', 'Para remover o fundo aplicado, Carregar no botão "Fundo de Vídeo" e clicar "Repor"'], imagem: 'https://cdn.discordapp.com/attachments/890231352732057641/915727821018628146/unknown.png',
      },
      {
        paginaBefore: 'Call', titulo: 'Sons', descricao: ['Carregar no botão “Sons”'], imagem: 'https://cdn.discordapp.com/attachments/890231352732057641/916107956980949073/unknown.png',
      },
      // Agrupar a ajuda dos sons e Musica
      {
        paginaBefore: 'Call', titulo: 'Voltar à conversa', descricao: ['Ao carregar no botão “Voltar à conversa”, será reencaminhado para a conversa do contacto/grupo com quem se encontra em chamada onde pode enviar mensagens, ficheiros, iniciar jogos, etc...'], imagem: 'https://cdn.discordapp.com/attachments/890231352732057641/916107182171373628/unknown.png',
      },
      {
        paginaBefore: 'chat', titulo: 'Retomar chamada', descricao: ['Para retomar uma chamada, basta carregar no contacto/grupo com quem se encontra em chamada e carregar no botão “Retomar chamada”'], imagem: 'https://cdn.discordapp.com/attachments/890231352732057641/915727821018628146/unknown.png',
      },
      {
        paginaBefore: 'Call', titulo: 'Terminar chamada', descricao: ['Carregar no botão “Terminar chamada” no ecrã de chamada.'], imagem: 'https://cdn.discordapp.com/attachments/890231352732057641/916106904495882310/unknown.png',
      },
      // {
      //   paginaBefore: 'chat', titulo: '', descricao: [''], imagem: 'https://cdn.discordapp.com/attachments/890231352732057641/915727821018628146/unknown.png',
      // },
    ] as {titulo: string, descricao:string[], imagem?:string, paginaBefore: string }[],
  }),
  methods: {
    goBack() {
      this.$router.push({ name: this.$route.params.p });
    },
  },
});
</script>
