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
* {
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}
body {
  margin: 0;
  background-color: #f8f9fa;
}

::selection {
  background-color: #bddea1;
}
</style>
