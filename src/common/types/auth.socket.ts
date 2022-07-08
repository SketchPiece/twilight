import { Socket } from 'socket.io'
import { AuthPayload } from './auth.payload'

export type AuthSocket = Socket & AuthPayload
