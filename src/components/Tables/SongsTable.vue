<script lang="ts" setup>
import { useChordsBreakpoints } from '@/composables/useChordsBreakpoints';
import type { Song } from '@/models/song.model';

const breakpoints = useChordsBreakpoints();
const sm = breakpoints.smaller('sm');

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
    p="t-3 4 sm:t-3"
    shadow="md"
    border="rounded"
    class="songs-table-wrapper"
  >
    <p text="center gray-600 xl" font="700" m="l-3 b-2" class="uppercase">
      {{ title }}
    </p>

    <el-table v-if="!sm" :data="data" w="full" class="rounded">
      <el-table-column prop="title" :label="$t('homepage.title')" width="38%">
        <template #default="{ row }">
          <Link
            :to="`/song/${row._id}`"
            class="text-primary-500 hover:text-primary-700 three-dots"
          >
            {{ row.title }}
          </Link>
        </template>
      </el-table-column>
      <el-table-column
        prop="artist"
        :label="$t('homepage.artist')"
        width="38%"
      />
      <el-table-column
        prop="authorUsername"
        :label="$t('homepage.author')"
        width="24%"
      >
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

    <el-table v-else :data="data" w="full" class="rounded">
      <el-table-column prop="title" :label="$t('homepage.title')" width="55%">
        <template #default="{ row }">
          <Link
            :to="`/song/${row._id}`"
            class="text-primary-500 hover:text-primary-700 three-dots"
          >
            {{ row.title }}
          </Link>
        </template>
      </el-table-column>
      <el-table-column
        prop="artist"
        :label="$t('homepage.artist')"
        width="45%"
      />
    </el-table>
  </div>
</template>

<style lang="scss">
.songs-table-wrapper table {
  width: 100% !important;
}
</style>
