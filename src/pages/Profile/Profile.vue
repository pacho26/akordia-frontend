<script lang="ts" setup>
import AccordionImg from '@/assets/img/instruments/accordion.png';
import BassGuitarImg from '@/assets/img/instruments/bass-guitar.png';
import DrumsImg from '@/assets/img/instruments/bass_drum.png';
import GuitarImg from '@/assets/img/instruments/guitar.png';
import PianoImg from '@/assets/img/instruments/piano.png';
import SaxophoneImg from '@/assets/img/instruments/saxophone.png';
import { useNotification } from '@/composables/useNotification';
import router from '@/router';
import { getSongsByUserId } from '@/services/api/songs';
import { getUser } from '@/services/api/user';
import { useUserStore } from '@/stores/user';
import { useRoute } from 'vue-router';
import Button from '../../components/Base/Button.vue';
import ProfileSection from './ProfileSection.vue';

const route = useRoute();
const { user, userId } = useUserStore();

const selectedUser: any = ref(null);

const numberOfSongs = ref(0);

const updateUserDetails = async () => {
  if (userId === route.params.id) {
    selectedUser.value = user;
  } else {
    try {
      const userRes = await getUser(route.params.id as string);
      selectedUser.value = userRes.data;
    } catch (err) {
      const { showNotification } = useNotification();
      showNotification({
        title: 'User not found',
        type: 'warning',
        message: 'There is no user with the specified id.',
      });
      router.push({ name: 'home' });
    }
  }
  const fetchedSongs = await getSongsByUserId(selectedUser.value._id);
  numberOfSongs.value = fetchedSongs.data.length;
};

watchEffect(() => {
  if (route.fullPath.includes('profile') && route.params.id) {
    updateUserDetails();
  }
});

const goToProfileEditPage = () => {
  router.push(`${route.fullPath}/edit`);
};

const getInstrumentImg = (instrument: string) => {
  switch (instrument) {
    case 'Accordion':
      return AccordionImg;
    case 'Bass guitar':
      return BassGuitarImg;
    case 'Guitar':
      return GuitarImg;
    case 'Piano':
      return PianoImg;
    case 'Drums':
      return DrumsImg;
    case 'Saxophone':
      return SaxophoneImg;
    default:
      return '';
  }
};
</script>

<template>
  <div v-if="selectedUser">
    <div flex="~ gap-2 wrap" justify="between" border="b-1 gray-300" p="b-4">
      <div>
        <div
          v-if="selectedUser?.role === 'admin'"
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
          <div>{{ selectedUser.role }}</div>
        </div>
        <div
          flex="~ gap-1.5"
          items="center"
          cursor="pointer"
          select="none"
          text="gray-700 !hover:primary-400"
          transition="default"
        >
          <i text="2xl" class="fa-solid fa-at translate-y-0.25" />
          <div text="3xl leading-6.5 sm:(text-3xl leading-8)" font="bold">
            {{ selectedUser.username }}
          </div>
        </div>
      </div>
      <Button @click="goToProfileEditPage" variant="secondary" h="!fit"
        >Edit</Button
      >
    </div>

    <ProfileSection
      title="Email"
      :content="selectedUser.email"
      icon="envelope"
      m="t-4"
    />
    <ProfileSection
      title="Songs posted"
      :content="numberOfSongs.toString()"
      icon="pen"
      m="t-4 sm:t-5.5"
    />
    <ProfileSection
      v-if="selectedUser?.location"
      title="Location"
      :content="selectedUser.location"
      icon="location-dot"
      m="t-4 sm:t-5.5"
    />
    <ProfileSection
      v-if="selectedUser?.contact"
      title="Contact"
      :content="selectedUser.contact"
      icon="address-card"
      m="t-4 sm:t-5.5"
    />
    <ProfileSection
      v-if="selectedUser?.band"
      title="Band"
      :content="selectedUser.band"
      icon="people-group"
      m="t-4 sm:t-5.5"
    />
    <ProfileSection
      v-if="selectedUser?.instruments?.length"
      title="Instrument(s)"
      icon="people-group"
      m="t-4 sm:t-5.5"
    >
      <div
        v-for="instrument in selectedUser.instruments"
        :key="instrument"
        flex="vcenter gap-2"
        m="t-2"
      >
        <img
          v-if="instrument !== 'Other'"
          :src="getInstrumentImg(instrument)"
          alt="Accordion"
        />
        <p>{{ instrument }}</p>
      </div>
    </ProfileSection>
  </div>
</template>
