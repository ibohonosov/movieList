<script setup>
import {computed, ref} from "vue";
import {useRouter} from "vue-router";
import {useAuthStore} from "@/stores/Auth.js";
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const authStore = useAuthStore();
const email = ref('');
const password = ref('');
const login = ref('')
const router = useRouter();
const isLogin = ref(true);

const signText = computed(() => {
  return isLogin.value ? "Sign In" : "Sign Up";
})
const signDesc = computed(() => {
  return isLogin.value ? "Don't have an account?" : "Already have an account?"
})
const linkText = computed(() => {
  return isLogin.value ? "Sign Up" : "Sign In"
})
const toggleAuth = () => {
  isLogin.value = !isLogin.value;
}

const sign = async () => {
  try {
    if (isLogin.value) {
      await authStore.signIn(email.value, password.value);
    }
    else {
      await authStore.signUp(email.value, password.value, login.value);
    }
    await router.push('/');
  } catch (error) {
    console.log(error)
    if (error) {
      toast.add({severity: 'error', summary: 'Error', detail: error.code, life: 3000})
    }
  }
}
</script>

<template>
<div class="flex flex-col justify-center items-center w-full">
  <prime-toast />
  <h1 class="auth__title">{{ signText }}</h1>
  <span>{{ signDesc }}</span>
  <a class="font-medium no-underline ml-2 text-blue-500 cursor-pointer" @click="toggleAuth"> {{ linkText }}</a>
  <form @submit.prevent="sign" class="flex justify-center flex-col gap-4">
    <div class="flex flex-col gap-1 ">
      <prime-float-label variant="on">
        <prime-input v-model="email" id="email" class="w-full"/>
        <label for="email">Email</label>
      </prime-float-label>
    </div>
    <div class="flex flex-col gap-1 " v-if="!isLogin">
      <prime-float-label variant="on">
        <prime-input v-model="login" id="login" class="w-full"/>
        <label for="login">Login</label>
      </prime-float-label>
    </div>
    <div class="flex flex-col gap-1">
      <prime-float-label variant="on">
        <prime-password v-model="password" id="password" toggleMask />
        <label for="password">Password</label>
      </prime-float-label>
    </div>
    <prime-button :label="signText" severity="info" raised type="submit" />
  </form>
</div>
</template>

<style scoped>

</style>
