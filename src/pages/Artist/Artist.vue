<script lang="ts" setup>
import type Song from '@/models/song.model';
import { getSongsByArtist } from '@/services/api/songs';
import { useSongsStore } from '@/stores/songs';
import _ from 'lodash';

const { lastViewedArtist } = useSongsStore();
const artist = lastViewedArtist;

const songs = ref<Song[] | null>(null);

onBeforeMount(async () => {
  if (artist) {
    songs.value = await getSongsByArtist({ artist: artist as string });
  }
});
</script>

<template>
  <div v-if="songs">
    <Heading :label="artist" :level="1" as="h1" m="b-4" />
    <SongList
      v-if="songs.length"
      :songs="_.sortBy(songs, [(song) => song.title.toLowerCase()])"
      m="t-4"
    />
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
