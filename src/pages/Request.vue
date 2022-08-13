<script lang="ts" setup>
import { useNotification } from '@/composables/useNotification';
import {
  deleteRequest,
  getRandomRequest,
  voteRequest,
} from '@/services/api/requests';
import { createSong } from '@/services/api/songs';
import { useRequestsStore } from '@/stores/requests';
import { useSongsStore } from '@/stores/songs';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const { setLastViewedArtist } = useSongsStore();
const { user } = useUserStore();
const userStore = useRequestsStore();
const { setLastRequest } = userStore;
const { lastRequest } = storeToRefs(userStore);

const {
  showNotification,
  showApprovedRequestNotication,
  showRejectedRequestNotication,
} = useNotification();

let rating = ref(0);

const getNewRequest = async () => {
  try {
    const fetchedRequest = await getRandomRequest({ userId: user?._id });

    const { request, numberOfAvailable } = fetchedRequest;

    if (numberOfAvailable === 1) {
      showNotification({
        title: 'Last unvoted request',
        message: 'This is the only one unvoted request.',
        type: 'info',
      });
    } else if (
      user !== null &&
      (request.voters.includes(user._id) ||
        request._id === lastRequest.value?._id ||
        request.author === user._id)
    ) {
      getNewRequest();
      return;
    }

    setLastRequest(request);
    setLastViewedArtist(request.artist);
    rating.value = request.rating;
  } catch (err) {
    console.error(err);
    showNotification({
      title: "Couldn't fetch request",
      message: 'You have rated all requests.',
      type: 'info',
    });
    setLastRequest(null);
  }
};

onBeforeMount(async () => {
  if (!lastRequest.value) {
    await getNewRequest();
  }
});

const vote = async (value: 'up' | 'down') => {
  if (lastRequest.value) {
    const payload = {
      requestId: lastRequest.value._id,
      voterId: user?._id || '',
      vote: value === 'up' ? 1 : -1,
    };

    rating.value += payload.vote;

    if (rating.value > 2) {
      await createSong(lastRequest.value);
      await deleteRequest(lastRequest.value._id);
      showApprovedRequestNotication();
    }

    if (rating.value < -2) {
      await deleteRequest(lastRequest.value._id);
      showRejectedRequestNotication();
    }

    try {
      await voteRequest(payload);
    } catch (err) {
      setLastRequest(null);
      console.error(err);
    }
    setTimeout(async () => {
      await getNewRequest();
    }, 500);
  }
};
</script>

<template>
  <div v-if="lastRequest">
    <div m="b-3" flex="vcenter gap-8" justify="between sm:start">
      <div flex="vcenter gap-4">
        <ThumbsIcon @click="vote('up')" :orientation="'up'" />
        <p w="20px" text="3xl center gray-500">{{ rating }}</p>
        <ThumbsIcon @click="vote('down')" :orientation="'down'" />
      </div>

      <Button variant="secondary" @click="getNewRequest" h="!36px">Skip</Button>
    </div>

    <RequestOverview :request="lastRequest" />
  </div>
  <div v-else>
    <!-- TODO: Add this as seperate component -->
    <p text="3xl center gray-500" pos="relative top-36vh">
      No unvoted requests available
    </p>
  </div>
</template>
