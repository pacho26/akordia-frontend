<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { useSong } from '@/composables/api/songs';

const route = useRoute();

const { fetchSong, song } = useSong();

const songId = computed(() => route.params.id as string);

watchEffect(async () => {
  if (songId.value) {
    await fetchSong(songId.value);
    addMarginTopToChordsParagraphs();
  }
});

const addMarginTopToChordsParagraphs = () => {
  const editorEl = document.querySelector('.editor');
  editorEl?.querySelectorAll('strong').forEach((elem, idx) => {
    if (idx > 0 && elem.parentElement) {
      elem.parentElement.style.marginTop = '0.5rem';
    }
  });
};

// TODO: Replace with real values
const isAuthor = true;

const youtubeLink = computed(() => {
  return song.value?.youtubeId
    ? `https://www.youtube.com/embed/${song.value?.youtubeId}`
    : '';
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

const editRoute = computed(() => {
  return `${route.path}/edit`;
});

const transpose = (mode: string) => {
  const editorEl = document.querySelector('.editor');

  editorEl?.querySelectorAll('strong').forEach((elem) => {
    if (elem.textContent) {
      let newString = '';

      for (let [i, char] of elem.textContent.split('').entries()) {
        if (char === '#') {
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
      }
      elem.textContent = newString;
    }
  });
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
      <!-- TODO: Add link to fetch all songs by artist -->
      <Heading
        :label="song?.artist"
        as="h2"
        :level="3"
        font="300"
        class="uppercase"
      />
      <Heading :label="song?.title" as="h1" :level="1" font="600" />
      <Heading
        :label="'(' + song?.alternativeTitle + ')'"
        as="h2"
        :level="3"
        font="300"
        m="t-1"
      />
    </div>

    <div flex="~ row gap-4 sm:col" justify="between" items="end">
      <div flex="~ gap-4">
        <Button
          @click="transpose('up')"
          v-tooltip="'Transpose up'"
          class="p-button-success"
        >
          <i class="fa-solid fa-chevron-up"></i>
        </Button>
        <Button
          @click="transpose('down')"
          v-tooltip="'Transpose down'"
          class="p-button-success"
        >
          <i class="fa-solid fa-chevron-down"></i>
        </Button>
      </div>

      <Link v-if="isAuthor" :to="editRoute">
        <Button v-tooltip.left="'Edit song'" class="p-button-secondary">
          <i class="fa-solid fa-pen-to-square" />
        </Button>
      </Link>
    </div>
  </div>

  <div flex="~ gap-8 wrap" justify="sm:between" m="t-4 sm:t-6">
    <RichTextEditor
      v-if="song?.content"
      read-only
      :content="song.content"
      class="editor"
    />
    <div v-if="youtubeLink" w="full sm:80" class="md:translate-y-1">
      <iframe :src="youtubeLink" w="full" border="none rounded" />
    </div>
  </div>
</template>

<style lang="scss">
iframe {
  aspect-ratio: 16/9 !important;
}
</style>
