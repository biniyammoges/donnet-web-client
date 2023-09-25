import { defineStore } from "pinia";
import { NotificationEntity } from "types";

export const useNotificationStore = defineStore('notification-store', () => {
     // states
     const notifications = ref<NotificationEntity[]>([]);

     const setNotifications = (data: NotificationEntity[]) => {
          notifications.value = data
     }

     const markAllAsRead = () => {
          for (const noti of notifications.value.filter(n => !n.isRead)) {
               noti.isRead = true
          }
     }

     const markOneAsRead = (id: string) => {
          const noti = notifications.value.find((n) => n.id === id);
          if (noti) {
               noti.isRead = true
          }
     }

     return {
          notifications,
          setNotifications,
          markAllAsRead,
          markOneAsRead
     }
})