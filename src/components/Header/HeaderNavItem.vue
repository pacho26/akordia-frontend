<script setup lang="ts">
import type { IconPropModel } from '@/models/icon';

interface Props {
  icon?: IconPropModel | null;
  iconType?: 'solid' | 'regular' | 'brands';
  label?: string | null;
}

const props = withDefaults(defineProps<Props>(), {
  iconType: 'solid',
});
</script>

<template>
  <div
    flex="vcenter gap-2"
    p="y-2 x-3"
    text="gray-900"
    font="medium"
    border="rounded"
    cursor="pointer"
    hover="bg-gray-100"
  >
    <i :class="`fa-${iconType} fa-${props.icon}`" />
    <slot>{{ label }}</slot>
  </div>
</template>
