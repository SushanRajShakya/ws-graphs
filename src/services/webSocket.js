import notificationService from './notification';
import { socketNotification } from '../constants/notifications';

/**
 * Initiates socket and displays toast message for success.
 *
 * @param {string} url
 * @returns {object} <WebSocket>
 */
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
