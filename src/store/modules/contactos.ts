/* eslint-disable no-restricted-syntax */
import { ActionContext } from 'vuex';
import { Mensagem, Recente } from '@/typings/typings';

const avatars = {
  $$user$$: 'img/avatars/avataaars.png',
  António: 'img/avatars/avataaars1.png',
};

const cameras = {
  António: 'img/cameras/antonio.jpg',
  Carlos: 'img/cameras/carlos.jpg',
  'Avó Miranda': 'img/cameras/avo_miranda.jpg',
  Ze: 'img/cameras/ze.jpg',
  Maria: 'img/cameras/maria.jpg',
  'Ed Sheeran': 'img/cameras/ed_sheeran.jpg',
  Twix: 'img/cameras/twix.jpg',
};

const state = {
  avatars,
  cameras,
  recentes: [
    {
      nome: 'António',
      avatar: avatars['António'],
      email: 'antonio@gmail.com',
      favorito: true,
      naChamada: [
        { nome: 'António' },
      ],
      mensagens: [
        {
          autor: 'António', avatar: avatars['António'], texto: 'Hey! Tudo fixe?', momento: new Date('2003/05/30 05:37:06'),
        },
        {
          autor: '$$user$$', texto: 'Ya meu!! Tirei alta nota a Arquiteturas de Computadores!!! ', momento: new Date('2003/05/30 06:10:30'),
        },
        {
          autor: 'António', avatar: avatars['António'], texto: 'Mas que grande maluco tu! Quem me dera, chumbei 8 vezes a essa cadeira :(.', momento: new Date('2003/05/30 06:11:23'),
        },
        {
          autor: '$$user$$', texto: 'É como eu digo: mais vale três folhas a voar que duas garrafas na mão', momento: new Date('2003/05/30 06:11:47'),
        },
      ],
    },
    {
      nome: 'Amigos',
      grupo: true,
      favorito: false,
      naChamada: [
        { nome: 'António', imagem: cameras['António'] },
        { nome: 'Carlos', imagem: cameras.Carlos },
      ],
      mensagens: [
        {
          autor: 'António', avatar: avatars['António'], texto: 'Quem é vosso amigo quem é?', momento: new Date(2013, 13, 1),
        },
        {
          autor: '$$user$$', texto: 'És tu Toninho :)', momento: new Date(2013, 13, 2),
        },
        { autor: 'Carlos', texto: 'Mas quem?', momento: new Date(2013, 13, 1) },
        {
          autor: 'António', avatar: avatars['António'], texto: 'É por isso que ninguém é teu amigo Carlos...', momento: new Date(2013, 13, 1),
        },
      ],
    },
    {
      nome: 'Avó Miranda',
      naChamada: [
        { nome: 'Avó Miranda', imagem: cameras['Avó Miranda'] },
      ],
      mensagens: [
        { autor: 'Avó Miranda', texto: '´onetinhoajudaaavo,naoencontro!oespaço', momento: new Date('2015/12/21 15:51:50') },
        {
          autor: '$$user$$', texto: 'é o retângulo no meio', momento: new Date('2015/12/21 15:52:30'),
        },
        { autor: 'Avó Miranda', texto: 'hã', momento: new Date('2015/12/21 19:28:18') },
        {
          autor: '$$user$$', texto: 'burger', momento: new Date('2015/12/27 12:11:50'),
        },
      ],
    },
    {
      nome: 'LOL123',
      grupo: true,
      favorito: true,
      naChamada: [
        { nome: 'António', imagem: cameras['António'] },
        { nome: 'Carlos', imagem: cameras.Carlos },
        { nome: 'Zé', imagem: cameras.Ze },
      ],
      mensagens: [
        {
          autor: 'António', avatar: avatars['António'], texto: 'Bom dia pessoal, bora um jogo?', momento: new Date(2013, 13, 1),
        },
        {
          autor: '$$user$$', texto: 'Pode ser', momento: new Date(2013, 13, 2),
        },
        { autor: 'Zé', texto: 'Ainda é muito cedo, talvez daqui a uma hora', momento: new Date(2013, 13, 1) },
        { autor: 'Carlos', texto: 'Sim bora!', momento: new Date(2013, 13, 1) },
      ],
    },
    {
      nome: 'Maria',
      favorito: true,
      naChamada: [
        { nome: 'Maria', imagem: cameras.Maria },
      ],
      mensagens: [
        { autor: 'Maria', texto: 'O que você sabe sobre rolar nas profundezas?', momento: new Date(2013, 13, 2) },
        { autor: 'Maria', texto: 'Quando seu cérebro fica entorpecido, você pode chamar isso de congelamento mental', momento: new Date(2013, 13, 2) },
        { autor: 'Maria', texto: 'Quando essas pessoas falam demais, coloque essa cena em câmera lenta, sim', momento: new Date(2013, 13, 2) },
        { autor: 'Maria', texto: 'Eu me sinto como um astronauta no oceano, sim', momento: new Date(2013, 13, 2) },
        {
          autor: '$$user$$', texto: 'ok', momento: new Date(2013, 13, 2),
        },
      ],
    },
    {
      nome: 'Ed Sheeran',
      naChamada: [
        { nome: 'Ed Sheeran', imagem: cameras['Ed Sheeran'] },
      ],
      mensagens: [
        { autor: 'Ed Sheeran', texto: 'Girl, you know I want your love', momento: new Date(2013, 13, 2) },
      ],
    },
    {
      nome: 'Twix',
      naChamada: [
        { nome: 'Twix', imagem: cameras.Twix },
      ],
    },
    {
      nome: 'Carla',
      email: 'carla42@mail.com',
      hidden: true,
      mensagens: [{ autor: 'Carla', texto: 'what you know about rolling down in ', momento: new Date(2013, 13, 2) }],
    },

  ] as Recente[],
};

const mutations = {
  SAVE(currState: unknown): void {
    sessionStorage.setItem('contactos', JSON.stringify(currState));
  },
  SET_CONTACTOS(currState: typeof state, recentes: typeof state): void {
    Object.assign(currState, recentes);
  },
  TOGGLE_FAVORITO(currState: typeof state, nome: string): void {
    const user = currState.recentes.find((u) => u.nome === nome);
    if (user) user.favorito = !user.favorito;
  },
  TOGGLE_GROUP(currState: typeof state, nome: string): void {
    const user = currState.recentes.find((u) => u.nome === nome);
    if (user) user.grupo = !user.grupo;
  },
  SEND_MESSAGE(currstate: typeof state, data: {chat: Recente, mensagem: Mensagem}): void {
    const user = currstate.recentes.find((u) => u.nome === data.chat.nome);
    if (user) {
      if (!user.mensagens) user.mensagens = [];
      user.mensagens.push(data.mensagem);
    }
  },
};

const actions = {
  sendMessage({ commit }: ActionContext<unknown, unknown>, data: { chat: Recente, mensagem: Mensagem }): void {
    commit('SEND_MESSAGE', data);
    commit('SAVE');
  },
  fetch({ commit }: ActionContext<unknown, unknown>): void {
    const recentesStr = sessionStorage.getItem('contactos');
    if (recentesStr) {
      const recentes = JSON.parse(recentesStr) as typeof state;
      Object.assign(recentes.recentes, recentes.recentes
        .map((r) => ({
          ...r,
          mensagens: r.mensagens ? r.mensagens.map((m) => ({ ...m, momento: new Date(m.momento) })) : [],
        })));
      commit('SET_CONTACTOS', recentes);
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
