import './assets/main.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { initializeApp } from "firebase/app";
import { definePreset } from '@primevue/themes';

import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
import Password from 'primevue/password';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import Drawer from 'primevue/drawer';
import Avatar from 'primevue/avatar';

import App from './App.vue'
import router from './router'

const firebaseConfig = {
  apiKey: "AIzaSyBEY9yzC2TbFi4wo33ndgXoAV1CvMMzm54",
  authDomain: "movieslibrary-aa04f.firebaseapp.com",
  projectId: "movieslibrary-aa04f",
  storageBucket: "movieslibrary-aa04f.firebasestorage.app",
  messagingSenderId: "667441603890",
  appId: "1:667441603890:web:48e07e6a35eeb5f39a632b"
};

initializeApp(firebaseConfig);


const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{indigo.50}',
      100: '{indigo.100}',
      200: '{indigo.200}',
      300: '{indigo.300}',
      400: '{indigo.400}',
      500: '{indigo.500}',
      600: '{indigo.600}',
      700: '{indigo.700}',
      800: '{indigo.800}',
      900: '{indigo.900}',
      950: '{indigo.950}'
    }
  }
});

const app = createApp(App)

app.use(createPinia())
app.use(PrimeVue, {
  theme: {
    preset: MyPreset,
    options: {
      cssLayer: {
        name: 'primevue',
        order: 'tailwind-base, primevue, tailwind-utilities'
      },
      darkModeSelector: '.my-app-dark',
    }
  }
});
app.use(router)
app.use(ToastService);
app.component('prime-input', InputText);
app.component('prime-float-label', FloatLabel);
app.component('prime-password', Password);
app.component('prime-button', Button);
app.component('prime-toast', Toast);
app.component('prime-drawer', Drawer);
app.component('prime-avatar', Avatar);

app.mount('#app')
