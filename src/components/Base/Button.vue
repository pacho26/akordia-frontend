<script lang="ts" setup>
interface Props {
  variant: 'primary' | 'secondary';
}

defineProps<Props>();
</script>

<template>
  <el-button transition="!default" :class="variant" h="!auto">
    <slot />
  </el-button>
</template>

<style lang="scss" scoped>
.el-button {
  font-size: 16px !important;
}

.primary {
  background: #495dc6 !important;
  color: white !important;

  &:focus,
  &:hover {
    border-color: #6175de !important;
    background: #3547a4 !important;
  }
}

.secondary {
  background: #f0f4fe !important;
  border-color: #d4def8 !important;
  color: #6175de !important;
  font-size: 16px;

  &:focus,
  &:hover {
    border-color: #95aeed !important;
    background: #d4def8 !important;
    color: #495dc6 !important;
  }
}
</style>
