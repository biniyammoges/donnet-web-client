import { defineStore } from "pinia";
import { AuthResponse } from "types";
import { User } from "types";

export const useAuthStore = defineStore('d', () => {
     // retrieve tokens from cookie when pages refreshs
     const tokensFromCookie = useCookie<AuthResponse | null>('auth-tokens')

     const tokens = ref<AuthResponse | null>(tokensFromCookie.value || null)
     const user = ref<User | null>(null)

     // returns currently loggedin users
     const getUser = computed(() => user.value);
     const getTokens = computed(() => tokens.value)

     // store tokens in pinia and cookie
     const storeAuthTokens = (tkns: AuthResponse) => {
          tokens.value = tkns;
          tokensFromCookie.value = tkns
     }

     // remove tokens from pinia and cookie
     const destroyAuthData = () => {
          tokens.value = null;
          tokensFromCookie.value = null
          user.value = null
          if (process.client) {
               // window.location.href = '/login'
          }
     }

     const setUser = (data: Partial<User>) => {
          user.value = data
     }

     return {
          tokens,
          user,
          getUser,
          getTokens,
          setUser,
          storeAuthTokens,
          destroyAuthData,
     }
})