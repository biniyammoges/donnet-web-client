import { defineStore } from "pinia";

export const useSidebarStore = defineStore('sidebar-store', () => {
     const collapsed = ref(false);
     const setCollapsed = (value: boolean) => collapsed.value = value

     return { collapsed, setCollapsed }
})