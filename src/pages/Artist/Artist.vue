<script lang="ts" setup>
import type Song from '@/models/song.model';
import { getSongsByArtist } from '@/services/api/songs';
import { useSongsStore } from '@/stores/songs';

const { lastViewedArtist } = useSongsStore();
const artist = lastViewedArtist;

const songs = ref<Song[] | null>(null);

onBeforeMount(async () => {
  if (artist) {
    const res = await getSongsByArtist({ artist: artist as string });
    songs.value = res.data;
  }
});
</script>

<template>
  <div v-if="songs">
    <Heading :label="artist" :level="1" as="h1" m="b-4" />
    <SongList :songs="songs" m="t-4" />
  </div>
</template>
