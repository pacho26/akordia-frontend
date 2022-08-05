<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { useSongsStore } from '@/stores/songs';
import { storeToRefs } from 'pinia';

const route = useRoute();

const songsStore = useSongsStore();

const { foundSongs, foundArtists } = storeToRefs(songsStore);
</script>

<template>
  <div v-if="foundSongs.length || foundArtists.length" flex="~ col gap-8">
    <div v-if="foundSongs.length">
      <SearchSectionTitle label="Songs" icon="music" />
      <SongList :songs="foundSongs" m="t-5" />
    </div>

    <div v-if="foundArtists.length">
      <SearchSectionTitle label="Artists" icon="microphone" />
      <ArtistList :artists="foundArtists" />
      <div flex="~ col gap-2.5" m="t-5"></div>
    </div>
  </div>
  <p v-else text="3xl center gray-500" pos="relative top-36vh">
    There are no songs or artists found for term
    <span font="600">{{ route.params.query }}</span>
  </p>
</template>
