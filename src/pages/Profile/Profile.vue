<script lang="ts" setup>
import router from '@/router';
import { useSongsStore } from '@/stores/songs';
import { useUserStore } from '@/stores/user';
import Button from '../../components/Base/Button.vue';
import ProfileSection from './ProfileSection.vue';
import AccordionImg from '@/assets/img/instruments/accordion.png';
import BassGuitarImg from '@/assets/img/instruments/bass-guitar.png';
import DrumsImg from '@/assets/img/instruments/bass_drum.png';
import GuitarImg from '@/assets/img/instruments/guitar.png';
import PianoImg from '@/assets/img/instruments/piano.png';
import SaxophoneImg from '@/assets/img/instruments/saxophone.png';

const { user } = useUserStore();
const { userSongs } = useSongsStore();

const numberOfSongs = userSongs.length;

const goToProfileEditPage = () => {
  router.push(`/profile/edit`);
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
  <div v-if="user">
    <div flex="~ gap-2 wrap" justify="between">
      <div
        v-if="user?.role === 'admin'"
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
        flex="~ gap-1.5"
        items="center"
        cursor="pointer"
        select="none"
        text="gray-700 !hover:primary-400"
        transition="default"
      >
        <i text="2xl" class="fa-solid fa-at translate-y-0.25" />
        <div text="3xl leading-6.5 sm:(text-3xl leading-8)" font="bold">
          {{ user.username }}
        </div>
      </div>
      <Button @click="goToProfileEditPage" variant="secondary">Edit</Button>
    </div>

    <ProfileSection
      title="Email"
      :content="user.email"
      icon="envelope"
      m="t-8"
    />
    <ProfileSection
      title="Songs posted"
      :content="numberOfSongs.toString()"
      icon="pen"
      m="t-4 sm:t-5"
    />
    <ProfileSection
      v-if="user?.location"
      title="Location"
      :content="user.location"
      icon="location-dot"
      m="t-4 sm:t-5"
    />
    <ProfileSection
      v-if="user?.contact"
      title="Contact"
      :content="user.contact"
      icon="address-card"
      m="t-3 sm:t-5"
    />
    <ProfileSection
      v-if="user?.band"
      title="Band"
      :content="user.band"
      icon="people-group"
      m="t-3 sm:t-5"
    />
    <ProfileSection
      v-if="user?.instruments?.length"
      title="Instrument(s)"
      icon="people-group"
      m="t-3 sm:t-5"
    >
      <div
        v-for="instrument in user.instruments"
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
