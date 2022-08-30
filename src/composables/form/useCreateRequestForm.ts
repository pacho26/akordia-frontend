import type { RequestCreate } from '@/models/request.model';
import { ElForm, ElNotification } from 'element-plus';
import { useRequestCreate } from '../api/requests';
import { useNotification } from '../useNotification';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import messages from '@/i18n/translations';

type Language = 'en' | 'hr' | 'de';

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

  const lang = localStorage.getItem('lang') as Language;

  const rules = reactive({
    title: [
      {
        required: true,
        message: messages[lang].form.titleError,
        trigger: 'blur',
      },
      {
        max: 40,
        message: messages[lang].form.titleError2,
        trigger: 'blur',
      },
    ],
    alternativeTitle: [
      {
        max: 40,
        message: messages[lang].form.alternativeTitleError,
        trigger: 'blur',
      },
    ],
    artist: [
      {
        required: true,
        message: messages[lang].form.artistError,
        trigger: 'blur',
      },
      {
        max: 40,
        message: messages[lang].form.artistError2,
        trigger: 'blur',
      },
    ],
    youtubeId: [
      {
        max: 15,
        message: messages[lang].form.youtubeIdError,
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
        max: 4000,
        message: messages[lang].form.contentError2,
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
