import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import socketPlugin from './plugins/socketPlugin';

const app = createApp(App);
app.use(socketPlugin);
app.mount('#app');
