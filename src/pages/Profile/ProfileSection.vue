<script lang="ts" setup>
import type { IconPropModel } from '@/models/icon.model';

interface Props {
  title: string;
  content?: string;
  icon?: IconPropModel | null;
  iconType?: 'solid' | 'regular' | 'brands';
}

withDefaults(defineProps<Props>(), {
  iconType: 'solid',
});
</script>

<template>
  <div>
    <div
      flex="vcenter gap-2"
      text="sm white"
      w="fit"
      p="x-2 y-0.5"
      border="rounded"
      bg="gray-500"
      select="none"
      m="b-0.25 sm:b-1.5"
    >
      <i v-if="icon" :class="`fa-${iconType} fa-${icon}`" />
      <p class="uppercase">{{ title }}</p>
    </div>

    <div text="xl gray-600 sm:2xl" font="500">
      <p>{{ content }}</p>
      <slot />
    </div>
  </div>
</template>
