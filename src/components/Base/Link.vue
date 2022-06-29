<script setup lang="ts">
const props = defineProps({
  to: {
    type: [String, Object],
    default: null,
  },
  href: {
    type: String,
    default: null,
  },
  newTab: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <component
    v-bind="$attrs"
    :is="to ? 'router-link' : 'a'"
    :to="to || ''"
    :href="href || ''"
    :target="newTab ? '_blank' : ''"
    flex="vcenter"
    class="no-underline"
  >
    <slot />
  </component>
</template>
