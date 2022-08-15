<script lang="ts" setup>
import { useNotification } from '@/composables/useNotification';
import messages from '@/i18n/translations';
import router from '@/router';
import {
  deleteRequest,
  getRandomRequest,
  voteRequest,
} from '@/services/api/requests';
import { createSong } from '@/services/api/songs';
import { getUser } from '@/services/api/user';
import { useRequestsStore } from '@/stores/requests';
import { useSongsStore } from '@/stores/songs';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const { setLastViewedArtist } = useSongsStore();
const { user, userId } = useUserStore();
const userStore = useRequestsStore();
const { setLastRequest } = userStore;
const { lastRequest } = storeToRefs(userStore);

const authorUsername = ref('');

type Language = 'en' | 'hr';
const lang = ref<Language>('hr');

const updateLanguage = () => {
  if (localStorage.getItem('lang')) {
    lang.value = localStorage.getItem('lang') as Language;
  }
};

onBeforeMount(async () => {
  updateLanguage();
});

watchEffect(async () => {
  updateLanguage();
  if (lastRequest.value?.author) {
    const userRes = await getUser(lastRequest.value.author);
    authorUsername.value = userRes.username || '';
  }
});

const translations = computed(() => messages[lang.value].requests);

const {
  showNotification,
  showApprovedRequestNotication,
  showRejectedRequestNotication,
} = useNotification();

let rating = ref(0);

const getNewRequest = async () => {
  try {
    const fetchedRequest = await getRandomRequest({ userId: userId || '' });

    const { request, numberOfAvailable } = fetchedRequest;

    if (numberOfAvailable === 0) {
      showNotification({
        title: translations.value.couldNotFetchRequests,
        message: translations.value.youRatedAllRequests,
        type: 'info',
      });
      setLastRequest(null);
      return;
    }

    if (numberOfAvailable === 1) {
      showNotification({
        title: translations.value.lastUnvotedRequest,
        message: translations.value.lastUnvotedRequestText,
        type: 'info',
      });
    } else if (
      user !== null &&
      (request.voters.includes(userId || '') ||
        request._id === lastRequest.value?._id ||
        request.author === userId)
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
      title: translations.value.error,
      message: translations.value.somethingWentWrong,
      type: 'info',
    });
    setLastRequest(null);
  }
};

onBeforeMount(async () => {
  if (!lastRequest.value) {
    await getNewRequest();
    return;
  }
  rating.value = lastRequest.value.rating;
});

const vote = async (value: 'up' | 'down') => {
  if (lastRequest.value) {
    const payload = {
      requestId: lastRequest.value._id,
      voterId: userId || '',
      vote: value === 'up' ? 1 : -1,
    };

    rating.value += payload.vote;

    if (rating.value > 2) {
      await createSong(lastRequest.value);
      await deleteRequest(lastRequest.value._id);
      showApprovedRequestNotication(lang.value);
    }

    if (rating.value < -2) {
      await deleteRequest(lastRequest.value._id);
      showRejectedRequestNotication(lang.value);
    }

    try {
      await voteRequest(payload);
    } catch (err) {
      console.error(err);
    }

    setTimeout(async () => {
      await getNewRequest();
    }, 500);
  }
};

const goToAuthorProfile = () => {
  router.push(`/profile/${lastRequest.value?.author}`);
};
</script>

<template>
  <div v-if="lastRequest">
    <div flex="~ gap-1.5 wrap" justify="between">
      <div m="b-3" flex="vcenter gap-2 sm:gap-8" justify="between sm:start">
        <div flex="vcenter gap-4">
          <ThumbsIcon @click="vote('up')" :orientation="'up'" />
          <p w="20px" text="3xl center gray-500">{{ rating }}</p>
          <ThumbsIcon @click="vote('down')" :orientation="'down'" />
        </div>

        <Button variant="secondary" @click="getNewRequest" h="!36px">{{
          $t('requests.skip')
        }}</Button>
      </div>

      <p text="gray-400 right" leading="4.5" m="b-4">
        {{ $t('chords.by') }}
        <span
          text="primary-400 hover:primary-500"
          font="600"
          cursor="pointer"
          class="transition-default"
          @click="goToAuthorProfile"
          >{{ authorUsername }}</span
        >
      </p>
    </div>

    <RequestOverview :request="lastRequest" />
  </div>
  <div v-else>
    <p text="3xl center gray-500" pos="relative top-36vh">
      {{ $t('requests.noRequests') }}
    </p>
  </div>
</template>
