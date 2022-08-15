import type { RequestCreate } from '@/models/request.model';
import { ElForm, ElNotification } from 'element-plus';
import { useRequestCreate } from '../api/requests';
import { useNotification } from '../useNotification';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import messages from '@/i18n/translations';

type Language = 'en' | 'hr';

export const useCreateRequestForm = () => {
  const { user } = storeToRefs(useUserStore());
  const { createRequest, isSuccess } = useRequestCreate();
  const router = useRouter();

  const requestModel: RequestCreate = reactive({
    title: '',
    alternativeTitle: '',
    artist: '',
    youtubeId: '',
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
        max: 40,
        message: 'Title is too long',
        trigger: 'blur',
      },
    ],
    alternativeTitle: [
      {
        max: 40,
        message: 'Alternative title is too long',
        trigger: 'blur',
      },
    ],
    artist: [
      {
        required: true,
        message: 'Please enter the artist',
        trigger: 'blur',
      },
      {
        max: 40,
        message: 'Artist name is too long',
        trigger: 'blur',
      },
    ],
    youtubeId: [
      {
        max: 15,
        message: 'Youtube ID is too long',
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
        max: 4000,
        message: 'Content is too long',
        trigger: 'blur',
      },
    ],
  });

  const { showMutateSongError, showNotification } = useNotification();

  const onSubmit = async (
    request: RequestCreate,
    formEl: InstanceType<typeof ElForm> | null,
    routeRedirect: string
  ) => {
    if (!formEl) return;
    formEl.validate(async (valid) => {
      const lang = localStorage.getItem('lang') as Language;

      if (valid) {
        const payload = {
          ...request,
          author: user.value?._id,
          voters: [],
          rating: 0,
        };
        const newRequest = await createRequest(payload);
        if (isSuccess && newRequest) {
          ElNotification.closeAll();
          showNotification({
            title: messages[lang].notifications.requestCreatedTitle,
            message: messages[lang].notifications.requestCreatedText,
            type: 'success',
          });
          router.replace(routeRedirect);
          return;
        }
      }
      showMutateSongError(lang);
    });
  };

  return {
    requestModel,
    onSubmit,
    rules,
  };
};
