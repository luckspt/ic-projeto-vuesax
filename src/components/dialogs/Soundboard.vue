<template>
  <vs-dialog
    v-model="isVisible"
    @close="closeDialog"
    not-center>
    <div style="width:500px;">
      <div class="ml-6 mr-6">
        <h2>Soundboard</h2>

        <p>Volume: {{ volume }}%</p>
          <VueSlider
            v-model="volume"
            @change="changeVolume"
            tooltip="none"
            :interval="5"
            drag-on-click />

        <vs-button-group>
          <vs-button @click="addVolume(-5)">
            -
          </vs-button>

          <vs-button @click="addVolume(5)">
            +
          </vs-button>
        </vs-button-group>

        <h3 style='margin-top:30px;'>Músicas e Sons</h3>
        <Listbox
          listStyle="max-height:169px"
          filter
          v-model="selected"
          :options="sortedSongs"
          optionLabel="name">
        </Listbox>
      </div>
    </div>

    <template #footer>
      <Button style="background-color: #B90E0A;"
        @click="closeDialog">

        <i class="fa-solid fa-xmark p-mr-2"></i>

        Fechar
      </Button>
      <Button
        :disabled="aTocar.length === 0"
        class="p-button-danger"
        @click="stop">
        <i class="fa-solid fa-stop p-mr-2"></i>
        Parar
      </Button>
      <Button
        :disabled="!selected"
        class="p-button-success"
        @click="play">
        <i class="fa-solid fa-play p-mr-2"></i>
        Tocar
      </Button>
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

export default Vue.extend({
  components: {
    VueSlider,
  },
  props: ['isVisible'],
  data: () => ({
    volume: 75,
    selected: null as { name: string, path: string } | null,
    songs: [
      { name: 'Amogus', path: 'amogus.mp3' },
      { name: 'John Cena', path: 'john_cena.mp3' },
      { name: 'Anúncio LOL', path: 'anuncio_lol.mp3' },
      { name: 'Boss AC - Sexta Feira', path: 'bossac.mp3' },
      { name: 'Burgir', path: 'burgir.mp3' },
      { name: 'Careless Whisper', path: 'careless_whisper.mp3' },
      { name: 'Cyberpunk', path: 'cyberpunk.mp3' },
      { name: 'Discord', path: 'discord.mp3' },
      { name: 'Ihh ca burro', path: 'ihh_ca_burro.mp3' },
      { name: 'Não é não', path: 'nao_e_nao.mp3' },
      { name: 'Olha tanta luz', path: 'olha_tanta_luz.mp3' },
      { name: 'Super idol', path: 'super_idol.mp3' },
      { name: 'Vine Boom', path: 'vine_boom.mp3' },
      { name: 'Yeah Baby', path: 'yeah_baby.mp3' },
      { name: 'MLG Airhorn', path: 'mlg_airhorn.mp3' },
      { name: 'Jojos Three Pillar Theme - Ayayay', path: 'jojo_ayayay.mp3' },
      { name: 'Hallelujah', path: 'hallelujah.mp3' },
      { name: 'Amanha hablamos ok?', path: 'jorgejesus.mp3' },
      { name: 'Astronaut in the Ocean', path: 'astronaut_ocean.mp3' },
      { name: 'Um Volto Já - João Pedro Pais', path: 'um_volto_ja.mp3' },
      { name: 'Polozhenie - Zedline', path: 'polozhenie.mp3' },
      { name: 'Shooting Stars', path: 'shooting_stars.mp3' },
      { name: 'Never Gonna Give You Up', path: 'never_gonna_give_you_up.mp3' },
    ],
    aTocar: [] as HTMLAudioElement[],
    lastVol: 75,
  }),
  computed: {
    sortedSongs(): {name: string, path: string}[] {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return this.songs.slice(0).sort((a, b) => {
        if (a.name < b.name) { return -1; }
        if (a.name > b.name) { return 1; }
        return 0;
      });
    },
  },
  methods: {
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
        const audio = new Audio(require(`@/assets/audio/${this.selected?.path}`));
        audio.volume = this.volume / 100;
        audio.play();
        this.aTocar.push(audio);
        // document.getElementById('tocar').disabled;
      } catch {
        alert(`Erro ao reproduzir o áudio ${this.selected?.name}`);
      }
    },
  },
});

</script>
