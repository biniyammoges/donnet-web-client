import { useAuthStore } from "../store/useAuthStore"
import useAuthApi from "../composables/useAuthApi"

export default defineNuxtRouteMiddleware(async (to, _from) => {
     const { getTokens, setUser, } = useAuthStore();
     const { getMe } = await useAuthApi();

     const publicRoutes = ['/login', '/register'];

     if (!publicRoutes.includes(to.path) && !getTokens?.accessToken) {
          return navigateTo('/login')
     }

     if (publicRoutes.includes(to.path) && getTokens?.accessToken) {
          return navigateTo('/')
     }

     if (!publicRoutes.includes(to.path)) {
          const { data } = await getMe()

          // if error, then axios interceptor handles it
          if (data.value) {
               setUser(data.value)
          }
     }
})