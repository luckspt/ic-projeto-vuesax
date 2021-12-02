/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/no-unused-vars */

export interface Contacto {
    nome: string,
    grupo?: boolean,
    mail?: string,
    hidden?: boolean,
    mensagens?: Mensagem[],
    naChamada: ParticipanteChamada[],
    createdAt?: Date,
    command?: () => void // used on ListBox
}
export interface ParticipanteChamada {
    nome: string,
    micro?: boolean,
    camera?: boolean | string,
}

export interface Mensagem {
    autor: string,
    texto: string,
    momento: Date,
    imagem?: string, // TODO b64 ?
    ficheiro?: Ficheiro,
}

export interface Ficheiro {
    nome: string,
    tamanho: string,
}

export interface Som {
    nome: string,
    path: string,
    duracao?: number,
}
