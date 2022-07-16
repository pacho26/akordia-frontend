<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  label?: string;
}

const props = withDefaults(defineProps<Props>(), {
  as: 'p',
  level: 5,
});

const textSize = computed(() => {
  switch (props.level) {
    case 1:
      return 'text-2xl leading-6.5 sm:(text-3xl leading-8)';
    case 2:
      return 'text-xl leading-6 sm:(text-2xl leading-6.5)';
    case 3:
      return 'text-lg leading-5.5 sm:(text-xl leading-6)';
    case 4:
      return 'text-base leading-5 sm:(text-lg leading-5.5)';
    case 5:
      return 'text-sm leading-4.5 sm:(text-base leading-5)';
    case 6:
    default:
      return 'text-xs leading-3.5 sm:(text-sm leading-4)';
  }
});

const fontWeight = computed(() => {
  switch (props.level) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      return 'font-bold';
    case 6:
    default:
      return 'font-normal';
  }
});
</script>

<template>
  <component
    v-bind="$attrs"
    :is="as"
    m="0"
    font="display"
    text="gray-700"
    :class="[textSize, fontWeight]"
  >
    <slot>
      {{ label }}
    </slot>
  </component>
</template>
