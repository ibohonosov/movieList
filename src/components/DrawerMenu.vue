<script setup>
import {computed, ref} from "vue";
import {useMediaQuery} from "@vueuse/core";
import {useAuthStore} from "@/stores/Auth.js";
import {useRouter} from "vue-router";

const isLargeScreen = useMediaQuery("(min-width: 768px)");
const isDrawerOpen = ref(true);
const authStore = useAuthStore();
const router = useRouter();
const login = authStore.user.login;

if (isLargeScreen.value=== false) {
  isDrawerOpen.value = false;
}

const visible = computed(() => {
  return isLargeScreen.value ? 'left' : 'full';
})

const logout = async () => {
  try {
    await authStore.logout();
    await router.push('/auth');
  } catch (error) {
    console.error('Logout error:', error);
  }
};

</script>

<template>
  <div class="flex items-center justify-center">
    <prime-drawer v-model:visible="isDrawerOpen" :position="visible" :modal="false" :dismissable="false" >
      <template #header>
        <div class="flex items-center gap-2">
          <a href="/profile">
            <prime-avatar label="L" class="mr-2" size="xlarge" shape="circle"/>
            <span>{{ login }}</span>
          </a>
        </div>
      </template>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      <template #footer>
        <div class="flex items-center gap-2">
          <prime-button label="Logout" icon="pi pi-sign-out" class="flex-auto" severity="danger" text @click="logout"/>
        </div>
      </template>
    </prime-drawer>
    <prime-button icon="pi pi-bars" @click="isDrawerOpen = !isDrawerOpen" v-if="!isDrawerOpen" />
  </div>
</template>

<style scoped>

</style>
