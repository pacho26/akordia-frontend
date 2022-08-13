import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { createApp } from 'vue/dist/vue.esm-bundler';

import App from './App.vue';
import router from './router';

// Unocss
import 'uno.css';

// FontAwesome
import { dom, library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// PrimeVue
import 'primeicons/primeicons.css';
import PrimeVue from 'primevue/config';
import 'primevue/resources/primevue.min.css';
import 'primevue/resources/themes/saga-green/theme.css';

// VuePrime components
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';

// Element Plus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

// VueQuill
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.bubble.css';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

// FloatingVue
import FloatingVue from 'floating-vue';
import 'floating-vue/dist/style.css';

// Iconify
import { Icon } from '@iconify/vue';

library.add(fas, far, fab);
dom.watch();

const app = createApp(App)
  .use(router)
  .use(PrimeVue)
  .use(ElementPlus)
  .use(FloatingVue);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);

// PrimeVue components
app.component('font-awesome-icon', FontAwesomeIcon);
app.component('InputText', InputText);
app.component('ButtonPrime', Button);

// VueQuill rich text editor
app.component('QuillEditor', QuillEditor);

// Iconify
app.component('Icon', Icon);

app.mount('#app');
