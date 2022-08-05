import { createApp } from 'vue/dist/vue.esm-bundler';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import App from './App.vue';
import router from './router';

// Unocss
import 'uno.css';

// FontAwesome
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

// PrimeVue
import 'primevue/resources/themes/saga-green/theme.css';
import PrimeVue from 'primevue/config';
import 'primeicons/primeicons.css';
import 'primevue/resources/primevue.min.css';

// VuePrime components
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

// Element Plus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

// VueQuill
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import '@vueup/vue-quill/dist/vue-quill.bubble.css';

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
