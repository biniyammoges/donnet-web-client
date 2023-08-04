<template>
  <base-modal v-model="createPostModal">
    <div class="bg-white w-[500px] rounded-xl p-5">
      <h1 class="text-2xl text-gray-700">Create post</h1>
      <div class="py-2 px-4 rounded-xl border mt-2 bg-gray-50">
        <div class="flex items-center justify-start mt-2">
          <img
            src="~/assets/images/image-1.jpg"
            alt="image"
            class="h-7 w-7 rounded-full object-cover"
          />
          <p class="ml-2 text-blue-900 text-lg">Biniyam Moges</p>
        </div>

        <!-- Caption Input -->
        <textarea
          @input="handleTextAreaHeight"
          ref="textAreaRef"
          class="bg-transparent w-full text-lg text-gray-600 max-h-[100px] outline-none rounded-lg my-3 transition-all"
          rows="1"
          placeholder="What is on your mind? Biniyam"
        ></textarea>

        <!-- Uploads -->
        <div class="flex items-center gap-2 mb-3 flex-wrap">
          <div
            class="upload relative rounded-lg h-20 w-20 overflow-hidden"
            v-for="upload of uploads"
            :key="upload.previewUrl"
          >
            <div
              v-if="upload.uploading"
              class="absolute flex items-center justify-center h-full w-full z-30 bg-opacity-30 bg-black top-0 left-0"
            >
              <img width="50" src="~/assets/images/spin.svg" alt="spin" />
            </div>
            <img
              :src="upload.previewUrl"
              alt="image"
              class="w-full h-full object-cover"
            />
            <button
              @click="removeImage(upload)"
              class="absolute top-1 right-1 p-1 bg-opacity-50 bg-black h-6 rounded-full text-white hover:scale-110"
            >
              <span class="i-mdi-close"></span>
            </button>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-x-3">
          <label
            for="fileUpload"
            class="flex items-center gap-x-1 text-gray-500 hover:text-gray-700"
          >
            <span class="i-mdi-cloud-upload-outline text-xl"></span
            ><span>Upload</span>
          </label>
          <input
            id="fileUpload"
            type="file"
            @change="handleFileInput"
            accept="image/*"
            class="hidden"
          />
          <button
            type="button"
            class="flex items-center gap-x-1 text-gray-500 hover:text-gray-700"
          >
            <span class="i-mdi-emoji-excited-outline text-xl"></span
            ><span>emoji</span>
          </button>
        </div>
      </div>
      <base-button>Create</base-button>
    </div>
  </base-modal>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

const { uploadFile } = useFileApi();

const globalState = useModalStore();
const { createPostModal } = storeToRefs(globalState);

const textAreaRef = ref<HTMLTextAreaElement | null>(null);

interface UploadI {
  previewUrl: string;
  fileId?: string;
  uploading: boolean;
  uploaded: boolean;
  file: File;
}

const uploads = ref<UploadI[]>([]);

// Handles textarea height as user enter the text
const handleTextAreaHeight = () => {
  const scrollHeight = textAreaRef.value?.scrollHeight;
  textAreaRef.value!.style.height = scrollHeight + "px";
};

const handleFileInput = async (e: Event) => {
  const event = e.target as HTMLInputElement;
  const file = event.files![0];
  const previewUrl = URL.createObjectURL(file);

  uploads.value = [
    ...uploads.value,
    {
      previewUrl,
      uploading: true,
      uploaded: false,
      file,
    },
  ];

  const res = await uploadFile(file);

  const setUploadingOpts = (opts: Partial<UploadI>) => {
    const fileIdx = uploads.value.findIndex((u) => u.previewUrl === previewUrl);
    const updatedItem = { ...uploads.value[fileIdx], ...opts };
    const newUploads = [
      ...uploads.value.slice(0, fileIdx),
      updatedItem,
      ...uploads.value.slice(fileIdx + 1),
    ];
    uploads.value = newUploads;
  };

  // Set uploading status to false
  setUploadingOpts({ uploading: false });

  if (res.data.value) {
    const up = res.data.value;
    setUploadingOpts({ fileId: up?.id, uploaded: true, uploading: false });
  }
};

const removeImage = (upload: UploadI) => {
  uploads.value = uploads.value.filter(
    (up) => up.previewUrl !== upload.previewUrl
  );
};
</script>
