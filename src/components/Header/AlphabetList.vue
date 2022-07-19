<script lang="ts" setup>
import router from '@/router';
import { getArtistsBySearchTerm } from '@/services/api/songs';
import { useSongsStore } from '@/stores/songs';

const { setFoundArtistsByLetter } = useSongsStore();

const letters = [
  'A',
  'B',
  'C',
  'Č',
  'Ć',
  'D',
  'DŽ',
  'Đ',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'LJ',
  'M',
  'N',
  'NJ',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'Š',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  'Ž',
  '0-9',
];

const gotoArtistByLetterPage = async (letter: string) => {
  const resArtists = await getArtistsBySearchTerm({
    searchTerm: letter as string,
  });
  setFoundArtistsByLetter(resArtists.data);

  router.push({ name: 'artist-by-letter-overview', params: { letter } });
};
</script>

<template>
  <div
    v-for="letter in letters"
    :key="letter"
    @click="gotoArtistByLetterPage(letter)"
    p="2"
    cursor="pointer"
    text="gray-700 hover:primary-500"
    font="500"
    transition="default"
  >
    {{ letter }}
  </div>
</template>
