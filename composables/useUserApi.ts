import useAxios from '~/composables/useAxios'

export default function useUserApi() {
     const validateUsername = async (username: string) => {
          const resp = await useAxios<{ valid: boolean }>('api/user/validate-username', { body: { username }, method: 'POST' })
          return resp
     }

     return { validateUsername }
};