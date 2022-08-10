<script lang="ts" setup>
import type { Song } from '@/models/song.model';

interface Props {
  title: string;
  data: Song[];
}

defineProps<Props>();
</script>

<template>
  <div
    bg="#f0efee"
    w="full"
    p="t-3 6"
    shadow="md"
    border="rounded"
    class="songs-table-wrapper"
  >
    <p text="center gray-600 xl" font="700" m="l-3 b-3" class="uppercase">
      {{ title }}
    </p>
    <el-table :data="data" w="full" class="rounded">
      <el-table-column prop="title" label="title" width="33%">
        <template #default="{ row }">
          <Link
            :to="`/song/${row._id}`"
            class="text-primary-500 hover:text-primary-700 three-dots"
          >
            {{ row.title }}
          </Link>
        </template>
      </el-table-column>
      <el-table-column prop="artist" label="Artist" width="33%" />
      <el-table-column prop="authorUsername" label="Author" width="33%">
        <template #default="{ row }">
          <Link
            :to="`/profile/${row.author}`"
            class="text-primary-500 hover:text-primary-700 three-dots"
          >
            {{ row.authorUsername }}
          </Link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style lang="scss">
.songs-table-wrapper table {
  width: 100% !important;
}
</style>
