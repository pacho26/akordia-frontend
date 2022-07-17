<script lang="ts" setup>
import { useSongsStore } from '@/stores/songs';

const { userSongs } = useSongsStore();
</script>

<template>
  <div v-if="userSongs.length" flex="~ gap-3 lg:gap-3.18 xl:gap-4.4 wrap">
    <SongItem
      v-for="song in userSongs"
      :key="song._id"
      :song="song"
      w="full lg:49% xl:32%"
    />
  </div>
  <div v-else flex="~ col gap-4" items="center" pos="relative top-36vh">
    <Heading label="You haven't entered any songs yet." :level="1" as="h1" />
    <Link to="/song/new">
      <Button flex="~ gap-3" class="p-button-secondary">
        <i text="xl" class="fa-solid fa-plus" />
        Add new song
      </Button>
    </Link>
  </div>
</template>
