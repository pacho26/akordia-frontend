<script lang="ts" setup>
import { useAdvertsStore } from '@/stores/adverts';
import { storeToRefs } from 'pinia';

const advertsStore = useAdvertsStore();
const { adverts } = storeToRefs(advertsStore);
</script>

<template>
  <div
    w="full"
    max-h="sm:400px md:640px"
    p="x-4 y-3"
    border="rounded"
    bg="white"
    shadow="lg"
    class="advert-list"
  >
    <div m="b-3" text="center gray-600 xl" font="700" class="uppercase">
      Advertisements
    </div>
    <AdvertsListItem
      v-for="advert in adverts"
      :key="advert._id"
      :advert="advert"
    />
  </div>
</template>

<style lang="scss" scoped>
.advert-list {
  height: fit-content;
  overflow: auto;
  overscroll-behavior-y: contain;
}

.advert-list::-webkit-scrollbar {
  width: 0.6rem;
}

.advert-list::-webkit-scrollbar-thumb {
  border-radius: 0.375rem;
  background-color: #95aeed;
}
</style>
