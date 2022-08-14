<script lang="ts" setup>
import { useSong } from '@/composables/api/songs';
import router from '@/router';
import { getUser } from '@/services/api/user';
import { useSongsStore } from '@/stores/songs';
import { useUserStore } from '@/stores/user';
import { useRoute } from 'vue-router';

const route = useRoute();

const { fetchSong, song } = useSong();

const { user } = useUserStore();
const { setRecentSong } = useSongsStore();

const songId = computed(() => route.params.id as string);

const contentComponentKey = ref(0);

const authorUsername = ref('');

const hasFlatChords = ref(false);

watchEffect(async () => {
  if (songId.value) {
    await fetchSong(songId.value);
    if (song.value) {
      const userRes = await getUser(song.value.author);
      authorUsername.value = userRes.username || '';

      contentComponentKey.value++;
      setRecentSong(song.value);

      addMarginTopToChords();
      hasFlatChords.value = false;
    }
  }
});

const addMarginTopToChords = () => {
  const editorEl = document.querySelector('.editor');
  editorEl?.querySelectorAll('strong').forEach((elem, idx) => {
    if (idx > 0 && elem.parentElement) {
      elem.parentElement.style.marginTop = '0.5rem';
    }
  });
};

const isAuthor = computed(() => user?._id === song.value?.author);

const youtubeLink = computed(() => {
  return song.value?.youtubeId
    ? `https://www.youtube.com/embed/${song.value?.youtubeId}`
    : '';
});

const editRoute = computed(() => {
  return `${route.path}/edit`;
});

const CHORDS_KEYS = [
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
  'A',
  'A#',
  'H',
];

const transpose = (mode: string) => {
  const editorEl = document.querySelector('.editor');

  editorEl?.querySelectorAll('strong').forEach((elem) => {
    if (elem.textContent) {
      let newString = '';

      if (elem.textContent.includes('B')) {
        elem.textContent = elem.textContent.replace('B', 'A#');
        hasFlatChords.value = true;
      }

      for (let [i, char] of elem.textContent.split('').entries()) {
        if (char === '#' || char === 'b') {
          continue;
        }

        if (
          CHORDS_KEYS.includes(char) &&
          (elem.textContent[i + 1] === '#' || elem.textContent[i + 1] === 'b')
        ) {
          char += elem.textContent[i + 1];
        }

        const index = CHORDS_KEYS.indexOf(char);

        if (index >= 0) {
          char =
            CHORDS_KEYS[
              (mode === 'up' ? index + 1 : CHORDS_KEYS.length + index - 1) %
                CHORDS_KEYS.length
            ];
        }
        newString += char;
        if (hasFlatChords.value) {
          newString = newString.replace('A#', 'Bb');
        }
      }
      elem.textContent = newString;
    }
  });
};

const replaceCroatianLetters = (str: string) =>
  str
    .replace(/[ČčĆć]/g, 'c')
    .replace(/[Šš]/g, 's')
    .replace(/[Đđ]/g, 'dj')
    .replace(/[Žž]/g, 'z');

const artistLinkSegment = computed(() => {
  return song.value?.artist
    ? replaceCroatianLetters(song.value?.artist).replace(' ', '_').toLowerCase()
    : '';
});

const goToAuthorProfile = () => {
  router.push(`/profile/${song.value?.author}`);
  contentComponentKey.value++;
};
</script>

<template>
  <div
    v-if="song"
    flex="~ col gap-4 sm:row"
    justify="between"
    p="b-4"
    border="b-1 gray-300"
  >
    <div>
      <Link :to="`/artist/${artistLinkSegment}`">
        <Heading
          :label="song.artist"
          as="h2"
          :level="3"
          text="primary-600 hover:primary-400"
          font="300"
          transition="default"
          class="uppercase"
        />
      </Link>
      <Heading :label="song?.title" as="h1" :level="1" font="600" />
      <Heading
        v-if="song?.alternativeTitle"
        :label="'(' + song?.alternativeTitle + ')'"
        as="h2"
        :level="3"
        font="300"
        m="t-1"
      />
    </div>

    <div flex="~ row gap-4 sm:col" justify="between" items="end">
      <div flex="~">
        <Button
          variant="secondary"
          @click="transpose('down')"
          v-tooltip="$t('requests.transposeDown')"
        >
          <i class="fa-solid fa-chevron-down" />
        </Button>

        <Button
          variant="secondary"
          @click="transpose('up')"
          v-tooltip="$t('requests.transposeUp')"
          transition="default"
        >
          <i class="fa-solid fa-chevron-up" />
        </Button>
      </div>

      <Link v-if="isAuthor" :to="editRoute">
        <el-button
          type="info"
          v-tooltip.left="'Edit song'"
          transition="!default"
        >
          <i class="fa-solid fa-pen-to-square" />
        </el-button>
      </Link>
    </div>
  </div>

  <div flex="~ gap-8 wrap" justify="sm:between" m="t-4 sm:t-6">
    <div flex="~ col gap-4">
      <RichTextEditor
        v-if="song?.content"
        :key="contentComponentKey"
        read-only
        :content="song.content"
        class="editor"
      />
      <p text="gray-400">
        {{ $t('chords.by') }}
        <span
          text="primary-400 hover:primary-500"
          font="600"
          cursor="pointer"
          transition="default"
          @click="goToAuthorProfile"
          >{{ authorUsername }}</span
        >
      </p>
    </div>
    <div v-if="youtubeLink" w="full sm:80" class="md:translate-y-1">
      <iframe :src="youtubeLink" w="full" border="none rounded" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
iframe {
  aspect-ratio: 16/9 !important;
}
</style>
