import { User } from 'types'
import { FileEntity } from 'types/entities/file.entity'
import useAxios from '~/composables/useAxios'

export default function useUserApi() {
     const validateUsername = async (username: string) => {
          const resp = await useAxios<{ valid: boolean }>('api/user/validate-username',
               { body: { username }, method: 'POST' })
          return resp
     }

     const uploadUserAvatar = async (fileId: string) => {
          const resp = await useAxios<FileEntity>('/api/user/upload/avatar',
               { method: 'post', body: { fileId } });
          return resp
     }

     const findByUsername = async (username: string) => {
          const resp = await useAxios<User>(`/api/user/find/${username}`);
          return resp
     }

     return { validateUsername, uploadUserAvatar, findByUsername }
};