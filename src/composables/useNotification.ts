// import type { UserRole } from 'models/user.model';

import { ElNotification } from 'element-plus';

interface NotificationOptions {
  title: string;
  message: string;
  type: NotificationType;
}

type NotificationType = 'error' | 'warning' | 'info' | 'success';

export const useNotification = () => {
  const showNotification = ({ title, message, type }: NotificationOptions) => {
    ElNotification({
      title,
      message,
      type,
      duration: 3000,
    });
  };

  const showRegisterError = (error: string | null) =>
    showNotification({
      title: 'Invalid registration',
      message: error || 'Please check your details and try again',
      type: 'error',
    });

  const showLoginError = () =>
    showNotification({
      title: 'Invalid login',
      message: 'Please check your details and try again',
      type: 'error',
    });

  const showMutateSongError = (error: string | null) =>
    showNotification({
      title: 'Invalid song form',
      message: error || 'Please check song details and try again',
      type: 'error',
    });

  const showDeletedUserNotication = () => {
    showNotification({
      title: 'User deleted',
      message: 'User and its songs have been deleted successfully',
      type: 'success',
    });
  };

  return {
    showNotification,
    showLoginError,
    showRegisterError,
    showMutateSongError,
    showDeletedUserNotication,
  };
};
