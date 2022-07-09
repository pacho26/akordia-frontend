import { useSongUpdate } from '../api/songs/index';
import { useNotification } from '../useNotification';
import { ElNotification, ElForm } from 'element-plus';
import type { Song, SongEdit } from '@/models/song.model';

export const useEditSongForm = () => {
  const { updateSong, isSuccess } = useSongUpdate();

  const songModel: SongEdit = reactive({
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
    formEl.validate(async (valid: any) => {
      if (valid) {
        const editedSong = await updateSong(id, song);
        if (isSuccess && editedSong) {
          ElNotification.closeAll();
          router.replace(routeRedirect);
          return;
        }
      }
      showMutateSongError(null);
    });
  };

  return {
    songModel,
    onSubmit,
    rules,
    fillSongModel,
  };
};
