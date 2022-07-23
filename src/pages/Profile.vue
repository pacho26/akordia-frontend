<script lang="ts" setup>
import { useUserStore } from '@/stores/user';

const { user } = useUserStore();
</script>

<template>
  <div v-if="user" w="fit">
    <div
      v-if="user.role === 'admin'"
      flex="~ gap-2"
      items="center"
      w="fit"
      m="b-2.5"
      p="x-2.5 y-1"
      bg="primary-300"
      text="white center"
      font="700 tracking-wider"
      border="rounded"
      hover="rotate--2"
      transition="default"
      cursor="pointer"
      select="none"
      class="uppercase"
    >
      <i class="fa-solid fa-crown -translate-y-0.25" />
      <div>{{ user.role }}</div>
    </div>
    <div
      flex="~ gap-2"
      items="center"
      cursor="pointer"
      select="none"
      text="gray-700 !hover:primary-400"
      transition="default"
    >
      <i class="fa-solid fa-user translate-y-0.25" />
      <div text="2xl leading-6.5 sm:(text-3xl leading-8)" font="bold">
        {{ user.username }}
      </div>
    </div>
    <Heading :label="user.email" :level="6" as="h2" m="t-1" />
    <div>Songs posted: PLACEHOLDER</div>
  </div>
</template>
