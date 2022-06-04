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
  font-family: 'Ubuntu', sans-serif;
}
body {
  margin: 0;
}

::selection {
  background-color: #fa08;
}
</style>
