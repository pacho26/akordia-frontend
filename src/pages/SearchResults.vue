<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { useSongsStore } from '@/stores/songs';
import { storeToRefs } from 'pinia';

const route = useRoute();

const songsStore = useSongsStore();

const { foundSongs } = storeToRefs(songsStore);
</script>

<template>
  <SongList v-if="foundSongs.length" :songs="foundSongs" />
  <Heading
    v-else
    :label="`There are no songs found for term '${route.params.query}'`"
    :level="1"
    as="h1"
    text="gray-700 center"
    pos="relative top-36vh"
  />
</template>
