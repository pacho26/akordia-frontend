<script lang="ts" setup>
import { useRouteParams } from '@vueuse/router';
import { useSongsStore } from '@/stores/songs';

const letter = useRouteParams('letter');

const { foundArtistsByLetter } = toRefs(useSongsStore());
</script>

<template>
  <div v-if="foundArtistsByLetter.length">
    <SearchSectionTitle :label="$t('search.artists')" icon="microphone" />
    <ArtistList :artists="foundArtistsByLetter" />
    <div flex="~ col gap-2.5" m="t-5"></div>
  </div>

  <p v-else text="3xl center gray-500" pos="relative top-36vh">
    {{ $t('search.noFoundArtists') }}
    <span font="600">
      {{ letter }}
    </span>
  </p>
</template>
