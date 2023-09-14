<template>
  <div class="flex gap-x-5">
    <!-- chatrooms -->
    <div
      :class="{ 'hidden 2md:block': selectedRoom }"
      class="relative w-full 2md:w-[350px] lg:w-[400px] h-screen overflow-y-auto bg-white shrink-0"
    >
      <div class="sticky top-0 z-40 bg-white w-full py-6">
        <h1 class="text-2xl px-5 font-bold mb-3 text-gray-600">Messages</h1>

        <!-- search -->
        <div
          class="mx-5 flex items-center h-10 border rounded-full overflow-hidden"
        >
          <input
            type="text"
            v-model="keyword"
            placeholder="Search"
            class="w-full outline-none px-4"
          />

          <span
            @click.stop="clear"
            v-if="keyword.length"
            class="mr-3 text-gray-400 hover:text-gray-700 flex items-center gap-x-1 text-lg i-mdi-close"
          ></span>
        </div>
      </div>

      <!-- rooms -->
      <div class="h-full">
        <div class="px-2">
          <ChatRoom
            v-for="room of rooms"
            :room="room"
            :selected="selectedRoom?.id === room?.id"
            :key="room?.id"
          />
        </div>
      </div>
    </div>

    <!-- chats -->
    <div
      :class="{ 'hidden 2md:block': !selectedRoom }"
      class="relative bg-white w-full max-h-screen overflow-y-auto"
    >
      <div v-if="!selectedRoom" class="flex items-center justify-center h-full">
        <div class="text-center">
          <h1 class="text-6xl text-gray-700">
            <span class="i-mdi-comment-outline"></span>
          </h1>
          <h1 class="text-3xl font-bold text-gray-700">Your Message</h1>
          <p class="max-w-[300px] text-gray-700 mt-2">
            Send Message to your friends And Also You can share Photos
          </p>
          <button class="bg-blue-600 text-white py-2 px-4 rounded-full mt-2">
            Find new friends
          </button>
        </div>
      </div>
      <div v-else class="h-full relative overflow-y-auto">
        <!-- header -->
        <ChatHeader
          :recipient="
            selectedRoom?.chatUsers?.length
              ? selectedRoom?.chatUsers[0].user
              : null
          "
        />

        <!-- conversations -->
        <div class="p-7 h-full flex flex-col items-start">
          <ChatItem
            v-for="chat of selectedRoom?.chats"
            :chat="chat"
            :key="chat.id"
          />
        </div>
      </div>

      <!-- Write Message -->
      <div
        v-if="selectedRoom"
        class="absolute bottom-0 overflow-hidden min-h-[55px] max-h-[120px] bg-[#F0F2F5] flex items-center w-full z-50 px-4"
      >
        <button class="text-2xl h-6 text-gray-500 hover:text-gray-600 px-2">
          <span class="i-mdi-emoji-outline"></span>
        </button>

        <input
          type="text"
          v-model="message"
          class="resize-none w-full bg-transparent py-3 text-gray-600 outline-none pr-2 placeholder:text-gray-500"
          :placeholder="`Write message here...`"
        />

        <button
          class="text-sm rounded-lg px-2 bg-blue-600 text-white right-2 h-9 mr-2"
        >
          Send
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { ChatRoomEntity } from "types";

const { setCollapsed } = useSidebarStore();
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const router = useRouter();

const keyword = ref("");
const message = ref("");

const rooms = ref<ChatRoomEntity[]>([]);
const selectedRoom = ref<ChatRoomEntity | null>(null);
const roomLoading = ref(true);

const textAreaRef = ref<HTMLTextAreaElement | null>(null);

var chats = [
  {
    id: 0,
    text: "Hi 🖐",
    side: 1,
  },
  {
    id: 1,
    text: "Hello! How can I assist you today?",
    reply: {
      text: "Hi 🖐",
    },
    side: 0,
  },
  {
    id: 2,
    text: "I have a question about your products.",
    side: 1,
  },
  {
    id: 3,
    text: "Sure, feel free to ask. I'm here to help!",
    side: 0,
  },
  {
    id: 4,
    reply: {
      text: "Sure, feel free to ask. I'm here to help!",
    },
    text: "Can you tell me more about the warranty?",
    side: 1,
  },
  {
    id: 5,
    text: "Of course! Our products come with a one-year warranty that covers manufacturing defects. If you experience any issues, we'll be happy to assist you with repairs or replacements.",
    side: 0,
  },
  {
    id: 6,
    reply: {
      text: "Of course! Our products come with a one-year warranty that covers manufacturing defects. If you experience any issues, we'll be happy to assist you with repairs or replacements.",
    },
    text: "That sounds great. Thank you!",
    side: 1,
  },
  {
    id: 7,
    reply: { text: "That sounds great. Thank you!" },
    text: "You're welcome! If you have any more questions, feel free to ask.",
    side: 0,
  },
  {
    id: 8,
    text: "Hello, may I speak to your manager?",
    side: 1,
  },
  {
    id: 9,
    text: "Certainly! Let me connect you with my manager.",
    side: 0,
  },
  {
    id: 10,
    text: "Hi, I'm the manager. How can I assist you?",
    side: 0,
  },
  {
    id: 11,
    text: "I have a concern regarding my recent order.",
    side: 1,
  },
  {
    id: 12,
    reply: { text: "I have a concern regarding my recent order." },
    text: "I apologize for the inconvenience. Please provide me with your order details, and I'll look into it right away.",
    side: 0,
  },
  {
    id: 13,
    reply: {
      text: "I apologize for the inconvenience. Please provide me with your order details, and I'll look into it right away.",
    },
    text: "Thank you for your prompt assistance.",
    side: 1,
  },
  {
    id: 14,
    reply: { text: "Thank you for your prompt assistance." },
    text: "You're welcome! We aim to provide the best customer service experience. Is there anything else I can help you with?",
    side: 0,
  },
  {
    id: 15,
    text: "Can you recommend any similar products?",
    side: 1,
  },
  {
    id: 16,
    text: "Certainly! We have a wide range of similar products that I can recommend based on your preferences. Could you please provide me with more details?",
    side: 0,
  },
  {
    id: 17,
    text: "I'm looking for a product with specific features and a moderate price range.",
    side: 1,
  },
  {
    id: 18,
    text: "Noted. Let me gather some options for you. It may take a moment.",
    side: 0,
  },
  {
    id: 19,
    text: "Thank you for your help! I'll wait for your recommendations. I apologize for the inconvenience. Please provide me with your order details, and I'll look into it right away.",
    side: 1,
  },
];

// Handles textarea height as user enter the text
const handleTextAreaHeight = (e: Event) => {
  const scrollHeight = textAreaRef.value?.scrollHeight ?? 0;
  textAreaRef.value!.style.height = "auto";
  textAreaRef.value!.style.height = scrollHeight + "px";
};

const clear = () => (keyword.value = "");

onMounted(() => {
  setCollapsed(true);
});

onUnmounted(() => {
  setCollapsed(false);
});
</script>

<style scoped>
.reply-button {
  @apply invisible text-xl text-gray-500 hover:text-gray-800;
}

.chat:hover .reply-button {
  @apply visible;
}
</style>
