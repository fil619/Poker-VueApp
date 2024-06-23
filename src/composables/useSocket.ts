// src/composables/useSocket.ts
import { getCurrentInstance, onMounted, onUnmounted } from 'vue';
import { Socket } from 'socket.io-client';

export function useSocket(event: string, callback: (data: any) => void) {
  const instance = getCurrentInstance();
  if (!instance) {
    throw new Error('useSocket must be called within a setup function.');
  }
  const socketService = instance.appContext.config.globalProperties.$socketService;
  let socket: Socket | null = null;

  onMounted(() => {
    socket = socketService.connect();
    socket?.on(event, callback);
  });

  onUnmounted(() => {
    if (socket) {
      socket.off(event, callback);
    }
  });

  const emitEvent = (eventName: string, payload: any, payload2 : any = undefined) => {
    if (socket) {
      socket.emit(eventName, payload, payload2);
    }
  };

  return { emitEvent };

}
