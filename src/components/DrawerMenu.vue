<script setup>
import {computed, onMounted, ref} from "vue";
import {useMediaQuery} from "@vueuse/core";
import {useAuthStore} from "@/stores/Auth.js";
import {useRouter} from "vue-router";

// const props = defineProps({
//   isDrawerOpen: Boolean,
// })
//
const emits = defineEmits(['updateDrawerState'])



const isLargeScreen = useMediaQuery("(min-width: 1024px)");
const isDrawerOpen = ref(true);
const authStore = useAuthStore();
const router = useRouter();
const login = authStore.user.login;
//
// const isLoggedIn = () => {
//   if(authStore.isLoggedIn()) isDrawerOpen.value = true;
// }

//
// if (isLargeScreen.value=== false) {
//   isDrawerOpen.value = false;
// }

// const toggleDrawer = () => {
//   isDrawerOpen.value = !isDrawerOpen.value;
//   console.log(isDrawerOpen.value);
//   emits('updateDrawerState', isDrawerOpen.value);
// }

const updateDrawerState = (value) => {
  isDrawerOpen.value = typeof value === "boolean" ? value : !isDrawerOpen.value;
  console.log("Drawer state updated:", isDrawerOpen.value);
  emits('updateDrawerState', isDrawerOpen.value);
}

const visible = computed(() => {
  return  isLargeScreen.value ? 'left' : 'full';
})

const logout = async () => {
  try {
    await authStore.logout();
    await router.push('/auth');
  } catch (error) {
    console.error('Logout error:', error);
  }
};

const lists = ref([
  {id: '1', nameList: 'Top100', link: 'http://localhost:5173/'},
  {id: '1', nameList: 'Detectives', link: 'http://localhost:5173/'},
]);

onMounted(() => {
  console.log('DrawerMenu')
})

</script>

<template>
  <div  class="transition-all duration-300">
    <prime-drawer
      v-model:visible="isDrawerOpen"
      :position="visible"
      :modal="false"
      :dismissable="false"
      @update:visible="updateDrawerState"
    >
<!--      {{isDrawerOpen}}-->
      <template #header>
        <div class="flex items-center gap-2">
          <a href="/profile">
            <prime-avatar label="L" class="mr-2" size="xlarge" shape="circle"/>
            <span>{{ login }}</span>
          </a>
        </div>
      </template>
      <div class="flex flex-col h-full">
        <div class="overflow-y-auto">
          <ul class="list-none p-0 m-0 overflow-hidden">
            <li>
              <a v-ripple class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100  duration-150 transition-colors p-ripple">
                <i class="pi pi-home mr-2"></i>
                <span class="font-medium">Home</span>
              </a>
            </li>
            <li>
              <a v-ripple class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100  duration-150 transition-colors p-ripple">
                <i class="pi pi-home mr-2"></i>
                <span class="font-medium">Library</span>
              </a>
            </li>
            <li>
              <a v-ripple class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100  duration-150 transition-colors p-ripple">
                <i class="pi pi-home mr-2"></i>
                <span class="font-medium">Friends</span>
              </a>
            </li>
          </ul>
          <hr>

          <span class="p-4 m-0 font-medium uppercase">My Lists</span>
          <ul class="list-none p-0 m-0">
            <li v-for="list of lists" :key="list.id">
              <a :href="list.link" v-ripple class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100  duration-150 transition-colors p-ripple no-underline">
                <i class="pi pi-home mr-2"></i>
                <span class="font-medium">{{ list.nameList }}</span>
              </a>
            </li>
          </ul>
          <prime-button class="w-full mt-2" icon="pi pi-plus" label="Create List" severity="help" raised />
        </div>
      </div>
      <template #footer>
        <div class="flex items-center gap-2">
          <prime-button label="Logout" icon="pi pi-sign-out" class="flex-auto" severity="danger" text @click="logout"/>
        </div>
      </template>
    </prime-drawer>
    <prime-button icon="pi pi-bars" @click="updateDrawerState" v-if="!isDrawerOpen" />
  </div>
</template>

<style scoped>

</style>
