<script lang="ts" setup>
interface Props {
  orientation: 'up' | 'down';
}

defineProps<Props>();
</script>

<template>
  <div
    w="fit"
    p="1.25"
    bg="white"
    flex="center"
    border="1 gray-300 rounded"
    cursor="pointer"
    opacity="hover:85"
    class="thumb-wrapper"
  >
    <Icon
      :icon="`emojione-v1:reverse-thumbs-${orientation}`"
      text="24px"
      transition="default"
    />
  </div>
</template>

<style lang="scss" scoped>
.thumb-wrapper {
  &:hover {
    > * {
      transform: rotate(-14deg);
    }
  }
}
</style>
