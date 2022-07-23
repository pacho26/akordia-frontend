<script lang="ts" setup>
import { getRandomRequest } from '@/services/api/requests';
import { useRequestsStore } from '@/stores/requests';
import { useSongsStore } from '@/stores/songs';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import RequestOverview from '../components/Request/RequestOverview.vue';

const { setLastViewedArtist } = useSongsStore();
const { user } = useUserStore();
const userStore = useRequestsStore();
const { setLastRequest } = userStore;
const { lastRequest } = storeToRefs(userStore);

const getNewRequest = async () => {
  const request = await getRandomRequest();

  if (
    request.data.voters.includes(user._id) ||
    request.data._id === lastRequest.value._id
  ) {
    getNewRequest();
    return;
  }

  setLastRequest(request.data);
  setLastViewedArtist(request.data.artist);
};

onBeforeMount(async () => {
  if (!lastRequest) {
    await getNewRequest();
  }
});

const vote = async (value: 'up' | 'down') => {
  const payload = {
    requestId: lastRequest.value._id,
    voterId: user._id,
    vote: value === 'up' ? 1 : -1,
  };
  console.log(lastRequest._id);
};
</script>

<template>
  <div>
    <div m="b-3" flex="vcenter gap-8" justify="between sm:start">
      <div flex="vcenter gap-3">
        <ThumbsIcon @click="vote('up')" :orientation="'up'" />
        <p text="3xl gray-500">2</p>
        <ThumbsIcon @click="vote('down')" :orientation="'down'" />
      </div>

      <Button @click="getNewRequest" class="p-button-secondary">Skip</Button>
    </div>

    <RequestOverview v-if="lastRequest" :request="lastRequest" />
  </div>
</template>
