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

const goToArtistByLetterPage = async (letter: string) => {
  const resArtists = await getArtistsBySearchTerm({
    searchTerm: letter as string,
  });
  setFoundArtistsByLetter(resArtists);

  router.push({ name: 'artist-by-letter-overview', params: { letter } });
};
</script>

<template>
  <div
    v-for="letter in letters"
    :key="letter"
    @click="goToArtistByLetterPage(letter)"
    flex="center"
    w="34.75px"
    h="34.75px"
    p="0.6"
    cursor="pointer"
    text="gray-700 hover:primary-600"
    font="500"
    hover="bg-primary-100"
    class="test transition-default"
  >
    {{ letter }}
  </div>
</template>

<style lang="scss" scoped>
.test {
  border-radius: 50%;
}
</style>
