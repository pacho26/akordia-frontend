import type { AdvertCreate } from '@/models/advert.model';
import router from '@/router';
import { createAdvert } from '@/services/api/adverts';
import { useUserStore } from '@/stores/user';
import { ElForm, ElNotification } from 'element-plus';
import { useNotification } from '../useNotification';

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
      if (valid) {
        const payload = {
          ...advert,
          authorId: userId,
          authorUsername: username,
        };
        console.log('payload :>> ', payload);
        await createAdvert(payload);
        ElNotification.closeAll();
        showNotification({
          title: 'Advert created',
          message: 'Advertisement created successfully',
          type: 'success',
        });
        router.push({ name: 'home' });
        return;
      }
      showNotification({
        title: 'Invalid advert form',
        message: 'Please check advert details and try again',
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
