<template>
  <!-- create story modal -->
  <base-modal v-model="showCreateStoryModal" persistant>
    <div class="bg-white max-w-[500px] w-full rounded-xl p-5 mx-4 sm:mx-auto">
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-gray-700 text-2xl font-medium">Create story</h1>

        <div class="flex gap-x-2 items-center">
          <base-button rounded="full"
            >Share <span class="i-mdi-arrow-right ml-1"></span
          ></base-button>
          <button
            @click="showCreateStoryModal = false"
            class="text-xl border border-gray-500 rounded-full w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-700"
          >
            <span class="i-mdi-close"></span>
          </button>
        </div>
      </div>
      <div
        v-if="error"
        class="bg-red-50 text-red-900 rounded-lg py-2 px-4 my-2 text-lg"
      >
        {{ error }}
      </div>
      <div
        class="flex items-center justify-center flex-col max-w-[250px] mx-auto py-6"
      >
        <h1 class="text-gray-700 text-lg text-center mb-3">
          Choose image and share it with your friends
        </h1>
        <input type="file" id="storyUploader" class="hidden" />
        <label
          for="storyUploader"
          class="text-blue-900 bg-blue-50 py-2 px-5 rounded-full cursor-pointer"
          >Browse photo</label
        >
      </div>
    </div>
  </base-modal>

  <!-- storie preview -->
  <teleport to="body">
    <div
      v-if="showStories"
      @click.self="showStories = false"
      class="fixed w-screen h-screen flex items-center justify-evenly bg-black bg-opacity-70 z-50"
    >
      <!-- story  -->

      <div class="max-h-[250px] h-full w-[150px] bg-green-200 rounded-xl"></div>
      <div class="max-h-[250px] h-full w-[150px] bg-green-200 rounded-xl"></div>
      <div
        v-if="stories[activeStoryIdx]"
        class="max-h-[600px] h-full w-[370px] bg-black bg-opacity-80 rounded-xl"
      >
        <!-- story header -->
        <div class="flex items-center px-4 py-3">
          <!-- avatar -->
          <div class="avatar relative">
            <img
              class="h-full absolute top-0 left-0 w-full object-cover z-20"
              src="~/assets/images/image-1.jpg"
              alt="image"
            />
          </div>
          <!-- creator detail -->
          <div class="ml-2">
            <h1 class="text-white text-lg font-medium leading-5">
              {{
                stories[activeStoryIdx]?.creator?.firstName +
                  " " +
                  stories[activeStoryIdx]?.creator?.lastName ?? ""
              }}
            </h1>
            <p class="text-white">{{ dateToTimeAgo(new Date()) }}</p>
          </div>

          <!-- actions -->
          <div class="text-white ml-auto flex gap-x-2 items-center">
            <button
              class="w-10 h-10 bg-white bg-opacity-30 rounded-full text-2xl flex items-center justify-center"
            >
              <span class="i-mdi-play"></span>
            </button>
          </div>
        </div>

        <div
          v-if="stories[activeStoryIdx].medias?.length"
          class="w-full h-[470px]"
        >
          <img
            :src="stories[activeStoryIdx].medias[0].file.url"
            alt=""
            class="object-contain h-full w-full"
          />
        </div>
      </div>
      <div class="max-h-[250px] h-full w-[150px] bg-green-200 rounded-xl"></div>
      <div class="max-h-[250px] h-full w-[150px] bg-green-200 rounded-xl"></div>
    </div>
  </teleport>

  <div class="relative">
    <button @click="onScroll('left')" class="story-scroll-btn prev">
      <span class="i-mdi-chevron-left"></span>
    </button>
    <button @click="onScroll('right')" class="story-scroll-btn right">
      <span class="i-mdi-chevron-right"></span>
    </button>
    <div
      ref="storyContainerRef"
      class="story-list overflow-x-auto flex items-center gap-x-3 transition-all"
    >
      <story-create-button @click="showCreateStoryModal = true" />
      <story-item
        @click="selectStory(idx)"
        v-for="(s, idx) of stories"
        :key="s.id"
        :story="s"
      ></story-item>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

const storyStore = useStoryStore();
const { stories } = storeToRefs(storyStore);
const storyContainerRef = ref<HTMLDivElement | null>(null);

interface UploadI {
  previewUrl: string;
  fileId?: string;
  uploading: boolean;
  uploaded: boolean;
  file: File;
}

const showCreateStoryModal = ref(false);
const showStories = ref(false);
const uploads = ref<UploadI[]>([]);
const error = ref<null | string>(null);
const paused = ref(false);

// story preview state
const activeStoryIdx = ref<number>(0);

const selectStory = (idx: number) => {
  activeStoryIdx.value = idx;
  showStories.value = true;
};

const pauseStory = () => {
  paused.value = true;
};

const onScroll = (position: "left" | "right") => {
  const width = storyContainerRef.value?.getBoundingClientRect().width!;

  const currentScrollPosition = storyContainerRef.value?.scrollLeft ?? 0;

  if (storyContainerRef.value && position === "right") {
    const newScrollPosition = currentScrollPosition + width;
    storyContainerRef.value.scroll({
      left: newScrollPosition,
      behavior: "smooth",
    });
  }

  if (storyContainerRef.value && position === "left") {
    const newScrollPosition = currentScrollPosition - width;
    storyContainerRef.value.scroll({
      left: newScrollPosition,
      behavior: "smooth",
    });
  }
};
</script>

<style scoped>
.story-list::-webkit-scrollbar {
  display: none;
  scrollbar-width: none;
}

.story-scroll-btn {
  @apply absolute  top-1/2 -translate-y-1/2 z-30 text-3xl text-white h-7 w-7 rounded-full hover:scale-110 border-[0.5px] border-gray-500 flex items-center;
  background-color: rgba(0, 0, 0, 0.2);
}

.prev {
  @apply -left-3;
}

.right {
  @apply -right-3;
}

.avatar {
  @apply overflow-hidden h-10 w-10 rounded-full border-2 border-white z-40;
}
</style>
