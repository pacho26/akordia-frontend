<script setup lang="ts">
import { getTopVoters, getTopAuthors } from '@/services/api/user';
import { getLastSongs } from '@/services/api/songs';
import { getUser } from '@/services/api/user';

const topAuthors = ref([]);
const topVoters = ref([]);
const lastSongs = ref([]);

onBeforeMount(async () => {
  await setTopVoters();
  await setTopAuthors();
  await setLastSongs();
});

const setTopVoters = async () => {
  const { data } = await getTopVoters();
  topVoters.value = data.map((item: User, index: number) => ({
    rank: `${index + 1}.`,
    ...item,
  }));
};

const setTopAuthors = async () => {
  const { data } = await getTopAuthors();
  topAuthors.value = data.map((item: User, index: number) => ({
    rank: `${index + 1}.`,
    ...item,
  }));
};

const setLastSongs = async () => {
  const { data } = await getLastSongs(5);
  lastSongs.value = await Promise.all(
    data.map(async (item) => {
      const { data } = await getUser(item.author);
      return {
        authorUsername: data.username,
        ...item,
      };
    })
  );
};
</script>

<template>
  <Welcome w="full" />
  <SongsTable title="Last added chords" :data="lastSongs" m="t-12" />
  <div m="t-12" flex="~ col gap-8 xl:row" justify="between">
    <AdvertsList />
    <div flex="center row wrap gap-8 md:col">
      <TopUsersTable type="voters" :data="topVoters" />
      <TopUsersTable type="authors" :data="topAuthors" />
    </div>
  </div>
</template>
