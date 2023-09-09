import useAxios from '~/composables/useAxios'
import { AuthResponse, ErrorResponse, LoginDto, RegisterDto, UpdateMeDto } from "types/"

export default function useAuthApi() {
     const login = async (body: LoginDto) => {
          const resp = await useAxios<AuthResponse>('api/auth/login', { body, method: 'POST' })
          return resp
     }

     const register = async (body: RegisterDto) => {
          const resp = await useAxios('api/auth/signup', { body, method: 'POST' })
          return resp
     }

     const getMe = async () => {
          const resp = await useAxios('api/auth/me')
          return resp
     }

     const logout = async () => {
          const resp = await useAxios('api/auth/logout')
          return resp
     }

     const refreshAccessToken = async (accessToken: string) => {
          const resp = await useAxios('api/auth/refresh-access-token',
               { headers: { authorization: `Bearer ${accessToken}` } })
          return resp
     }

     const updateMe = async (body: UpdateMeDto) => {
          const resp = await useAxios('api/auth/me/update', { method: 'put', body })
          return resp
     }

     return { login, register, getMe, logout, refreshAccessToken, updateMe }
};