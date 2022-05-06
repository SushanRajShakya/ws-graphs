import { toast } from 'react-toastify';

/**
 * @typedef NotificationData
 * @type {object}
 * @property {string} message
 * @property {string} toastId
 */

/**
 * Displays success message using react toastify.
 *
 * @param {NotificationData} data
 */
const success = (data) => {
  const { message, toastId } = data;

  toast.dismiss(toastId);
  toast.success(message, { toastId });
};

/**
 * Displays error message using react toastify.
 *
 * @param {NotificationData} data
 */
const error = (data) => {
  const { message, toastId } = data;

  toast.dismiss(toastId);
  toast.error(message, { toastId });
};

/**
 * Removes toast message from the frontend.
 *
 * @param {string} toastId
 */
const dismiss = (toastId) => {
  toast.dismiss(toastId);
};

const notificationService = {
  success,
  error,
  dismiss,
};

export default notificationService;
