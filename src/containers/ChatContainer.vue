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
              <vs-col w="9">
                <vs-input
                  color="dark"
                  block
                  icon-before
                  v-model="recentesSearch">
                  <template #icon>
                    <i class="fa-solid fa-magnifying-glass"></i>
                  </template>
                </vs-input>
              </vs-col>
              <!-- Star -->
              <vs-col w="2" class="ml-2">
                <vs-switch warn>
                  <template #off>
                      <i class='fa-solid fa-star' ></i>
                  </template>
                  <template #on>
                      <i class='fa-solid fa-star' ></i>
                  </template>
                </vs-switch>
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
                :is-selected="recenteSeleccionado == contacto">

                <vs-td>
                  <!-- Avatar -->
                  <vs-avatar>
                    <template #text>
                      {{ contacto.nome }}
                    </template>
                  </vs-avatar>
                </vs-td>
                <vs-td>
                  <!-- Nome -->
                  {{ contacto.nome }}
                  <i v-show="contacto.favorito"
                    class="fa-solid fa-star"
                    :style="{ 'color': 'gold'}"
                    v-tooltip="'Favorito'" />
                  <i v-show="contacto.grupo"
                    class="fa-solid fa-user-group p-m-1"
                    :style="{ 'color': 'gold'}"
                    v-tooltip="'Grupo'" />
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>

          <!-- <Listbox
            @contextmenu="openCtxMenuRecents"
            class="p-mt-2"
            listStyle="max-height:505px;min-height:505px;"
            v-model="recenteSeleccionado"
            :options="computedRecentes"
            optionLabel="nome"
            filter
            filterPlaceholder="Pesquisar..."
            emptyFilterMessage="Sem recentes."
            >
            <template #option="slotProps">
              <div @click="openCtxMenuRecents">
                <Avatar
                  :label="slotProps.option.nome[0]"
                  shape="circle"
                  class="p-m-1" />

                <span>
                  {{ slotProps.option.nome }}
                  <i v-if="slotProps.option.favorito"
                    class="fa-solid fa-star"
                    :style="{ 'color': 'gold'}"
                    v-tooltip="'Favorito'" />
                  <i v-if="slotProps.option.grupo"
                    class="fa-solid fa-user-group p-m-1"
                    :style="{ 'color': 'gold'}"
                    v-tooltip="'Grupo'" />
                </span>
              </div>
            </template>
          </Listbox> -->
        </vs-col>

        <!-- Parte Chat/Chamada -->
        <vs-col w="9" v-if="recenteSeleccionado" class="pb-0">
          <div style="width:100%;">
            <div id="chatCallHeader" class="grid mb-2">
              <vs-row align="center">
                <vs-col w="3">
                  <h2>{{ recenteSeleccionado.nome }}</h2>
                </vs-col>
                <vs-col w="9" v-if="$route.name === 'Chat'">
                  <div class="grid">
                    <vs-row justify="end" align="center">
                      <vs-col w="6">
                        <div class="grid">
                          <vs-row align="center" justify="end">
                            <vs-col w="8">
                              <vs-input
                                block
                                color="dark"
                                icon-before
                                v-model="pesquisaMensagem">
                                <template #icon>
                                  <i class="fa-solid fa-magnifying-glass"></i>
                                </template>
                              </vs-input>
                            </vs-col>
                            <vs-col w="4">
                              <div v-if="!emChamada" class="ml-5">
                                <vs-button
                                  style="float:left;"
                                  icon
                                  @click="entraChamada(false)">
                                  <i class="fa-solid fa-phone"></i>
                                </vs-button>
                                <vs-button
                                  icon
                                  style="float:left;"
                                  @click="entraChamada(true)">
                                  <i class="fa-solid fa-video"></i>
                                </vs-button>
                              </div>
                              <div v-else>
                                <vs-button
                                  icon
                                  @click="entraChamada">
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

            <router-view
              :chat="recenteSeleccionado"
              :search="pesquisaMensagem"
              @messageSent="forceRerenderTable"/>
          </div>
        </vs-col>

        <!-- Nada Selecionado -->
        <vs-col v-else w="9">
          <div class="grid" style="width:970px;height:100%">
            <vs-row align="center">
              <vs-col w="4">
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
import { Recente } from '@/typings/typings';
import NavBar from '@/components/NavBar.vue';

export default Vue.extend({
  components: {
    NavBar,
  },
  data: () => ({
    reRenderTable: true,
    pesquisaMensagem: '',
    contextMenuItems: [
      {
        label: 'Adicionar/Remover Favoritos',
        icon: 'pi pi-star-o',
      },
    ],
    recentesSearch: '',
    recenteSeleccionado: null as Recente | null,
  }),
  computed: {
    emChamada() {
      return this.recenteSeleccionado?.nome === this.$store.state.user.contacto.emChamada?.nome;
    },
    computedRecentes() {
      return this.$store.state.contactos.recentes
        .filter((r: Recente) => (this.recentesSearch ? r.nome.includes(this.recentesSearch) : true && !r.hidden))
        .map((r: Recente) => ({ ...r, lastMsg: r.mensagens ? r.mensagens[r.mensagens.length - 1]?.momento?.getTime() : 0 }))
        .sort((a: Recente & { lastMsg: number }, b: Recente & { lastMsg: number }) => b.lastMsg - a.lastMsg);
    },
  },
  methods: {
    forceRerenderTable() {
      this.reRenderTable = false;

      this.$nextTick().then(() => {
        this.reRenderTable = true;
      });
    },
    entraChamada(camera: boolean) {
      this.$store.dispatch('user/joinCall', this.recenteSeleccionado);
      if (!!this.$store.state.user.chamada.imagem !== camera) { this.$store.dispatch('user/toggleImage'); }
      this.$router.push({ name: 'Call' });
    },
  },
});
</script>
