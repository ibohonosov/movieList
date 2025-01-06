import { ref } from 'vue'
import { defineStore } from 'pinia'
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const auth = getAuth();
  const saveUserData = (userInfo) => {
    return user.value = {
      uid: userInfo.uid,
      email: userInfo.email,
      login: userInfo.displayName
    }
  }
  const signUp = async (email, password, login) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth ,email, password);
      console.log(userCredential);
      const userInfo = userCredential.user
      await updateProfile(userInfo, {displayName: login});

      saveUserData(userInfo);
      // user.value = {
      //   uid: userInfo.uid,
      //   email: userInfo.email,
      //   login: userInfo.displayName
      // };
      // console.log(user.value);
    } catch (error) {
      console.log(error);
    }
  }
  const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth ,email, password);
      const userInfo = userCredential.user
      saveUserData(userInfo);
    } catch (error) {
      console.log(error.code);
      throw error;
    }
  }
  const logout = async () => {
    await signOut(getAuth())
    user.value = null;
  }
  return { user, signUp, signIn, logout };
})
