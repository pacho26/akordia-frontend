<script lang="ts" setup>
import { useSongs } from '@/composables/api/songs';
import { storeToRefs } from 'pinia';
import { useSongsStore } from '@/stores/songs';

const { fetchSongs } = useSongs();

const songsStore = useSongsStore();
const { songs } = storeToRefs(songsStore);

onBeforeMount(async () => {
  await fetchSongs();
  console.log(songs.value.data[0]);
});
</script>

<template>
  <div>Profile content</div>
</template>
