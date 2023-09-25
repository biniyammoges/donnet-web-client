import { FilterQuery, NotificationEntity, Paginate } from '~/types'
import { transformObjectToQuery } from '~/utils/transformObjectToQuery'
import useAxios from '~/composables/useAxios'

export default function useNotificationApi() {
     const fetchNotifications = async (filter: FilterQuery = { page: 1, limit: 20 }) => {
          const resp = await useAxios<Paginate<NotificationEntity>>(`api/notification/retrieve?${transformObjectToQuery(filter)}`)
          return resp
     }

     const readNotification = async (id: string) => {
          return useAxios(`/notification/${id}/read`)
     }

     return { fetchNotifications, readNotification }
};