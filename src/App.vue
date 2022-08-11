<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <Header />
  <Container flex="~">
    <Sidebar />
    <div m="t-4 b-12 sm:t-6 md:l-8" w="full">
      <RouterView />
    </div>
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
  background-color: #d4def8;
}

.three-dots {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

h1,
h2,
h3,
h4,
h5,
h6,
p {
  margin: 0;
}
</style>
