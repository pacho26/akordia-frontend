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

  const rules = reactive({
    title: [
      {
        required: true,
        message: 'Please enter the title',
        trigger: 'blur',
      },
      {
        max: 50,
        message: 'Title is too long',
        trigger: 'blur',
      },
    ],
    content: [
      {
        required: true,
        message: 'Please enter the content',
        trigger: 'blur',
      },
      {
        max: 5000,
        message: 'Content is too long',
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
