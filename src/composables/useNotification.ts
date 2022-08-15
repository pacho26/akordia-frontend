import { ElNotification } from 'element-plus';
import messages from '@/i18n/translations';

interface NotificationOptions {
  title: string;
  message: string;
  type: NotificationType;
}

type Language = 'en' | 'hr';

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

  const showRegisterError = (lang: Language) =>
    showNotification({
      title: messages[lang].notifications.registrationErrorTitle,
      message: messages[lang].notifications.registrationErrorText,
      type: 'error',
    });

  const showLoginError = (lang: Language) =>
    showNotification({
      title: messages[lang].notifications.loginErrorTitle,
      message: messages[lang].notifications.loginErrorText,
      type: 'error',
    });

  const showMutateSongError = (lang: Language) =>
    showNotification({
      title: messages[lang].notifications.songFormErrorTitle,
      message: messages[lang].notifications.songFormErrorText,
      type: 'error',
    });

  const showNotLoggedInNotication = (lang: Language) => {
    showNotification({
      title: messages[lang].notifications.notLoggedInTitle,
      message: messages[lang].notifications.notLoggedInText,
      type: 'warning',
    });
  };

  const showSearchTermNotication = (lang: Language) => {
    showNotification({
      title: messages[lang].notifications.searchTermTooShortTitle,
      message: messages[lang].notifications.searchTermTooShortText,
      type: 'warning',
    });
  };

  const showApprovedRequestNotication = (lang: Language) => {
    showNotification({
      title: messages[lang].notifications.requestApprovedTitle,
      message: messages[lang].notifications.requestApprovedText,
      type: 'success',
    });
  };

  const showRejectedRequestNotication = (lang: Language) => {
    showNotification({
      title: messages[lang].notifications.requestRejectedTitle,
      message: messages[lang].notifications.requestRejectedText,
      type: 'error',
    });
  };

  return {
    showNotification,
    showLoginError,
    showRegisterError,
    showMutateSongError,
    showNotLoggedInNotication,
    showSearchTermNotication,
    showApprovedRequestNotication,
    showRejectedRequestNotication,
  };
};
