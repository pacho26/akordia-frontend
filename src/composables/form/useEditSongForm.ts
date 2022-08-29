import type { Song, SongEdit } from '@/models/song.model';
import { ElForm, ElNotification } from 'element-plus';
import { useSongUpdate } from '../api/songs/index';
import { useNotification } from '../useNotification';
import messages from '@/i18n/translations';

type Language = 'en' | 'hr';

export const useEditSongForm = () => {
  const { updateSong, isSuccess } = useSongUpdate();

  const songModel: SongEdit = reactive({
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

  const router = useRouter();
  const { showMutateSongError } = useNotification();

  const fillSongModel = (song: Song) => {
    songModel.title = song.title;
    songModel.alternativeTitle = song.alternativeTitle;
    songModel.artist = song.artist;
    songModel.youtubeId = song.youtubeId;
    songModel.content = song.content;
  };

  const onSubmit = async (
    id: string,
    song: SongEdit,
    formEl: InstanceType<typeof ElForm> | null,
    routeRedirect: string
  ) => {
    if (!formEl) return;
    formEl.validate(async (valid) => {
      if (valid) {
        const editedSong = await updateSong(id, song);
        if (isSuccess && editedSong) {
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
    fillSongModel,
  };
};
