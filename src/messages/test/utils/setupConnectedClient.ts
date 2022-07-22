import { io as Client, Socket } from 'socket.io-client'

export const setupConnectedClient = (url: string, token?: string): Promise<Socket> => {
  return new Promise((resolve, reject) => {
    const client = Client(url, {
      transports: ['websocket'],
      auth: { token },
    })
    client.on('connect', () => {
      resolve(client)
    })
    client.on('connect_error', error => {
      reject(error)
    })
  })
}
