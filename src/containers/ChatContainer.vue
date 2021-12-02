<template>
  <div>
    <NavBar style="height:66px;" class="mb-2"/>

    <div class="grid px-3" style="height:100%;">
      <vs-row justify="center" align="center" >
        <!-- Recentes (contactos) -->
        <vs-col w="2" class="mr-5" style="min-height:600px;">
          <!-- Barra pesquisa e star -->
          <div class="grid">
            <vs-row justify="center" align="center" >
              <!-- Barra pesquisa -->
              <vs-col w="7">
                <vs-input
                  block
                  icon-before
                  v-model="recentesSearch">
                  <template #icon>
                    <i class="fa-solid fa-magnifying-glass"></i>
                  </template>
                </vs-input>
              </vs-col>
              <vs-col w="4">
                <!-- Filtros -->
                <vs-tooltip
                  not-hover
                  v-model="filtrosTooltip"
                  right>
                  <vs-button @click="filtrosTooltip = !filtrosTooltip">
                    Filtros
                  </vs-button>
                  <template #tooltip>
                    <h4>Filtros</h4>

                    <!-- Grupos -->
                    <vs-switch
                      warn
                      v-model="filtroGrupos"
                      class="mt-1">
                      <template #off>
                          <i class='fa-solid fa-user-group' ></i>
                      </template>
                      <template #on>
                          <i class='fa-solid fa-user-group' ></i>
                      </template>
                    </vs-switch>
                  </template>
                </vs-tooltip>
              </vs-col>
            </vs-row>
          </div>

          <!-- Tabela Recentes -->
          <vs-table
            style="height:585px;overflow-y:scroll"
            v-if="reRenderTable"
            v-model="recenteSeleccionado"
            class="mt-2">
            <template #notFound>
              Sem resultados
            </template>

            <!-- Header -->
            <template #thead>
              <vs-tr>
                <vs-th>
                  Avatar
                </vs-th>
                <vs-th>
                  Nome
                </vs-th>
              </vs-tr>
            </template>

            <!-- Body -->
            <template #tbody>
              <vs-tr
                v-for="(contacto, i) in computedRecentes"
                :key="i"
                :data="contacto"
                :is-selected="recenteSeleccionado && recenteSeleccionado.nome == contacto.nome">

                <vs-td>
                  <!-- Avatar -->
                  <vs-avatar v-if="$store.getters['contactos/getAvatar'](contacto.nome)">
                    <img :src="require(`../assets/${$store.getters['contactos/getAvatar'](contacto.nome)}`)">
                  </vs-avatar>
                  <vs-avatar v-else>
                    <template #text>
                      {{ contacto.nome }}
                    </template>
                  </vs-avatar>
                </vs-td>
                <vs-td>
                  <!-- Nome -->
                  {{ contacto.nome }}
                  <i v-show="contacto.grupo"
                    class="fa-solid fa-user-group mx-1"
                    :style="{ 'color': 'gold'}"
                    v-tooltip="'Grupo'" />
                  <i v-show="$store.state.user.contacto.emChamada && $store.state.user.contacto.emChamada.nome === contacto.nome"
                    id="chamadaIconContactos"
                    :class="{
                      'fa-solid': true,
                      'fa-phone': !$store.state.user.chamada.imagem,
                      'fa-video': !!$store.state.user.chamada.imagem,
                      'mx-1': true }"
                    v-tooltip="'Em chamada'" />
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>
        </vs-col>

        <!-- Parte Chat/Chamada -->
        <vs-col w="9" v-if="recenteSeleccionado" class="pb-0">
          <div style="width:100%;">
            <div id="chatCallHeader" class="grid mb-2">
              <vs-row align="center">
                <vs-col w="4">
                  <div class="grid">
                    <vs-row justify="center" align="center">
                      <vs-col w="1" class="ml-1">
                        <vs-avatar v-if="$store.getters['contactos/getAvatar'](recenteSeleccionado.nome)">
                          <img :src="require(`../assets/${$store.getters['contactos/getAvatar'](recenteSeleccionado.nome)}`)">
                        </vs-avatar>
                        <vs-avatar v-else>
                          <template #text>
                            {{ recenteSeleccionado.nome }}
                          </template>
                        </vs-avatar>
                      </vs-col>

                      <vs-col w="9" class="ml-5">
                        <h2>{{ recenteSeleccionado.nome }}</h2>
                      </vs-col>
                    </vs-row>
                  </div>
                </vs-col>
                <vs-col w="8" v-if="$route.name === 'Chat'">
                  <div class="grid">
                    <vs-row justify="end" align="center">
                      <vs-col w="8">
                        <div class="grid">
                          <vs-row align="center" justify="end">
                            <vs-col w="6">
                              <vs-input
                                block
                                icon-before
                                v-model="pesquisaMensagem">
                                <template #icon>
                                  <i class="fa-solid fa-magnifying-glass"></i>
                                </template>
                              </vs-input>
                            </vs-col>
                            <vs-col w="6">
                              <div v-if="!emChamada" class="ml-1">
                                <vs-tooltip
                                  bottom
                                  shadow
                                  not-hover
                                  v-model="chamadaTooltip">

                                  <vs-button
                                    style="float:left;"
                                    icon
                                    @click="entraChamada(false, false)">
                                    <i class="fa-solid fa-phone mr-2"></i>
                                    Áudio
                                  </vs-button>
                                  <vs-button
                                    icon
                                    style="float:left;"
                                    @click="entraChamada(false, true)">
                                    <i class="fa-solid fa-video mr-2"></i>
                                    Vídeo
                                  </vs-button>

                                  <template #tooltip>
                                    <div class="content-tooltip">
                                      <h4 class="center">
                                        Confirmar
                                      </h4>
                                      <p>Já se encontra numa chamada. Se continuar, irá terminar a chamada anterior.</p>
                                      <footer class="center">
                                        <vs-button
                                          @click="chamadaTooltip = false"
                                          style="float:left;">
                                          Cancelar
                                        </vs-button>
                                        <vs-button
                                          @click="entraChamada(true)"
                                          danger
                                          style="float:left;">
                                          Continuar
                                        </vs-button>
                                      </footer>
                                    </div>
                                  </template>
                                </vs-tooltip>
                              </div>
                              <div v-else>
                                <vs-button
                                  icon
                                  @click="entraChamada(true, !!$store.state.user.chamada.imagem)">
                                  <i class="fa-solid fa-phone mr-2"></i>
                                  Retomar chamada
                                </vs-button>
                              </div>
                            </vs-col>
                          </vs-row>
                        </div>
                      </vs-col>
                    </vs-row>
                  </div>
                </vs-col>
              </vs-row>
            </div>

            <transition
              name="fade"
              mode="out-in">
              <router-view
                :chat="recenteSeleccionado"
                :search="pesquisaMensagem"
                @cameraUpdate="forceRerenderTable"
                @messageSent="forceRerenderTable"
                @callEnd="forceRerenderTable"/>
            </transition>
          </div>
        </vs-col>

        <!-- Nada Selecionado -->
        <vs-col v-else w="9">
          <div class="grid" style="width:970px;height:100%">
            <vs-row align="center">
              <vs-col w="5">
                <i id="leftArrow" class="fa-solid fa-share" data-fa-transform="rotate-220"></i>
              </vs-col>
              <vs-col w="5">
                <vs-alert relief >
                  <template #title>
                    <h1>Nada selecionado...</h1>
                  </template>

                  <p>Selecione um contacto ou grupo da lista da esquerda!
                    <i
                    class="fa-solid fa-face-smile-wink twemoji ml-2"
                    data-fa-transform="grow-16" /></p>
                </vs-alert>
              </vs-col>
            </vs-row>
          </div>
        </vs-col>
      </vs-row>
    </div>
  </div>
</template>

<style lang="scss">
#chamadaIconContactos {
  color: $danger;
}

#chatCallHeader {
  border-bottom: 3px $darker solid;
  border-radius: 20px;
}

#leftArrow {
  font-size: 10em;
  margin-top: 200px;
  margin-left: 70px;
  color: $primary;
}

.vs-table table {
  max-width: 100% !important;
  min-width: 100% !important;

  tbody {
    cursor: pointer;
  }
}
</style>

<script lang="ts">
import Vue from 'vue';
import { Contacto } from '@/typings/typings';
import NavBar from '@/components/NavBar.vue';

export default Vue.extend({
  components: {
    NavBar,
  },
  data: () => ({
    reRenderTable: true,
    filtrosTooltip: true,
    filtroGrupos: false,
    pesquisaMensagem: '',
    recentesSearch: '',
    recenteSeleccionado: null as Contacto | null,
    chamadaTooltip: false,
  }),
  computed: {
    emChamada() {
      return this.recenteSeleccionado?.nome === this.$store.state.user.contacto.emChamada?.nome;
    },
    computedRecentes() {
      this.forceRerenderTable();
      const query = this.recentesSearch.toLowerCase();

      return this.$store.state.contactos.recentes
        .filter((r: Contacto) => {
          let valid = !r.hidden;
          if (valid && this.recentesSearch) { valid = r.nome.toLowerCase().includes(query); }
          if (valid && this.filtroGrupos) { valid = !!r.grupo; }

          return valid;
        })
        .map((r: Contacto) => ({ ...r, lastIteraction: r.mensagens ? r.mensagens[r.mensagens.length - 1]?.momento?.getTime() : r.createdAt?.getTime() }))
        .sort((a: Contacto & { lastIteraction: number }, b: Contacto & { lastIteraction: number }) => b.lastIteraction - a.lastIteraction);
    },
  },
  methods: {
    getAvatar(nome: string) {
      return this.$store.state.contactos.avatars[nome];
    },
    forceRerenderTable() {
      this.reRenderTable = false;

      this.$nextTick().then(() => {
        this.reRenderTable = true;
      });
    },
    entraChamada(force: boolean, camera: boolean) {
      if (!force && (this.$store.state.user.contacto.emChamada?.nome && this.$store.state.user.contacto.emChamada?.nome !== this.recenteSeleccionado?.nome)) {
        this.chamadaTooltip = true;
        return;
      }
      this.chamadaTooltip = false;

      setTimeout(() => {
        this.forceRerenderTable();

        this.$store.dispatch('user/joinCall', this.recenteSeleccionado);
        if (!!this.$store.state.user.chamada.imagem !== camera) { this.$store.dispatch('user/toggleImage'); }
        this.$router.push({ name: 'Call' });
      }, 10);
    },
  },
});
</script>
