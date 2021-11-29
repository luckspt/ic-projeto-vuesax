<template>
  <vs-dialog
    v-model="isVisible"
    @close="closeDialog"
    not-center>
    <div style="width:500px;">
      <div class="ml-6 mr-6">
        <h2>Sons</h2>

        <p>Volume: <small>{{ volume }}%</small></p>
          <VueSlider
            v-model="volume"
            @change="changeVolume"
            tooltip="none"
            :min="0"
            :max="100"
            :interval="5"
            drag-on-click />

        <vs-button-group style="width:64px;">
          <vs-button
            @click="addVolume(-5)"
            :disabled="volume - 5 < 0">
            -
          </vs-button>
          <vs-button
          @click="addVolume(5)"
          :disabled="volume + 5 > 100">
            +
          </vs-button>
        </vs-button-group>

        <p>Músicas e Sons</p>
        <vs-table
          v-model="selected"
          striped
          style="height:300px;overflow-y:scroll;">
          <template #notFound>
            Sem resultados
          </template>

          <!-- Header -->
          <template #thead>
            <vs-tr>
              <vs-th
                sort
                @click="songs = $vs.sortData($event, sortedSongs, 'nome')">
                Nome
              </vs-th>
              <vs-th>
                Duração
              </vs-th>
            </vs-tr>
          </template>

          <!-- Body -->
          <template #tbody>
            <vs-tr
              v-for="(som, i) in songs"
              :key="i"
              :data="som"
              :is-selected="selected && selected.nome === som.nome">

              <!-- Nome -->
              <vs-td>
                {{ som.nome }}
              </vs-td>

              <!-- Duração -->
              <vs-td>
                {{ ms(som.duracao) }}
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </div>
    </div>

    <template #footer>
      <div class="grid">
        <vs-row justify="end">
          <vs-col w="7" class="mr-2">
            <vs-button
              @click="closeDialog"
              style="float:left;">
              <i class="fa-solid fa-xmark mr-2"></i>
              Fechar
            </vs-button>
            <vs-button
              danger
              :disabled="aTocar.length === 0"
              @click="stop"
              style="float:left;">
              <i class="fa-solid fa-stop mr-2"></i>
              Parar
            </vs-button>
            <vs-button
              success
              :disabled="!selected"
              @click="play"
              style="float:left;">
              <i class="fa-solid fa-play mr-2"></i>
              Tocar
            </vs-button>
          </vs-col>
        </vs-row>
      </div>
    </template>
  </vs-dialog>
</template>

<script lang="ts">
/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-dynamic-require */
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/antd.css';

import Vue from 'vue';
import { Contacto, Som } from '@/typings/typings';

export default Vue.extend({
  components: {
    VueSlider,
  },
  props: {
    isVisible: {
      type: Object as () => boolean,
    },
    chat: {
      type: Object as () => Contacto,
    },
  },
  data: () => ({
    volume: 75,
    lastVol: 75,
    selected: null as { name: string, path: string } | null,
    songs: [
      { nome: 'Amanha hablamos ok?', path: 'jorgejesus.mp3' },
      { nome: 'Amogus', path: 'amogus.mp3' },
      { nome: 'Anúncio LOL', path: 'anuncio_lol.mp3' },
      { nome: 'Astronaut in the Ocean', path: 'astronaut_ocean.mp3' },
      { nome: 'Boss AC - Sexta Feira', path: 'bossac.mp3' },
      { nome: 'Burgir', path: 'burgir.mp3' },
      { nome: 'Can you feel my heart', path: 'can_you_feel_my_heart.mp3' },
      { nome: 'Careless Whisper', path: 'careless_whisper.mp3' },
      { nome: 'Cyberpunk', path: 'cyberpunk.mp3' },
      { nome: 'Discord', path: 'discord.mp3' },
      { nome: 'Hallelujah', path: 'hallelujah.mp3' },
      { nome: 'Ihh ca burro', path: 'ihh_ca_burro.mp3' },
      { nome: 'John Cena', path: 'john_cena.mp3' },
      { nome: 'Jojos Three Pillar Theme - Ayayay', path: 'jojo_ayayay.mp3' },
      { nome: 'MLG Airhorn', path: 'mlg_airhorn.mp3' },
      { nome: 'Never Gonna Give You Up', path: 'never_gonna_give_you_up.mp3' },
      { nome: 'Não é não', path: 'nao_e_nao.mp3' },
      { nome: 'Olha tanta luz', path: 'olha_tanta_luz.mp3' },
      { nome: 'Polozhenie - Zedline', path: 'polozhenie.mp3' },
      { nome: 'Shooting Stars', path: 'shooting_stars.mp3' },
      { nome: 'Super idol', path: 'super_idol.mp3' },
      { nome: 'Um Volto Já - João Pedro Pais', path: 'um_volto_ja.mp3' },
      { nome: 'Vine Boom', path: 'vine_boom.mp3' },
      { nome: 'Yeah Baby', path: 'yeah_baby.mp3' },
    ] as Som[],
    aTocar: [] as HTMLAudioElement[],
  }),
  computed: {
    sortedSongs(): Som[] {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return this.songs.slice(0).sort((a, b) => {
        if (a.nome < b.nome) { return -1; }
        if (a.nome > b.nome) { return 1; }
        return 0;
      });
    },
  },
  methods: {
    ms(ms: number) {
      return ms;
    },
    addVolume(amount: number): void {
      this.volume += amount;
      this.changeVolume();
    },
    changeVolume(): void {
      if (this.volume !== this.lastVol) {
        this.lastVol = this.volume;

        this.aTocar.forEach((audio, i) => {
          // eslint-disable-next-line no-param-reassign
          audio.volume = this.volume / 100;
          this.$set(this.aTocar, i, audio);
        });
      }
    },
    closeDialog() {
      this.$emit('close');
    },
    stop() {
      this.aTocar.forEach((audio) => audio.pause());
      this.aTocar = [];
    },
    play() {
      try {
        const audio = new Audio(require(`../../assets/audio/${this.selected?.path}`));
        audio.volume = this.volume / 100;
        audio.play();
        this.aTocar.push(audio);

        if (this.chat.nome === 'Amigos' && this.volume === 100) {
          setTimeout(() => {
            this.$store.dispatch('contactos/setParticipantCamera', { chat: this.chat, participant: 'Carlos', cameraKey: 'CarlosAssustado' });
          }, 1 * 1000);
        }
      } catch (err: any) {
        let msg = err.message;
        if (err.message.startsWith('Cannot find module')) {
          msg = `Ficheiro de áudio ${this.selected?.path} não encontrado.`;
        }

        this.$vs.notification({
          color: 'danger',
          position: 'top-right',
          title: 'Erro ao tocar som',
          text: msg,
        });
      }
    },
  },
});

</script>
