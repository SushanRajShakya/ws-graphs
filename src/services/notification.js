import { toast } from 'react-toastify';

const success = (data) => {
  const { message, toastId } = data;

  console.log(data);
  toast.dismiss(toastId);
  toast.success(message, { toastId });
};

const error = (data) => {
  const { message, toastId } = data;

  toast.dismiss(toastId);
  toast.error(message, { toastId });
};

const dismiss = (toastId) => {
  toast.dismiss(toastId);
};

const notificationService = {
  success,
  error,
  dismiss,
};

export default notificationService;
