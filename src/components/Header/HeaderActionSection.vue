<script lang="ts" setup>
import { getSongsBySearchTerm } from '@/services/api/songs';
import { useSongsStore } from '@/stores/songs';
import { useNotification } from '@/composables/useNotification';
import router from '@/router';

const { setSearchResuls } = useSongsStore();

const searchTerm = ref<string>('');

const search = async () => {
  searchTerm.value = searchTerm.value.trim();
  if (searchTerm.value.length < 3) {
    const { showSearchTermNotication } = useNotification();
    showSearchTermNotication();
    return;
  }
  const res = await getSongsBySearchTerm({ searchTerm: searchTerm.value });
  setSearchResuls(res.data);
  router.push(`/search/${searchTerm.value.toLowerCase()}`);
};
</script>

<template>
  <div flex="~ gap-3.75 sm:gap-6">
    <div class="p-inputgroup">
      <InputText
        v-model="searchTerm"
        placeholder="Search for songs, artists..."
        class="p-inputtext"
      />
      <Button @click="search" icon="pi pi-search" class="p-button-success" />
    </div>

    <Link to="/song/new">
      <HeaderNavItem
        icon="plus"
        label="Add new"
        bg="primary-500 hover:primary-600"
        text="white"
      />
    </Link>
  </div>
</template>
