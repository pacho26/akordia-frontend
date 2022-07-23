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
    <SongList v-if="songs.length" :songs="songs" m="t-4" />
    <Heading
      v-else
      label="The artist currently has no songs"
      :level="1"
      as="h1"
      text="gray-700 center"
      pos="relative top-36vh"
    />
  </div>
</template>
