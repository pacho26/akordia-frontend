<script lang="ts" setup>
import type Song from '@/models/song.model';

interface Props {
  songs: Song[];
}

defineProps<Props>();
</script>

<template>
  <div flex="~ gap-3 lg:gap-3.18 xl:gap-4.4 wrap">
    <SongItem
      v-for="song in songs"
      :key="song._id"
      :song="song"
      w="full lg:49% xl:32%"
    />
  </div>
</template>
