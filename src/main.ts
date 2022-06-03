import { createApp } from 'vue';
import { createPinia } from 'pinia';

import 'uno.css';

import App from './App.vue';
import router from './router';

import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

library.add(fas, far, fab);
dom.watch();

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(createPinia());
app.use(router);

app.mount('#app');
