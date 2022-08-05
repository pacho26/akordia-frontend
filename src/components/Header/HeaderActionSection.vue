<script lang="ts" setup>
import {
  getSongsBySearchTerm,
  getArtistsBySearchTerm,
} from '@/services/api/songs';
import { useSongsStore } from '@/stores/songs';
import { useNotification } from '@/composables/useNotification';
import router from '@/router';

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
  setFoundSongs(resSongs.data);
  setFoundArtists(resArtists.data);

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
      <Button @click="search" icon="pi pi-search" class="p-button-success" />
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
