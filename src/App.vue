<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <Header />
  <Container>
    <RouterView />
  </Container>
</template>

<style lang="scss">
body {
  margin: 0;
  line-height: 1.5;
}
</style>
