<script lang="ts" setup>
import { useRouteParams } from '@vueuse/router';
import { useSongsStore } from '@/stores/songs';

const letter = useRouteParams('letter');

const { foundArtistsByLetter } = toRefs(useSongsStore());

const notFoundMessage = computed(
  () =>
    `There are no artists that start with <span font="600">${letter.value}</span>`
);
</script>

<template>
  <div v-if="foundArtistsByLetter.length">
    <SearchSectionTitle label="Artists" icon="microphone" />
    <ArtistList :artists="foundArtistsByLetter" />
    <div flex="~ col gap-2.5" m="t-5"></div>
  </div>

  <p
    v-else
    v-html="notFoundMessage"
    text="3xl center gray-500"
    pos="relative top-36vh"
  />
</template>
