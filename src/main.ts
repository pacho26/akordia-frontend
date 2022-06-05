import { createApp } from 'vue';
import { createPinia } from 'pinia';

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

library.add(fas, far, fab);
dom.watch();

const app = createApp(App).use(createPinia()).use(router).use(PrimeVue);

app.component('font-awesome-icon', FontAwesomeIcon);
app.component('InputText', InputText);
app.component('Button', Button);

app.mount('#app');
