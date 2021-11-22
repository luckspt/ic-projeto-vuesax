/* eslint-disable no-restricted-syntax */
import { ActionContext } from 'vuex';
import { Mensagem, Recente } from '@/typings/typings';

const avatars = {
  $$user$$: 'img/avatars/linus.jpg',
  António: 'img/avatars/male7.jpg',
  Carlos: 'img/avatars/male6.jpg',
  Zé: 'img/avatars/male8.jpg',
  Maria: 'img/avatars/female3.jpg',
  Twix: 'img/avatars/twix.jpg',
} as Record<string, string>;

const cameras = {
  António: 'img/cameras/antonio.jpg',
  Carlos: 'img/cameras/carlos.jpg',
  CarlosAssustado: 'img/cameras/carlos_assustado.jpg',
  'Avó Miranda': 'img/cameras/avo_miranda.jpg',
  Zé: 'img/cameras/ze.jpg',
  Maria: 'img/cameras/maria.jpg',
  'Ed Sheeran': 'img/cameras/ed_sheeran.jpg',
  Twix: 'img/cameras/twix.jpg',
} as Record<string, string>;

const state = {
  avatars,
  cameras,
  recentes: [
    {
      nome: 'António',
      email: 'antonio@gmail.com',
      favorito: true,
      naChamada: [
        { nome: 'António', micro: true, camera: true },
      ],
      mensagens: [
        {
          autor: 'António',
          texto: 'Hey! Tudo fixe?',
          momento: new Date('2003/05/30 05:37:06'),
        },
        {
          autor: '$$user$$',
          texto: 'Ya meu!! Tirei alta nota a Arquiteturas de Computadores!!! ',
          momento: new Date('2003/05/30 06:10:30'),
        },
        {
          autor: 'António',
          texto: 'Mas que grande maluco tu! Quem me dera, chumbei 8 vezes a essa cadeira :(.',
          momento: new Date('2003/05/30 06:11:23'),
        },
        {
          autor: '$$user$$',
          texto: 'É como eu digo: mais vale três folhas a voar que duas garrafas na mão',
          momento: new Date('2003/05/30 06:11:47'),
        },
        {
          autor: 'António',
          texto: 'Fixe',
          momento: new Date('2003/05/30 17:58:23'),
        },
      ],
    },
    {
      nome: 'Amigos',
      grupo: true,
      naChamada: [
        { nome: 'António', camera: true },
        { nome: 'Zé', micro: true, camera: true },
        { nome: 'Carlos', camera: true, micro: true },
      ],
      mensagens: [
        {
          autor: 'António', texto: 'Quem é vosso amigo quem é?', momento: new Date('2013/01/13 12:34:11'),
        },
        {
          autor: '$$user$$', texto: 'És tu Toninho :)', momento: new Date('2013/01/13 12:36:11'),
        },
        { autor: 'Carlos', texto: 'Mas quem', momento: new Date('2013/01/13 12:37:11') },
        { autor: 'António', texto: 'quem te perguntou', momento: new Date('2013/01/13 13:14:11') },
        { autor: 'António', texto: 'já não caio nessa amigo carlitos pirulitos', momento: new Date('2013/01/13 13:15:11') },
      ],
    },
    {
      nome: 'Avó Miranda',
      naChamada: [
        { nome: 'Avó Miranda', camera: true, micro: true },
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
        { autor: 'Avó Miranda', texto: 'hojenaojantas', momento: new Date('2015/12/27 19:38:18') },
      ],
    },
    {
      nome: 'LOL123',
      grupo: true,
      favorito: true,
      naChamada: [
        { nome: 'António' },
        { nome: 'Zé', micro: true },
      ],
      mensagens: [
        { autor: 'António', texto: 'Bom dia pessoal, bora um jogo?', momento: new Date('2019/03/18 11:38:39') },
        { autor: '$$user$$', texto: 'Pode ser', momento: new Date('2019/03/18 11:40:39') },
        { autor: 'Zé', texto: 'Ainda é muito cedo, talvez daqui a uma hora', momento: new Date('2019/03/18 11:41:39') },
        { autor: 'Carlos', texto: 'Sim bora!', momento: new Date('2019/03/18 11:43:39') },
      ],
    },
    {
      nome: 'Maria',
      favorito: true,
      naChamada: [
        { nome: 'Maria', micro: true, camera: true },
      ],
      mensagens: [
        { autor: 'Maria', texto: 'O que você sabe sobre rolar nas profundezas?', momento: new Date('2019/12/19 19:01:52') },
        { autor: 'Maria', texto: 'Quando seu cérebro fica entorpecido, você pode chamar isso de congelamento mental', momento: new Date('2019/12/19 19:02:13') },
        { autor: 'Maria', texto: 'Quando essas pessoas falam demais, coloque essa cena em câmera lenta, sim', momento: new Date('2019/12/19 19:02:42') },
        { autor: 'Maria', texto: 'Eu me sinto como um astronauta no oceano, sim', momento: new Date('2019/12/19 19:03:12') },
        { autor: '$$user$$', texto: 'ok', momento: new Date('2019/12/23 12:46:52') },
        { autor: 'Maria', texto: 'feliz natal', momento: new Date('2019/12/25 14:53:52') },
      ],
    },
    {
      nome: 'Ed Sheeran',
      naChamada: [
        { nome: 'Ed Sheeran', camera: true, micro: true },
      ],
      mensagens: [
        { autor: 'Ed Sheeran', texto: 'Girl, you know I want your love', momento: new Date('2018/01/22 18:15:36') },
      ],
    },
    {
      nome: 'Twix',
      naChamada: [
        { nome: 'Twix', micro: true, camera: true },
      ],
      mensagens: [
        { autor: 'Twix', texto: 'ola sou o twix venho do futuro queres as respostas do exame de interação com computadores??? rapido', momento: new Date('2022/10/19 02:21:48') },
        { autor: '$$user$$', texto: 'omeudeus ola twix!!! sim por favor as respotas do exame de interação com computadores sim', momento: new Date('2022/10/19 10:12:48') },
        { autor: 'Twix', ficheiro: 'respostas_exame_ic2021.pdf', momento: new Date('2022/10/19 11:46:21') },
        { autor: '$$user$$', texto: 'TWIX ERA EXATAMENTE ISSO COMO E QUE SOUBESTE', momento: new Date('2022/01/10 16:01:12') },
        { autor: 'Twix', texto: 'um bom magico nao revela os seus segredos', momento: new Date('2022/01/10 20:13:21') },
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
    const c = currstate.recentes.find((r) => r.nome === data.chat.nome);
    if (c) {
      if (!c.mensagens) c.mensagens = [];
      c.mensagens.push(data.mensagem);
    }
  },
  SET_PARTICIPANT_CAMERA(currstate: typeof state, data: { chat: Recente, participant: string, cameraKey: string }): void {
    const c = currstate.recentes.find((r) => r.nome === data.chat.nome);
    if (c) {
      const user = c.naChamada?.find((r) => r.nome === data.participant);
      if (user) {
        user.camera = currstate.cameras[data.cameraKey];
      }
    }
  },
};

const actions = {
  sendMessage({ commit }: ActionContext<unknown, unknown>, data: { chat: Recente, mensagem: Mensagem }): void {
    commit('SEND_MESSAGE', data);
    commit('SAVE');
  },
  setParticipantCamera({ commit }: ActionContext<unknown, unknown>, data: { chat: Recente, participant: string, cameraKey: string }): void {
    commit('SET_PARTICIPANT_CAMERA', data);
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

const getters = {
  getCamera: (currState: typeof state) => (nome: string, chat: string): string => {
    const c = currState.recentes
      .find((r) => r.nome === chat);
    if (c) {
      const u = c.naChamada?.find((r) => r.nome === nome);
      if (u) {
        if (typeof u.camera === 'string') return u.camera;
        return u.camera ? currState.cameras[nome] : currState.avatars[nome];
      }
    }

    return currState.avatars[nome];
  },
  getAvatar: (currState: typeof state) => (nome: string): string => currState.avatars[nome],
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
