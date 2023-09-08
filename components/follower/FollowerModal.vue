<template>
  <div
    class="max-w-[400px] w-full bg-white max-h-[80vh] h-auto rounded-2xl py-3 px-4 overflow-auto"
  >
    <div class="flex items-center justify-between">
      <h1 class="text-xl text-gray-600">
        {{ isFollowingModal ? "Followings" : "Followers" }}
      </h1>
      <button @click="emits('close')" class="text-2xl text-gray-600">
        <span class="i-mdi-close"></span>
      </button>
    </div>

    <!-- search -->
    <div
      v-if="!loading"
      class="mt-4 flex items-center h-11 border rounded-full overflow-hidden"
    >
      <input
        type="text"
        placeholder="Search"
        class="w-full outline-none px-4"
      />
    </div>

    <div v-if="loading" class="flex items-center justify-center flex-col py-4">
      <img class="w-9" src="~/assets/images/loader.svg" alt="" />
      <h1 class="text-gray-400">
        Loading {{ isFollowingModal ? "followings" : "followers" }}..
      </h1>
    </div>

    <div v-else class="overflow-y-auto mt-4">
      <nuxt-link
        :to="`/u/${d.user?.username}`"
        class="block hover:bg-blue-50 rounded-lg py-2 px-3"
        v-for="d of data"
        :key="d?.id"
      >
        <div class="profile flex">
          <div to="/" class="avatar mr-2 block relative h-10 w-10 rounded-full">
            <img
              v-if="d?.user?.avatar"
              :src="d?.user.avatar.url"
              alt="image"
              class="h-full w-full rounded-full object-cover"
            />
            <div
              v-else
              class="w-10 h-10 rounded-full border text-gray-500 border-gray-500 flex items-center justify-center"
            >
              {{ joinFirstCharacters(d?.user?.firstName, d?.user?.lastName) }}
            </div>
          </div>
          <div class="flex flex-col justify-center">
            <p class="text-gray-700 leading-5 truncate">
              {{ d?.user?.firstName + " " + d?.user?.lastName }}
            </p>
            <p class="text-gray-500 text-sm leading-5">
              {{ d?.user?.username }}
            </p>
          </div>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { _AsyncData } from "nuxt/dist/app/composables/asyncData";
import { FollowerEntity, User } from "types";
import { PropType } from "vue";

const { fetchFollowers, fetchFollowings } = useFollowerApi();

const props = defineProps({
  isFollowingModal: {
    type: Boolean,
    default: false,
  },
  user: {
    type: Object as PropType<User>,
    required: true,
  },
});

const data = ref<(FollowerEntity & { user?: User })[]>([]);
const loading = ref(false);

const emits = defineEmits(["close"]);

const callFollwerApi = async () => {
  if (props.isFollowingModal) {
    loading.value = true;
    const res = await fetchFollowings(props.user.username!);
    loading.value = false;
    if (res.data.value) {
      data.value = res.data.value.data.map((f) => ({
        ...f,
        user: props.isFollowingModal ? f.followee : f.follower,
      }));
    }
  } else {
    loading.value = true;
    const res = await fetchFollowers(props.user.username!);
    loading.value = false;
    if (res.data.value) {
      data.value = res.data.value.data.map((f) => ({
        ...f,
        user: props.isFollowingModal ? f.followee : f.follower,
      }));
    }
  }
};

onMounted(async () => {
  await nextTick();
  await callFollwerApi();
});
</script>
