<script setup lang="ts">
import type { Song } from '@/models/song.model';
import type { User } from '@/models/user.model';
import { getLastSongs } from '@/services/api/songs';
import { getTopAuthors, getTopVoters, getUser } from '@/services/api/user';
import { useSpinnerStore } from '@/stores/spinner';

const topAuthors = ref<User[]>();
const topVoters = ref<User[]>();
const lastSongs = ref<Song[]>();

const { setIsLoading } = useSpinnerStore();

const numberOfRenderdComponents = ref(0);
const NUMBER_OF_COMPONENTS = 5;

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

const incrementRenderCount = () => {
  numberOfRenderdComponents.value++;
};

watchEffect(() => {
  if (numberOfRenderdComponents.value === NUMBER_OF_COMPONENTS) {
    // To prevent flashing of the spinner
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }
});
</script>

<template>
  <Welcome @vue:mounted="incrementRenderCount" w="full" />
  <SongsTable
    @vue:mounted="incrementRenderCount"
    v-if="lastSongs"
    title="Last added chords"
    :data="lastSongs"
    m="t-12"
  />
  <div m="t-12" flex="~ col gap-8 xl:row" justify="between">
    <AdvertsList @vue:mounted="incrementRenderCount" />
    <div flex="center row wrap gap-8 md:col">
      <TopUsersTable
        @vue:mounted="incrementRenderCount"
        v-if="topAuthors"
        type="authors"
        :data="topAuthors"
      />
      <TopUsersTable
        @vue:mounted="incrementRenderCount"
        v-if="topVoters"
        type="voters"
        :data="topVoters"
      />
    </div>
  </div>
</template>
