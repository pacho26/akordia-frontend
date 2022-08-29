import messages from '@/i18n/translations';
import type { SongCreate } from '@/models/song.model';
import { useUserStore } from '@/stores/user';
import { ElForm, ElNotification } from 'element-plus';
import { storeToRefs } from 'pinia';
import { useSongCreate } from '../api/songs';
import { useNotification } from '../useNotification';

export const useCreateSongForm = () => {
  const { user } = storeToRefs(useUserStore());
  const { createSong, isSuccess } = useSongCreate();
  const router = useRouter();

  type Language = 'en' | 'hr';

  const songModel: SongCreate = reactive({
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

  const { showMutateSongError } = useNotification();

  const onSubmit = async (
    song: SongCreate,
    formEl: InstanceType<typeof ElForm> | null,
    routeRedirect: string
  ) => {
    if (!formEl) return;
    formEl.validate(async (valid) => {
      if (valid) {
        const payload = { ...song, author: user.value?._id };
        const newSong = await createSong(payload);
        if (isSuccess && newSong) {
          ElNotification.closeAll();
          router.replace(routeRedirect);
          return;
        }
      }
      type Language = 'en' | 'hr';
      const lang = localStorage.getItem('lang') as Language;
      showMutateSongError(lang);
    });
  };

  return {
    songModel,
    onSubmit,
    rules,
  };
};
