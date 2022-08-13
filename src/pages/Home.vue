<script setup lang="ts">
import type { Song } from '@/models/song.model';
import type { User } from '@/models/user.model';
import { getLastSongs } from '@/services/api/songs';
import { getTopAuthors, getTopVoters, getUser } from '@/services/api/user';

const topAuthors = ref<User[]>();
const topVoters = ref<User[]>();
const lastSongs = ref<Song[]>();

onBeforeMount(async () => {
  await setTopVoters();
  await setTopAuthors();
  await setLastSongs();
});

const setTopVoters = async () => {
  const res = await getTopVoters();
  topVoters.value = res.map((item: User, index: number) => ({
    rank: `${index + 1}.`,
    ...item,
  }));
};

const setTopAuthors = async () => {
  const res = await getTopAuthors();
  topAuthors.value = res.map((item: User, index: number) => ({
    rank: `${index + 1}.`,
    ...item,
  }));
};

const setLastSongs = async () => {
  const lastSongsRes = await getLastSongs(5);
  lastSongs.value = await Promise.all(
    lastSongsRes.map(async (item) => {
      const userRes = await getUser(item.author);
      return {
        authorUsername: userRes.username,
        ...item,
      };
    })
  );
};
</script>

<template>
  <Welcome w="full" />
  <SongsTable
    v-if="lastSongs"
    title="Last added chords"
    :data="lastSongs"
    m="t-12"
  />
  <div m="t-12" flex="~ col gap-8 xl:row" justify="between">
    <AdvertsList />
    <div flex="center row wrap gap-8 md:col">
      <TopUsersTable v-if="topAuthors" type="authors" :data="topAuthors" />
      <TopUsersTable v-if="topVoters" type="voters" :data="topVoters" />
    </div>
  </div>
</template>
