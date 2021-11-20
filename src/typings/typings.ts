/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/no-unused-vars */

export interface Contacto {
    nome: string,
    avatar?: string,
    grupo?: boolean,
    mail?: string,
    hidden?: boolean,
    favorito?: boolean,
    mensagens?: Mensagem[],
    naChamada?: ParticipanteChamada[],
    command?: () => void // used on ListBox
}

export interface Grupo extends Contacto{
    participantes?: Contacto[],
}

export interface ParticipanteChamada {
    nome: string,
    imagem?: string,
    micro?: boolean,
    background?: string,
}

export interface Mensagem {
    autor: string,
    texto: string,
    momento: Date,
    imagem?: string, // b64
    ficheiro?: Ficheiro,
}

export interface Ficheiro {
    nome: string,
    tamanho: string,
}

export type Recente = Contacto|Grupo
