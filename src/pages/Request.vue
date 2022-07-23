<script lang="ts" setup>
import { getRandomRequest, voteRequest } from '@/services/api/requests';
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

let rating = ref(0);

const getNewRequest = async () => {
  const request = await getRandomRequest();

  // TODO: If no more requests are available, prevent infinite loop and show error message.
  if (
    request.data.voters.includes(user._id) ||
    request.data._id === lastRequest.value._id
  ) {
    getNewRequest();
    return;
  }

  setLastRequest(request.data);
  setLastViewedArtist(request.data.artist);
  rating.value = request.data.rating;
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

  rating.value += payload.vote;

  await voteRequest(payload);
  setTimeout(async () => {
    await getNewRequest();
  }, 500);
};
</script>

<template>
  <div>
    <div m="b-3" flex="vcenter gap-8" justify="between sm:start">
      <div flex="vcenter gap-4">
        <ThumbsIcon @click="vote('up')" :orientation="'up'" />
        <p w="20px" text="3xl center gray-500">{{ rating }}</p>
        <ThumbsIcon @click="vote('down')" :orientation="'down'" />
      </div>

      <Button @click="getNewRequest" class="p-button-secondary">Skip</Button>
    </div>

    <RequestOverview v-if="lastRequest" :request="lastRequest" />
  </div>
</template>
