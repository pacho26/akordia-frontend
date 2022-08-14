<script lang="ts" setup>
import type { User } from '@/models/user.model';

interface Props {
  type: 'voters' | 'authors';
  data: User[];
}

defineProps<Props>();
</script>

<template>
  <div bg="#f0efee" w="fit" p="t-3 4 sm:t-3" shadow="md" border="rounded">
    <p text="center gray-600 xl" font="700" m="l-3 b-2" class="uppercase">
      {{
        type === 'authors'
          ? $t('homepage.top5Authors')
          : $t('homepage.top5Voters')
      }}
    </p>
    <el-table :data="data" w="!fit" class="rounded">
      <el-table-column
        fixed
        prop="rank"
        :label="$t('homepage.rank')"
        width="62"
      />
      <el-table-column
        prop="username"
        :label="$t('homepage.username')"
        width="131"
      >
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
        :label="
          type === 'voters' ? $t('homepage.votes') : $t('homepage.chords')
        "
        width="78"
      />
    </el-table>
  </div>
</template>
