<template>
  <base-modal v-model="createPostModal" persistant>
    <div class="bg-white w-[500px] rounded-xl p-5">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl text-gray-700">Create post</h1>
        <button
          @click="closeModal"
          class="text-xl border border-gray-500 rounded-full w-7 h-7 flex items-center justify-center text-gray-500 hover:text-gray-700"
        >
          <span class="i-mdi-close"></span>
        </button>
      </div>
      <div
        v-if="error"
        class="bg-red-50 text-red-900 rounded-lg py-2 px-4 my-2 text-lg"
      >
        {{ error }}
      </div>
      <div class="py-2 px-4 rounded-xl border mt-2 bg-gray-50">
        <div class="flex items-center justify-start mt-2">
          <img
            v-if="user?.avatar?.url"
            :src="user.avatar.url"
            alt="image"
            class="h-8 w-8 rounded-full object-cover"
          />
          <div
            v-else
            class="w-9 h-9 rounded-full border text-gray-500 border-gray-500 flex items-center justify-center"
          >
            {{ joinFirstCharacters(user?.firstName, user?.lastName) }}
          </div>
          <p class="ml-2 text-blue-900 text-lg">
            {{ `${user?.firstName} ${user?.lastName}` }}
          </p>
        </div>

        <!-- Caption Input -->
        <textarea
          @input="handleTextAreaHeight"
          ref="textAreaRef"
          class="bg-transparent w-full text-lg text-gray-600 max-h-[100px] outline-none rounded-lg my-3 transition-all"
          rows="1"
          :placeholder="`What is on your mind, ${user?.firstName}?`"
          v-model="caption"
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
      <base-button @click="handleSubmit">Create</base-button>
    </div>
  </base-modal>
</template>

<script setup lang="ts">
// Imports
import { storeToRefs } from "pinia";
import usePostApi from "~/composables/usePostApi";

// api composables
const { createPost } = usePostApi();
const { uploadFile } = useFileApi();

// store composables
const { addPost } = usePostStore();
const globalState = useModalStore();
const { getUser: user } = useAuthStore();

interface UploadI {
  previewUrl: string;
  fileId?: string;
  uploading: boolean;
  uploaded: boolean;
  file: File;
}

// states
const { createPostModal } = storeToRefs(globalState);
const textAreaRef = ref<HTMLTextAreaElement | null>(null);
const caption = ref("");
const uploads = ref<UploadI[]>([]);
const error = ref<null | string>(null);

// Methods
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
  if (upload.fileId) {
  }

  uploads.value = uploads.value.filter(
    (up) => up.previewUrl !== upload.previewUrl
  );
};

const closeModal = () => {
  globalState.closeCreatePostModal();
};

const handleSubmit = async () => {
  // set error to null initially
  error.value = null;

  const medias = uploads.value
    .filter((u) => u.fileId)
    .map((u) => ({ fileId: u.fileId! }));
  const res = await createPost({ caption: caption.value, medias });

  // handles success
  if (res.data.value) {
    addPost(res.data.value);
    uploads.value = [];
    caption.value = "";
    closeModal();
  }

  // handles error
  if (res.error.value) {
    if (res.error.value.data) {
      error.value = res.error.value.data?.message;
    } else if (res.error.value.message) {
      error.value = res.error.value?.message;
    }
  }
};
</script>
