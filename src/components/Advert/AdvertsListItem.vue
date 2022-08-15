<script lang="ts" setup>
import type Advert from '@/models/advert.model';

interface Props {
  advert: Advert;
}

defineProps<Props>();
</script>

<template>
  <Link :to="`/advert/${advert._id}`" w="full">
    <div
      w="full"
      p="4"
      border="rounded"
      m="y-2"
      bg="#f0efee hover:primary-100"
      cursor="pointer"
      select="none"
      class="transition-default"
    >
      <div text="gray-700" font="500">
        {{ advert.title }}
      </div>
      <div text="gray-500 sm right">{{ advert.authorUsername }}</div>
    </div>
  </Link>
</template>
