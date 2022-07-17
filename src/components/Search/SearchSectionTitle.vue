<script lang="ts" setup>
import type { IconPropModel } from '@/models/icon.model';

interface Props {
  icon?: IconPropModel | null;
  iconType?: 'solid' | 'regular' | 'brands';
  label?: string;
}

const props = withDefaults(defineProps<Props>(), {
  iconType: 'solid',
});
</script>

<template>
  <div flex="vcenter gap-2">
    <div
      bg="gray-600"
      flex="center"
      w="32px"
      p="2"
      border="rounded-full"
      class="aspect-square"
    >
      <i text="base white" :class="`fa-${iconType} fa-${props.icon}`" />
    </div>
    <Heading :label="label" as="h2" :level="3" />
  </div>
</template>
