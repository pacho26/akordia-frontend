<script lang="ts" setup>
import { useUserStore } from '@/stores/user';

const { username, userId } = useUserStore();
</script>

<template>
  <div flex="center" border="rounded" class="welcome-wrapper">
    <div
      flex="~ col vcenter gap-1 md:gap-4"
      p="x-3 y-2 sm:(x-4.5 y-3.5)"
      m="y-12.5"
      text="xl gray-800 md:3xl lg:4xl"
      font="500"
      border="rounded"
      class="transparent-bg"
    >
      {{ $t('homepage.welcomeBack') }}
      <Link
        :to="`profile/${userId}`"
        font="700"
        transform="hover:rotate--1"
        class="text-primary-600 hover:text-primary-800"
        >{{ username }}</Link
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
.welcome-wrapper {
  background-image: url('../../assets/img/instruments-cover.png');
  background-repeat: repeat;
  background-size: contain;

  .transparent-bg {
    background-color: rgba(255, 255, 255, 0.88);
  }
}
</style>
