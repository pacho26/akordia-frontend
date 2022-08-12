<script lang="ts" setup>
import type { Request } from '@/models/request.model';

interface Props {
  request: Request;
}

const props = defineProps<Props>();

const hasFlatChords = ref(false);

onBeforeMount(() => {
  addMarginTopToChords();
});

const contentComponentKey = ref(0);

watchEffect(async () => {
  if (props.request) {
    contentComponentKey.value++;
    hasFlatChords.value = false;
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

const youtubeLink = computed(() => {
  return props.request?.youtubeId
    ? `https://www.youtube.com/embed/${props.request.youtubeId}`
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
  return props.request.artist
    ? replaceCroatianLetters(props.request?.artist)
        .replace(' ', '_')
        .toLowerCase()
    : '';
});
</script>

<template>
  <div
    v-if="request"
    flex="~ col gap-4 sm:row"
    justify="between"
    p="b-4"
    border="b-1 gray-300"
  >
    <div>
      <Link :to="`/artist/${artistLinkSegment}`">
        <Heading
          :label="request.artist"
          as="h2"
          :level="3"
          text="primary-700 hover:primary-500"
          font="300"
          transition="default"
          class="uppercase"
        />
      </Link>
      <Heading :label="request?.title" as="h1" :level="1" font="600" />
      <Heading
        v-if="request?.alternativeTitle"
        :label="'(' + request?.alternativeTitle + ')'"
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
          v-tooltip="'Transpose down'"
        >
          <i class="fa-solid fa-chevron-down"></i>
        </Button>

        <Button
          variant="secondary"
          @click="transpose('up')"
          v-tooltip="'Transpose up'"
        >
          <i class="fa-solid fa-chevron-up"></i>
        </Button>
      </div>
    </div>
  </div>

  <div flex="~ gap-8 wrap" justify="sm:between" m="t-4 sm:t-6">
    <RichTextEditor
      v-if="request.content"
      :key="contentComponentKey"
      read-only
      :content="request.content"
      class="editor"
    />
    <div v-if="youtubeLink" w="full sm:80" class="md:translate-y-1">
      <iframe :src="youtubeLink" w="full" border="none rounded" />
    </div>
  </div>
</template>
