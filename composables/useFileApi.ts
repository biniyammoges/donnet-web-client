import { FileEntity } from '~/types/entities/file.entity'
import useAxios from '~/composables/useAxios'

export default function useFileApi() {
     const uploadFile = async (file: File) => {
          const fd = new FormData();
          fd.append('file', file)

          const response = await useAxios<FileEntity>('api/upload/image', {
               method: "POST",
               body: fd,
          });

          return response
     }

     return { uploadFile }
};