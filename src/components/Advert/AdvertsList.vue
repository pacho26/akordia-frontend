<script lang="ts" setup>
import { useAdvertsStore } from '@/stores/adverts';
import { storeToRefs } from 'pinia';
import Link from '../Base/Link.vue';

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
    <div pos="relative">
      <div m="b-2" text="center gray-600 xl" font="700" class="uppercase">
        <p>{{ $t('homepage.advertisements') }}</p>
      </div>
      <Link
        to="/advert/create"
        v-tooltip="'Add new advert'"
        pos="absolute right-0 top-0"
      >
        <Button variant="primary" w="!28px" h="!28px" p="!0">
          <i text="base" class="fa-solid fa-plus" />
        </Button>
      </Link>
    </div>
    <AdvertsListItem
      v-for="advert in adverts"
      :key="advert._id"
      :advert="advert"
    />
    <div
      v-if="!adverts?.length"
      m="t-4"
      p="y-4"
      text="sm center gray-500 sm:lg"
    >
      {{ $t('homepage.noAvailableAdvertisements') }}
    </div>
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
