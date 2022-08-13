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

  const showNotLoggedInNotication = () => {
    showNotification({
      title: 'Not logged in',
      message: 'You must be logged in to access this page',
      type: 'warning',
    });
  };

  const showSearchTermNotication = () => {
    showNotification({
      title: 'Search term is too short',
      message: 'Search term must be at least 3 characters long',
      type: 'warning',
    });
  };

  const showApprovedRequestNotication = () => {
    showNotification({
      title: 'Request rejected',
      message: 'Song request is added to the global songbook',
      type: 'success',
    });
  };

  const showRejectedRequestNotication = () => {
    showNotification({
      title: 'Request rejected',
      message: 'Song request has been rejected permanently',
      type: 'error',
    });
  };

  return {
    showNotification,
    showLoginError,
    showRegisterError,
    showMutateSongError,
    showDeletedUserNotication,
    showNotLoggedInNotication,
    showSearchTermNotication,
    showApprovedRequestNotication,
    showRejectedRequestNotication,
  };
};
