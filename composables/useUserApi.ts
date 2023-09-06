import { FileEntity } from 'types/entities/file.entity'
import useAxios from '~/composables/useAxios'

export default function useUserApi() {
     const validateUsername = async (username: string) => {
          const resp = await useAxios<{ valid: boolean }>('api/user/validate-username',
               { body: { username }, method: 'POST' })
          return resp
     }

     const uploadUserAvatae = async (fileId: string) => {
          const resp = await useAxios<FileEntity>('/api/user/upload/avatar',
               { method: 'post', body: { fileId } });
          return resp
     }

     return { validateUsername, uploadUserAvatae }
};