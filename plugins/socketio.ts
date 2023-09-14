import { io } from 'socket.io-client'
import { AuthResponse } from 'types'

export default defineNuxtPlugin({
     name: 'socket-io',
     enforce: 'pre',
     setup: () => {
          const tokens = useCookie<AuthResponse | null>('auth-tokens')
          const { public: { apiBaseUrl } } = useRuntimeConfig()
          const socketIo = io(apiBaseUrl, {
               auth: (cb) => cb({ Authorization: `Bearer ${tokens.value?.accessToken}` }),
               extraHeaders: {
                    Authorization: `Bearer ${tokens.value?.accessToken}`
               }
          });

          socketIo.on(SocketEvents.Error, (d: Error) => {
               console.log('error', d.message)
          })

          socketIo.on(SocketEvents.Connection, () => {
               console.log('connected')
          })

          return { provide: { socketIo } }
     },
     hooks: {
          'app:created'() {
               console.log('on app created!')
          }
     }
})