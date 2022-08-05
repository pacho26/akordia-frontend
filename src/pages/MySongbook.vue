<script lang="ts" setup>
import { useSongsStore } from '@/stores/songs';

const { userSongs } = useSongsStore();
</script>

<template>
  <div v-if="userSongs.length">
    <Heading label="My songbook" :level="1" as="h1" />
    <SongList :songs="userSongs" m="t-4" />
  </div>
  <div v-else flex="~ col gap-4" items="center" pos="relative top-36vh">
    <Heading label="You haven't entered any songs yet." :level="1" as="h1" />
    <Link to="/song/new">
      <Button flex="~ gap-3" class="p-button-secondary">
        <i text="xl" class="fa-solid fa-plus" />
        Make new request
      </Button>
    </Link>
  </div>
</template>
