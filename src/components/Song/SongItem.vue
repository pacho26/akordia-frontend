<script lang="ts" setup>
import type Song from '@/models/song.model';
import router from '@/router';

interface Props {
  song: Song;
}

const props = defineProps<Props>();

const goToSongOverview = () => {
  router.push(`/song/${props.song._id}`);
};
</script>

<template>
  <div
    bg="white hover:primary-50"
    p="4"
    m="b-0.75"
    border="rounded"
    shadow=""
    transform="~ hover:translate-y--0.5"
    transition="default"
    cursor="pointer"
    select="none"
    @click="goToSongOverview"
  >
    <Heading :label="song.title" :level="4" font="600" class="three-dots" />
    <p text="sm gray-500 sm:base" class="three-dots">
      {{ song.artist }}
    </p>
  </div>
</template>
