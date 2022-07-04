import { Socket } from 'socket.io'

export interface AuthPayload {
  userId: string
  nickname: string
}

export type AuthSocket = Socket & AuthPayload
