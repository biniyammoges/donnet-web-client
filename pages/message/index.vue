<template>
  <div class="flex gap-x-5 h-screen">
    <!-- chatrooms -->
    <div
      :class="{ 'hidden 2md:block': selectedRoom }"
      class="relative w-full 2md:w-[350px] lg:w-[400px] overflow-y-auto bg-white shrink-0 border-x-[0.5px] border-x-gray-300"
    >
      <div class="sticky top-0 z-40 bg-white w-full py-6">
        <h1 class="text-2xl px-5 font-bold mb-3 text-gray-800">Messages</h1>

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
            @click.stop="clearSearchInput"
            v-if="keyword.length"
            class="mr-3 text-gray-400 hover:text-gray-700 flex items-center gap-x-1 text-lg i-mdi-close"
          ></span>
        </div>
      </div>

      <!-- rooms -->
      <div>
        <div class="px-2">
          <div
            v-if="roomsLoading && !rooms.length"
            class="flex items-center justify-center flex-col py-4"
          >
            <img class="w-9" src="~/assets/images/loader.svg" alt="" />
            <h1 class="text-gray-500">Loading chat rooms..</h1>
          </div>
          <div
            v-if="!roomsLoading && !rooms.length"
            class="text-center mx-auto max-w-xs"
          >
            <h1 class="text-gray-800 text-xl font-bold">No chat history yet</h1>
            <p class="text-gray-700">
              Send Message to your friends And Also You can share Photos
            </p>
            <button
              class="bg-blue-600 text-white py-2 px-4 rounded-full mt-2 2md:hidden"
            >
              Find new friends
            </button>
          </div>
          <ChatRoom
            @on-select="selectRoom"
            v-else
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
      :class="{
        'hidden 2md:block': !selectedRoom,
      }"
      class="relative bg-white w-full overflow-y-auto"
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
      <div v-else class="relative">
        <!-- header -->
        <ChatHeader @on-room-close="resetSelectedRoom" :recipient="recipient" />

        <div
          v-if="!chatsLoading && !hasRecentChats"
          class="text-center h-[80vh] overflow-y-auto m-auto max-w-xs flex items-center"
        >
          <div>
            <h1 class="text-gray-800 text-xl font-bold">
              No conversations yet
            </h1>
            <p class="text-gray-700">
              Send Message to your friends And Also You can share Photos
            </p>
          </div>
        </div>
        <!-- conversations -->
        <div class="px-7 pt-14 pb-20 h-full flex flex-col">
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
        class="sticky bottom-0 overflow-hidden min-h-[55px] max-h-[120px] bg-[#F0F2F5] flex items-center w-full z-50 px-4"
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
          @click="sendMessage"
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
import { ChatEntity, ChatRoomEntity, JoinChatRoomDto } from "types";

const { $socketIo } = useNuxtApp();

const { fetchChatRooms, fetchChats } = useChatApi();
const { emitSendMessageEvent, emitMessageSeenEvent } = useChatWs();

const { setCollapsed } = useSidebarStore();
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const router = useRouter();
const route = useRoute();

const keyword = ref("");
const message = ref("");

const rooms = ref<ChatRoomEntity[]>([]);
const selectedRoom = ref<ChatRoomEntity | null>(null);
const roomsLoading = ref(true);
const chatsLoading = ref(false);

const recipient = computed(() =>
  selectedRoom.value?.chatUsers?.length
    ? selectedRoom.value?.chatUsers[0].user!
    : {}
);
const hasRecentChats = computed(() => selectedRoom.value?.chats?.length);

const resetSelectedRoom = () => (selectedRoom.value = null);
const clearSearchInput = () => (keyword.value = "");
const selectRoom = (room?: ChatRoomEntity) => {
  if (room) {
    selectedRoom.value = room;
    router.push("/message");
  }
};
const callRoomsApi = async () => {
  roomsLoading.value = true;
  const res = await fetchChatRooms();
  roomsLoading.value = false;

  if (res.data) {
    rooms.value = res.data.value?.data ?? [];
  }
};

const joinChatRoom = async (data: JoinChatRoomDto) => {
  await $socketIo.emit(
    ChatSocketEvents.JoinChatRoom,
    {
      recipientId: data.recipientId,
    },
    (resp: any) => console.log(resp)
  );
};

const leaveChatRoom = async (chatRoomId: string) => {
  await $socketIo.emit(
    ChatSocketEvents.leaveChatRoom,
    { chatRoomId },
    (resp: any) => console.log(resp)
  );
};

const callChatsApi = async (roomId: string) => {
  chatsLoading.value = true;
  const res = await fetchChats(roomId);
  chatsLoading.value = false;

  if (res.data.value?.data?.length) {
    selectedRoom.value!.chats = res.data.value?.data;
    emitMessageSeenEvent({ chatRoomId: selectedRoom.value?.id! });
    selectedRoom.value!.unreadCount = 0;
  }
};

const listenForSocketEvents = () => {
  $socketIo.on(ChatSocketEvents.JoinedChatRoom, (ack: { roomId: string }) => {
    console.log("Joined room", ack.roomId);
  });

  $socketIo.on(ChatSocketEvents.leftChatRoom, (d) => {
    console.log("left room", d);
  });

  $socketIo.on(ChatSocketEvents.NewMessage, (data: ChatEntity) => {
    syncAddedMessage(data);
  });
};

watch(selectedRoom, async (newVal, oldVal) => {
  if (newVal) {
    await joinChatRoom({
      chatRoomId: newVal.id,
      recipientId: newVal?.chatUsers![0].userId!,
    });

    await callChatsApi(newVal?.id!);
  }

  if (oldVal) {
    await leaveChatRoom(oldVal?.id!);
  }
});

const sendMessage = async () => {
  if (message.value && recipient.value.id) {
    await emitSendMessageEvent({
      message: message.value,
      reciepenId: recipient.value.id,
      ...(selectedRoom.value?.id && { chatRoomId: selectedRoom.value.id }),
    });

    syncAddedMessage({
      message: message.value,
      sender: { ...user.value },
      senderId: user.value?.id,
      createdAt: new Date(),
      ...(selectedRoom.value?.id && { chatRoomId: selectedRoom.value.id }),
    });
    message.value = "";
  }
};

const syncAddedMessage = (data: ChatEntity) => {
  if (selectedRoom.value && selectedRoom.value.id === data.chatRoomId) {
    selectedRoom.value.chats?.push(data);
    updateRoomIdx(selectedRoom.value?.id!);
  }
};

const updateRoomIdx = (id: string) => {
  const idx = rooms.value.findIndex((r) => r.id === id);
  if (idx) {
    const room = rooms.value[idx];
    const restRooms = rooms.value.filter((r) => r.id !== id);

    rooms.value = [room, ...restRooms];
  }
};

onMounted(async () => {
  await nextTick();
  setCollapsed(true);

  const uid = route.query?.uid as string;

  await Promise.all([
    callRoomsApi(),
    listenForSocketEvents(),
    ...(uid ? [joinChatRoom({ recipientId: uid })] : []),
  ]);
});

onUnmounted(() => {
  setCollapsed(false);
});
</script>
