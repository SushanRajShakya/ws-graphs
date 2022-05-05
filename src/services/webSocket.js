import notificationService from './notification';
import { socketNotification } from '../constants/notifications';

const initiateSocket = (url) => {
  const socket = new WebSocket(url);

  socket.onopen = (event) => {
    notificationService.success(socketNotification.connected);
  };

  return socket;
};

const webSocketService = {
  initiateSocket,
};

export default webSocketService;
