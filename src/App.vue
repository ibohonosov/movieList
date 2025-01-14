<script setup>
import { RouterView, useRoute } from 'vue-router'
import {onMounted, ref, computed} from "vue";
import {useAuthStore} from "@/stores/Auth.js";
import DrawerMenu from "@/components/DrawerMenu.vue";

const authStore = useAuthStore();
const route = useRoute();
const isLoading = ref(true)
const isDrawerOpen = ref(true);

const handleDrawerState = (state) => {
  isDrawerOpen.value = state;
}
const isAuthPage = computed(() => {
  return route.path === "/auth";
})

onMounted(async () => {
  console.log('App.vue')
  isLoading.value = true;
  await authStore.authListener();
  isLoading.value = false;
  console.log(authStore.authListener());
})
// :class="{'w-3/12': isDrawerOpen}"
</script>

<template>
  <div v-if="isLoading">
    <p >Loading...</p>
  </div>
  <div v-else class="flex">
    <div
      :class="[isDrawerOpen && !isAuthPage ? 'animationMargin--open' : 'animationMargin']"
      class="flex-grow flex flex-col overflow-auto transition-all duration-900">
      {{authStore.user}}
      <RouterView />
    </div>
    <div v-if="!isLoading && authStore.user && !isAuthPage">
<!--      Моргает при загрузке страцицы-->
      <DrawerMenu

        :isDrawerOpen="isDrawerOpen"
        class=""
        @updateDrawerState="handleDrawerState"
      />
    </div>
  </div>
</template>

<style >
.p-drawer {
  width: 20%;
}
.animationMargin {
  margin-left: 0;
  transition: margin-left 0.3s ease-in-out;
}
.animationMargin--open {
  margin-left: 20%;
  transition: margin-left 0.3s ease-in-out;
}

</style>
