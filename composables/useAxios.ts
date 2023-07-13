import { defu } from 'defu'
import { UseFetchOptions } from "nuxt/app";
import { useAuthStore } from '../store/useAuthStore';

export default async function useAxios<T>(url: string, opts: UseFetchOptions<T> = {}) {
     const { getTokens, storeAuthTokens, destroyAuthData } = useAuthStore();
     const { public: { apiBaseUrl: baseURL } } = useRuntimeConfig()
     const { refreshAccessToken } = useAuthApi()

     const defaults: UseFetchOptions<T> = {
          baseURL,
          key: url, //for cache purpose
          headers: {
               ...(getTokens?.accessToken && { Authorization: `Bearer ${getTokens.accessToken}` })
          },
          async onResponseError(context) {
               const isFromRefreshUrl = context?.response?.url?.endsWith('/refresh-access-token')
               const statusCode = context?.response?.status;

               /**
                * if auth error occurs after refresh request, it means refresh-token is not valid
                * so the user must be logged out
                */
               if (statusCode === 401 && isFromRefreshUrl) {
                    destroyAuthData()
               }

               /**
                * it's auth error which can be expired token or invalid token and if expired, then need to be refreshed
                * so the user can stay logged in
                */
               if (statusCode === 401) {
                    if (getTokens?.refreshToken) {
                         const { data } = await refreshAccessToken(getTokens.refreshToken);
                         if (data.value) {
                              storeAuthTokens(data.value)
                         }
                    }
               }


          },
     }

     return useFetch(url, defu(opts, defaults))
}