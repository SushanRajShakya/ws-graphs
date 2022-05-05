export const socketNotification = {
  connected: {
    message: 'Successfully connected to socket',
    toastId: 'SOCKET_OPENED',
  },
  disconnected: {
    message: 'Socket Closed',
    toastId: 'SOCKET_CLOSED',
  },
  error: {
    message: 'Error connecting with socket',
    toastId: 'SOCKET_ERROR',
  },
};
