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
    p="2 md:(y-2 x-3)"
    text="gray-700 hover:primary-900"
    font="medium"
    border="rounded"
    cursor="pointer"
    transition="default"
    hover="bg-primary-50"
  >
    <i text="xl" :class="`fa-${iconType} fa-${props.icon}`" />
    <div display="none md:block">
      <slot>{{ label }}</slot>
    </div>
  </div>
</template>
