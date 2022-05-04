import { toast } from 'react-toastify';

import {
  CONNECTION_ERROR,
  SOCKET_CONNECTED,
  SOCKET_DISCONNECTED,
} from '../constants/message';

const initiateSocket = (url) => {
  const socket = new WebSocket(url);

  socket.onopen = () => {
    toast.success(SOCKET_CONNECTED);
  };

  socket.onclose = (event) => {
    event.wasClean
      ? toast.success(SOCKET_DISCONNECTED)
      : toast.error(CONNECTION_ERROR);
  };

  return socket;
};

const webSocketService = {
  initiateSocket,
};

export default webSocketService;
