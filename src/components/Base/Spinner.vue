<template>
  <div
    bg="neutral-400"
    bg-opacity="85"
    flex="center"
    pos="fixed top-0 left-0"
    w="100vw"
    h="100vh"
    z="99999"
  >
    <div
      v-for="i in 4"
      :key="i"
      w="32px sm:40px"
      h="32px sm:40px"
      m="r-10px"
      class="cube"
    ></div>
  </div>
</template>

<style lang="scss" scoped>
$colors: #253586, #495dc6, #95aeed, #f0f4fe;

.cube {
  @for $i from 1 through length($colors) {
    &:nth-child(#{$i}) {
      background-color: nth($colors, $i);
      border-radius: 6px;
    }
  }

  &:first-child {
    animation: left 1s infinite;
  }

  &:last-child {
    animation: right 1s infinite 0.5s;
  }

  @keyframes left {
    40% {
      transform: translateX(-60px);
    }
    50% {
      transform: translateX(0);
    }
  }

  @keyframes right {
    40% {
      transform: translateX(60px);
    }
    50% {
      transform: translateX(0);
    }
  }
}
</style>
