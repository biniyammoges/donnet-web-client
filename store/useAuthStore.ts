import { defineStore } from "pinia";
import { AuthResponse, GlobalAppData } from "types";
import { User } from "types";
import { FileEntity } from "types/entities/file.entity";

export const useAuthStore = defineStore('auth-store', () => {
     // retrieve tokens from cookie when pages refreshs
     const tokensFromCookie = useCookie<AuthResponse | null>('auth-tokens')

     const tokens = ref<AuthResponse | null>(tokensFromCookie.value || null)
     const user = ref<User | null>(null)
     const unreadMessageCount = ref(0)
     const unreadNotificationCount = ref(0)

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
               window.location.href = '/login'
          }
     }

     const setUser = (data: Partial<User>) => {
          user.value = data
     }

     const setAvatar = (avatar: FileEntity) => {
          user.value!.avatar = avatar
     }

     const setUnreadMessageCount = (data: number) => {
          unreadMessageCount.value = data;
     }

     const setUnreadNotificationCount = (data: number) => {
          unreadNotificationCount.value = data;
     }

     return {
          unreadMessageCount,
          unreadNotificationCount,
          tokens,
          user,
          getUser,
          getTokens,
          setUser,
          setAvatar,
          storeAuthTokens,
          destroyAuthData,
          setUnreadMessageCount,
          setUnreadNotificationCount
     }
})