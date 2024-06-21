// src/plugins/socketPlugin.ts
import { App } from 'vue';
import socketService from '../services/socketService';

export default {
  install(app: App) {
    app.config.globalProperties.$socketService = socketService;
  }
};