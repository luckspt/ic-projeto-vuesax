/* eslint-disable no-param-reassign */
import { ActionContext } from 'vuex';
import { ParticipanteChamada, Recente } from '@/typings/typings';

const defaults = {
  imagem: 'img/linus_nobg.png',
  background: 'img/linus.png',
};

const state = {
  contacto: {
    nome: 'José',
    emChamada: {} as Recente,
  },
  chamada: {
    nome: '$$user$$',
    background: defaults.background,
    imagem: defaults.imagem,
    micro: true,
  } as ParticipanteChamada,
};

const mutations = {
  SAVE(currState: typeof state): void {
    sessionStorage.setItem('user', JSON.stringify(currState));
  },
  SET_USER(currState: typeof state, user: typeof state): void {
    Object.assign(currState, user);
  },
  SET_BACKGROUND(currState: typeof state, background: string): void {
    currState.chamada.background = background;
  },
  TOGGLE_IMAGE(currState: typeof state): void {
    if (currState.chamada.imagem) { currState.chamada.imagem = undefined; } else currState.chamada.imagem = defaults.imagem;
  },
  TOGGLE_MICRO(currState: typeof state): void {
    currState.chamada.micro = !currState.chamada.micro;
  },
  SET_EMCHAMADA(currState: typeof state, chamada: Recente): void {
    currState.contacto.emChamada = chamada;
  },
  SET_USERNAME(currState: typeof state, username: string): void {
    currState.contacto.nome = username;
  },
};

const actions = {
  fetch({ commit }: ActionContext<unknown, unknown>): void {
    const userStr = sessionStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      commit('SET_USER', user);
    }
  },
  setBackground({ commit }: ActionContext<unknown, unknown>, background: string): void {
    commit('SET_BACKGROUND', background);
    commit('SAVE');
  },
  toggleImage({ commit }: ActionContext<unknown, unknown>): void {
    commit('TOGGLE_IMAGE');
    commit('SAVE');
  },
  toggleMicro({ commit }: ActionContext<unknown, unknown>): void {
    commit('TOGGLE_MICRO');
    commit('SAVE');
  },
  setUsername({ commit }: ActionContext<unknown, unknown>, username: string): void {
    commit('SET_USERNAME', username);
    commit('SAVE');
  },
  resetBackground({ commit }: ActionContext<unknown, unknown>): void {
    commit('SET_BACKGROUND', 'https://i.imgur.com/257M3Pq.png');
    commit('SAVE');
  },
  joinCall({ commit }: ActionContext<unknown, unknown>, chamada: Recente): void {
    commit('SET_EMCHAMADA', chamada);
    commit('SAVE');
  },
  leaveCall({ commit }: ActionContext<unknown, unknown>): void {
    commit('SET_EMCHAMADA', {});
    commit('SAVE');
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
