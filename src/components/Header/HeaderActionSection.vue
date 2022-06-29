<script lang="ts" setup>
import { useChordsBreakpoints } from '@/composables/use-chords-breakpoints';

const breakpoints = useChordsBreakpoints();
const lg = breakpoints.smaller('lg');
</script>

<template>
  <div flex gap-4 sm:gap-6>
    <div class="p-inputgroup">
      <InputText
        placeholder="Search for songs, artists..."
        class="p-inputtext"
      />
      <Button icon="pi pi-search" class="p-button-success" />
    </div>
    <HeaderNavItem
      icon="plus"
      label="Add new"
      bg="primary-500 hover:primary-600"
      text="white"
      :class="{ 'min-w-43px': lg }"
    />
  </div>
</template>
