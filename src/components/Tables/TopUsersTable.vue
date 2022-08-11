<script lang="ts" setup>
import type { User } from '@/models/user.model';

interface Props {
  type: 'voters' | 'authors';
  data: User[];
}

const props = defineProps<Props>();

const title = computed(() => {
  switch (props.type) {
    case 'voters':
      return 'Top 5 voters';
    case 'authors':
      return 'Top 5 authors';
    default:
      return '';
  }
});
</script>

<template>
  <div bg="#f0efee" w="fit" p="t-3 4 sm:(t-3 6)" shadow="md" border="rounded">
    <p text="center gray-600 xl" font="700" m="l-3 b-3" class="uppercase">
      {{ title }}
    </p>
    <el-table :data="data" w="!fit" class="rounded">
      <el-table-column fixed prop="rank" label="Rank" width="61" />
      <el-table-column prop="username" label="Username" width="130">
        <template #default="{ row }">
          <Link
            :to="`/profile/${row._id}`"
            class="text-primary-500 hover:text-primary-700"
          >
            {{ row.username }}
          </Link>
        </template>
      </el-table-column>
      <el-table-column
        :prop="type === 'voters' ? 'numberOfVotes' : 'numberOfSongs'"
        label="Votes"
        width="70"
      />
    </el-table>
  </div>
</template>
