<script lang="ts" setup>
import { useRequestsStore } from '@/stores/requests';

const { lastRequest } = useRequestsStore();
</script>

<template>
  <div>{{ lastRequest }}</div>
</template>
