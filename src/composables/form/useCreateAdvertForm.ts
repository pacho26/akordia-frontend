import type { AdvertCreate } from '@/models/advert.model';
import router from '@/router';
import { createAdvert } from '@/services/api/adverts';
import { useUserStore } from '@/stores/user';
import { ElForm, ElNotification } from 'element-plus';
import { useNotification } from '../useNotification';
import messages from '@/i18n/translations';

export const useCreateAdvertForm = () => {
  const advertModel: AdvertCreate = reactive({
    title: '',
    content: '',
  });

  type Language = 'en' | 'hr';
  const lang = localStorage.getItem('lang') as Language;

  const rules = reactive({
    title: [
      {
        required: true,
        message: messages[lang].form.titleError,
        trigger: 'blur',
      },
      {
        max: 50,
        message: messages[lang].form.titleError2,
        trigger: 'blur',
      },
    ],
    content: [
      {
        required: true,
        message: messages[lang].form.contentError,
        trigger: 'blur',
      },
      {
        max: 5000,
        message: messages[lang].form.contentError2,
        trigger: 'blur',
      },
    ],
  });

  const { showNotification } = useNotification();
  const { userId, username } = useUserStore();

  const onSubmit = async (
    advert: AdvertCreate,
    formEl: InstanceType<typeof ElForm> | null
  ) => {
    if (!formEl) return;
    formEl.validate(async (valid) => {
      type Language = 'en' | 'hr';
      const lang = localStorage.getItem('lang') as Language;

      if (valid) {
        const payload = {
          ...advert,
          authorId: userId,
          authorUsername: username,
        };
        await createAdvert(payload);
        ElNotification.closeAll();
        showNotification({
          title: messages[lang].notifications.advertCreatedTitle,
          message: messages[lang].notifications.advertCreatedText,
          type: 'success',
        });
        router.push({ name: 'home' });
        return;
      }
      showNotification({
        title: messages[lang].notifications.advertInvalidFormTitle,
        message: messages[lang].notifications.advertInvalidFormText,
        type: 'error',
      });
    });
  };

  return {
    advertModel,
    onSubmit,
    rules,
  };
};
