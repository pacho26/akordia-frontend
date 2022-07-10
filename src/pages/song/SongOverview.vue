<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { useSong } from '@/composables/api/songs';

const route = useRoute();

const { fetchSong, song } = useSong();

const songId = computed(() => route.params.id as string);

watchEffect(() => {
  if (songId.value) {
    fetchSong(songId.value);
  }
});
// TODO: Replace with real values
const isAuthor = true;

const youtubeLink = computed(() => {
  return song.value?.youtubeId
    ? `https://www.youtube.com/embed/${song.value?.youtubeId}`
    : '';
});

const editRoute = computed(() => {
  return `${route.path}/edit`;
});

// TODO: Add transpose
// strongElementsInRichTextEditor.forEach((el) => {console.log(el.textContent.split(/\s+/))})
</script>

<template>
  <div
    v-if="song"
    flex="~ col gap-4 sm:row"
    justify="between"
    items="sm:end"
    m="sm:t-2"
    p="y-4"
    border="b-1 gray-300"
  >
    <div>
      <!-- TODO: Add link to fetch all songs by artist -->
      <div text="gray-600 lg sm:xl" font="300" class="uppercase">
        {{ song.artist }}
      </div>
      <div text="gray-800 2xl sm:3xl" font="600">
        {{ song?.title }}
      </div>
      <div font="300" v-if="song.alternativeTitle">
        ({{ song.alternativeTitle }})
      </div>
    </div>

    <Link v-if="isAuthor" :to="editRoute">
      <Button class="p-button-secondary">
        <i class="fa-solid fa-pen-to-square" />
      </Button>
    </Link>
  </div>
  <div flex="~ gap-8 wrap" justify="between" m="t-6">
    <RichTextEditor v-if="song?.content" read-only :content="song.content" />
    <div v-if="youtubeLink" w="full sm:80">
      <iframe :src="youtubeLink" w="full" border="none rounded" />
    </div>
  </div>
</template>

<style lang="scss">
iframe {
  aspect-ratio: 16/9 !important;
}
</style>
