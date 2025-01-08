import { ref } from 'vue'
import { defineStore } from 'pinia'
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const auth = getAuth();
  const saveUserData = (userInfo) => {
    user.value = {
      uid: userInfo.uid,
      email: userInfo.email,
      login: userInfo.displayName
    }
  }
  const clearUserData = () => {
    user.value = {};
  }
  const signUp = async (email, password, login) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth ,email, password);
      console.log(userCredential);
      const userInfo = userCredential.user
      await updateProfile(userInfo, {displayName: login});

      saveUserData(userInfo);

    } catch (error) {
      console.log(error);
    }
  }
  const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth ,email, password);
      const userInfo = userCredential.user
      saveUserData(userInfo);
      console.log(auth)
    } catch (error) {
      console.log(error.code);
      throw error;
    }
  }
  const authListener = () => {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          saveUserData(user);
        }
        else {
          clearUserData();
        }
        resolve();
      })
    })
  }
  const isLoggedIn = () => !!user.value;
  const logout = async () => {
    await signOut(getAuth())
    clearUserData()
  }
  return { user, signUp, signIn, logout, authListener, isLoggedIn };
})
