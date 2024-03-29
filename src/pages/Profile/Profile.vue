<script lang="ts" setup>
import AccordionImg from '@/assets/img/instruments/accordion.png';
import BassGuitarImg from '@/assets/img/instruments/bass-guitar.png';
import DrumsImg from '@/assets/img/instruments/bass_drum.png';
import GuitarImg from '@/assets/img/instruments/guitar.png';
import PianoImg from '@/assets/img/instruments/piano.png';
import SaxophoneImg from '@/assets/img/instruments/saxophone.png';
import { useNotification } from '@/composables/useNotification';
import messages from '@/i18n/translations';
import type { User } from '@/models/user.model';
import router from '@/router';
import { getUser } from '@/services/api/user';
import { useUserStore } from '@/stores/user';
import { useRoute } from 'vue-router';
import ProfileSection from './ProfileSection.vue';

const route = useRoute();
const { userId } = useUserStore();

const selectedUser = ref<User | null>();

type Language = 'en' | 'hr' | 'de';

const updateUserDetails = async () => {
  try {
    const userRes = await getUser(route.params.id as string);
    selectedUser.value = userRes;
  } catch (err) {
    const { showNotification } = useNotification();
    const lang = localStorage.getItem('lang') as Language;
    showNotification({
      title: messages[lang].notifications.userNotFoundTitle,
      message: messages[lang].notifications.userNotFoundText,
      type: 'warning',
    });
    router.push({ name: 'home' });
  }
};

watchEffect(() => {
  if (route.fullPath.includes('profile') && route.params.id) {
    updateUserDetails();
  }
});

const goToProfileEditPage = () => {
  router.push(`${route.fullPath}/edit`);
};

// TODO: On similar way add croatian instruments names
const getInstrumentImg = (instrument: string) => {
  switch (instrument) {
    case 'Accordion':
      return AccordionImg;
    case 'Bass guitar':
      return BassGuitarImg;
    case 'Drums':
      return DrumsImg;
    case 'Guitar':
      return GuitarImg;
    case 'Piano':
      return PianoImg;
    case 'Saxophone':
      return SaxophoneImg;
    default:
      return '';
  }
};

const getInstrumentName = (instrument: string) => {
  const lang = localStorage.getItem('lang') as Language;
  const { instruments } = messages[lang];

  switch (instrument) {
    case 'Accordion':
      return instruments.accordion;
    case 'Bass guitar':
      return instruments.bassGuitar;
    case 'Drums':
      return instruments.drums;
    case 'Guitar':
      return instruments.guitar;
    case 'Other':
      return instruments.other;
    case 'Piano':
      return instruments.piano;
    case 'Saxophone':
      return instruments.saxophone;
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
          cursor="pointer"
          select="none"
          class="uppercase transition-default"
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
          class="transition-default"
        >
          <i text="2xl" class="fa-solid fa-at translate-y-0.25" />
          <div text="3xl leading-6.5 sm:(text-3xl leading-8)" font="bold">
            {{ selectedUser.username }}
          </div>
        </div>
      </div>
      <Button
        v-if="selectedUser._id === userId"
        @click="goToProfileEditPage"
        variant="secondary"
        h="!fit"
        >{{ $t('profile.edit') }}</Button
      >
    </div>

    <ProfileSection :title="$t('profile.email')" icon="envelope" m="t-4">
      <a
        :href="`mailto:${selectedUser.email}`"
        class="text-gray-600 no-underline transition-default hover:text-primary-400"
      >
        {{ selectedUser.email }}
      </a>
    </ProfileSection>
    <ProfileSection
      v-if="selectedUser?.location"
      :title="$t('profile.location')"
      :content="selectedUser.location"
      icon="location-dot"
      m="t-4 sm:t-5.5"
    />
    <ProfileSection
      v-if="selectedUser?.contact"
      :title="$t('profile.contact')"
      icon="address-card"
      m="t-4 sm:t-5.5"
    >
      <a
        :href="`tel:${selectedUser.contact}`"
        class="text-gray-600 no-underline transition-default hover:text-primary-400"
      >
        {{ selectedUser.contact }}
      </a>
    </ProfileSection>
    <ProfileSection
      v-if="selectedUser?.band"
      :title="$t('profile.band')"
      :content="selectedUser.band"
      icon="people-group"
      m="t-4 sm:t-5.5"
    />
    <ProfileSection
      v-if="selectedUser?.instruments?.length"
      :title="$t('profile.instruments')"
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
        <p>{{ getInstrumentName(instrument) }}</p>
      </div>
    </ProfileSection>
    <ProfileSection
      :title="$t('profile.numberOfChords')"
      :content="selectedUser.numberOfSongs.toString()"
      icon="pen"
      m="t-4 sm:t-5.5"
    />
    <ProfileSection
      :title="$t('profile.numberOfVotes')"
      :content="selectedUser.numberOfVotes.toString()"
      icon="star"
      m="t-4 sm:t-5.5"
    />
  </div>
</template>
