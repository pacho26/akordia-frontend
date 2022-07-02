<script setup lang="ts">
import { RouterView } from 'vue-router';

let windowHeight = ref(window.innerHeight);

const sidebar = ref(null);

onMounted(() => {
  onWindowHeightChange();
  window.addEventListener('resize', onWindowHeightChange);
});

const onWindowHeightChange = () => {
  windowHeight.value = window.innerHeight;

  if (sidebar.value?.style) {
    sidebar.value.style.minHeight = `${windowHeight.value - 75}px`;
  }
};
</script>

<template>
  <Header />
  <Container flex="~">
    <div
      ref="sidebar"
      w="380px"
      display="none sm:block"
      p="t-6 r-8"
      border="r-1 gray-300"
    >
      <div text="md" font="500" class="uppercase">Recent songs:</div>
      <div flex="~ col gap-2" m="t-2">
        <div w="260px" text="xs" cursor="pointer" class="three-dots">
          Đorđe Balašević - Devojka sa čardaš nogama
        </div>
        <div w="260px" text="xs" cursor="pointer" class="three-dots">
          Đorđe Balašević - Devojka sa čardaš nogama
        </div>
        <div w="260px" text="xs" cursor="pointer" class="three-dots">
          Đorđe Balašević - Devojka sa čardaš nogama
        </div>
        <div w="260px" text="xs" cursor="pointer" class="three-dots">
          Đorđe Balašević - Devojka sa čardaš nogama
        </div>
        <div w="260px" text="xs" cursor="pointer" class="three-dots">
          Đorđe Balašević - Devojka sa čardaš nogama
        </div>
        <div w="260px" text="xs" cursor="pointer" class="three-dots">
          Đorđe Balašević - Devojka sa čardaš nogama
        </div>
        <div w="260px" text="xs" cursor="pointer" class="three-dots">
          Đorđe Balašević - Devojka sa čardaš nogama
        </div>
        <div w="260px" text="xs" cursor="pointer" class="three-dots">
          Đorđe Balašević - Devojka sa čardaš nogama
        </div>
      </div>
    </div>
    <div m="sm:l-8" w="full">
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
  background-color: #bddea1;
}

.three-dots {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
