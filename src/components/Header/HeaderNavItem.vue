<script setup lang="ts">
import type { IconPropModel } from '@/models/icon.model';

interface Props {
  icon?: IconPropModel | null;
  iconType?: 'solid' | 'regular' | 'brands';
  label?: string | null;
  noHover?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  iconType: 'solid',
});
</script>

<template>
  <div
    flex="center gap-2.5"
    h="43px"
    min-w="43px"
    p="2 md:(y-2 x-3)"
    text="gray-700 hover:primary-900"
    font="medium"
    border="rounded"
    cursor="pointer"
    transition="default"
    :hover="noHover ? '' : 'bg-primary-50'"
    whitespace="nowrap"
    select="none"
  >
    <i v-if="icon" text="xl" :class="`fa-${iconType} fa-${props.icon}`" />
    <div display="none lg:block">
      <slot>{{ label }}</slot>
    </div>
  </div>
</template>
