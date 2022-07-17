<script lang="ts" setup>
import ArtistItem from './ArtistItem.vue';
interface Props {
  artists: string[];
}

defineProps<Props>();
</script>

<template>
  <div flex="~ col gap-3" m="t-4">
    <ArtistItem v-for="artist in artists" :key="artist" :artist="artist" />
  </div>
</template>
