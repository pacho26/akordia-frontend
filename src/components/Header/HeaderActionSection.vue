<script lang="ts" setup>
import { useNotification } from '@/composables/useNotification';
import router from '@/router';
import {
  getArtistsBySearchTerm,
  getSongsBySearchTerm,
} from '@/services/api/songs';
import { useSongsStore } from '@/stores/songs';

const { setFoundSongs, setFoundArtists } = useSongsStore();

const searchTerm = ref<string>('');

const search = async () => {
  searchTerm.value = searchTerm.value.trim();
  if (searchTerm.value.length < 3) {
    const { showSearchTermNotication } = useNotification();
    showSearchTermNotication();
    return;
  }
  const resSongs = await getSongsBySearchTerm({ searchTerm: searchTerm.value });
  const resArtists = await getArtistsBySearchTerm({
    searchTerm: searchTerm.value,
  });
  setFoundSongs(resSongs);
  setFoundArtists(resArtists);

  router.push(`/search/${searchTerm.value.toLowerCase()}`);
};
</script>

<template>
  <div flex="~ gap-3.75 sm:gap-6">
    <div class="p-inputgroup">
      <InputText
        v-model="searchTerm"
        v-on:keyup.enter="search"
        placeholder="Search for songs and artists"
        class="p-inputtext"
      />
      <ButtonPrime
        @click="search"
        icon="pi pi-search"
        bg="!primary-500"
        border="!primary-500"
        shadow="!none"
      />
    </div>

    <Link to="/song/new">
      <HeaderNavItem
        icon="plus"
        label="Make request"
        bg="primary-500 hover:primary-600"
        text="white"
      />
    </Link>
  </div>
</template>

<style lang="scss">
.p-inputtext.p-inputtext:enabled {
  box-shadow: none !important;

  &:hover {
    border-color: #95aeed !important;
  }

  &:focus {
    border-color: #95aeed !important;
  }
}
</style>
