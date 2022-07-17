<script lang="ts" setup>
import { useSongsStore } from '@/stores/songs';
import SongList from '../components/Song/SongList.vue';

const { foundSongs } = useSongsStore();
</script>

<template>
  <SongList :songs="foundSongs" />
</template>
