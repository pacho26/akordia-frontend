<script lang="ts" setup>
import { useRouteParams } from '@vueuse/router';
import { useSongsStore } from '@/stores/songs';

const letter = useRouteParams('letter');

const { foundArtistsByLetter } = toRefs(useSongsStore());

const notFoundMessage = computed(
  () => `There are no artists that start with '${letter.value}'`
);
</script>

<template>
  <div v-if="foundArtistsByLetter.length">
    <SearchSectionTitle label="Artists" icon="microphone" />
    <ArtistList :artists="foundArtistsByLetter" />
    <div flex="~ col gap-2.5" m="t-5"></div>
  </div>

  <Heading
    v-else
    :label="notFoundMessage"
    :level="1"
    as="h1"
    text="gray-700 center"
    pos="relative top-36vh"
  />
</template>
