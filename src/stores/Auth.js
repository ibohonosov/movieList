import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {createUserWithEmailAndPassword, getAuth, updateProfile, signInWithEmailAndPassword} from "firebase/auth";

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const auth = getAuth();
  const signUp = async (email, password, login) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth ,email, password);
      console.log(userCredential);
      const userInfo = userCredential.user
      await updateProfile(userInfo, {displayName: login});

      user.value = {
        uid: userInfo.uid,
        email: userInfo.email,
        login: userInfo.displayName
      };
      console.log(user.value);
    } catch (error) {
      console.log(error);
    }
  }
  const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth ,email, password);
      console.log(userCredential);
    } catch (error) {
      // console.log(error.code);
      throw error;
    }
  }
  return { user, signUp, signIn };
})
