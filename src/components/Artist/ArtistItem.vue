<script lang="ts" setup>
import router from '@/router';
import { useSongsStore } from '@/stores/songs';

const { setLastViewedArtist } = useSongsStore();

interface Props {
  artist: string;
}

const props = defineProps<Props>();

const goToArtistPage = () => {
  setLastViewedArtist(props.artist);
  router.push(`/artist/${artistLinkSegment.value}`);
};

const replaceCroatianLetters = (str: string) =>
  str
    .replace(/[ČčĆć]/g, 'c')
    .replace(/[Šš]/g, 's')
    .replace(/[Đđ]/g, 'dj')
    .replace(/[Žž]/g, 'z');

const artistLinkSegment = computed(() => {
  return props.artist
    ? replaceCroatianLetters(props.artist).replace(' ', '_').toLowerCase()
    : '';
});
</script>

<template>
  <div
    @click="goToArtistPage"
    w="fit"
    p="x-3 y-1"
    border="rounded"
    bg="white hover:primary-50"
    text="gray-700"
    shadow=""
    cursor="pointer"
    transition="default"
    class="three-dots"
  >
    {{ artist }}
  </div>
</template>
