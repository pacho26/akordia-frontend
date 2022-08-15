<script lang="ts" setup>
import type Song from '@/models/song.model';
import { useSongsStore } from '@/stores/songs';

const { recentSongs } = toRefs(useSongsStore());

const router = useRouter();

let windowHeight = ref(window.innerHeight);

const sidebar = ref<HTMLDivElement>();

onMounted(() => {
  onWindowHeightChange();
  window.addEventListener('resize', onWindowHeightChange);
});

const onWindowHeightChange = () => {
  windowHeight.value = window.innerHeight;

  if (sidebar.value?.style) {
    sidebar.value.style.minHeight = `${windowHeight.value - 126}px`;
  }
};

const goToSongPage = (song: Song) => {
  router.push(`/song/${song._id}`);
};
</script>

<template>
  <div
    ref="sidebar"
    w="380px"
    display="none md:block"
    p="t-6 r-8"
    border="r-1 gray-300"
  >
    <Heading
      :label="$t('sidebar.recentSongs')"
      class="uppercase"
      :level="4"
      as="h3"
    />
    <div flex="~ col gap-2" m="t-3">
      <div
        v-for="song in recentSongs"
        :key="song._id"
        @click="goToSongPage(song)"
        w="260px"
        text="xs gray-700 hover:primary-600"
        cursor="pointer"
        class="three-dots transition-default"
      >
        {{ song.artist }} - {{ song.title }}
      </div>
    </div>
  </div>
</template>
