<script setup>
import { RouterView } from 'vue-router'
import {onMounted, ref} from "vue";
import {useAuthStore} from "@/stores/Auth.js";

const authStore = useAuthStore();
const isLoading = ref(true)

onMounted(async () => {
  await authStore.authListener();
  isLoading.value = false;
})
</script>

<template>
  <p v-if="isLoading">Loading...</p>
  <div v-else class="container">
    <RouterView />
  </div>

</template>

<style scoped>

</style>
