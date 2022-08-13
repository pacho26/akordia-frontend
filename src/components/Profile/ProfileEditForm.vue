<script lang="ts" setup>
import AccordionImg from '@/assets/img/instruments/accordion.png';
import BassGuitarImg from '@/assets/img/instruments/bass-guitar.png';
import DrumsImg from '@/assets/img/instruments/bass_drum.png';
import GuitarImg from '@/assets/img/instruments/guitar.png';
import PianoImg from '@/assets/img/instruments/piano.png';
import SaxophoneImg from '@/assets/img/instruments/saxophone.png';
import { useNotification } from '@/composables/useNotification';
import router from '@/router/index.js';
import { updateUser } from '@/services/api/user';
import { useUserStore } from '@/stores/user';
import { useRoute } from 'vue-router';

const { user, userId, setUser } = useUserStore();
const route = useRoute();
const { showNotification } = useNotification();

const form = ref({
  band: user?.band || '',
  location: user?.location || '',
  contact: user?.contact || '',
  instruments: user?.instruments || [],
});

const instruments = [
  'Accordion',
  'Bass guitar',
  'Drums',
  'Guitar',
  'Piano',
  'Saxophone',
  'Other',
];

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

onBeforeMount(() => {
  if (userId !== route.params.id) {
    showNotification({
      title: 'Unauthorized',
      message: 'You cannot change other users profile',
      type: 'warning',
    });
    router.push({ name: 'home' });
  }
});

const goToProfilePage = () => {
  router.push(`/profile/${userId}`);
};

const save = async () => {
  if (userId) {
    const userUpdated = await updateUser(userId, form.value);
    setUser(userUpdated);
    goToProfilePage();
    showNotification({
      title: 'Profile updated',
      message: 'Your profile has been updated successfully',
      type: 'success',
    });
  } else {
    showNotification({
      title: 'Error',
      message: 'You have to be logged in to edit your profile.',
      type: 'error',
    });
  }
};
</script>

<template>
  <el-form
    ref="formRef"
    label-position="top"
    :model="form"
    size="large"
    @submit.prevent=""
  >
    <el-form-item label="Band" prop="band">
      <el-input v-model="form.band" type="text">
        <template #prefix>
          <i text="base" class="fa-solid fa-people-group" />
        </template>
      </el-input>
    </el-form-item>

    <el-form-item label="Location" prop="location">
      <el-input v-model="form.location" type="text">
        <template #prefix>
          <i text="base" class="fa-solid fa-location-dot" />
        </template>
      </el-input>
    </el-form-item>

    <el-form-item label="Contact" prop="contact">
      <el-input v-model="form.contact" type="text">
        <template #prefix>
          <i text="base" class="fa-solid fa-address-card" />
        </template>
      </el-input>
    </el-form-item>

    <div m="b-3" leading="5.5" text="#606266 sm">Instrument(s)</div>
    <el-checkbox-group v-model="form.instruments" size="large">
      <el-checkbox-button
        v-for="instrument in instruments"
        :key="instrument"
        :label="instrument"
      >
        <div flex="vcenter gap-2" min-h="50px">
          <img
            v-if="instrument !== 'Other'"
            :src="getInstrumentImg(instrument)"
            alt="Accordion"
          />
          <p>{{ instrument }}</p>
        </div>
      </el-checkbox-button>
    </el-checkbox-group>

    <el-form-item m="t-12">
      <Button @click="save" variant="primary" native-type="submit">Save</Button>
      <Button @click="goToProfilePage" variant="secondary" native-type="button">
        Discard changes</Button
      >
    </el-form-item>
  </el-form>
</template>

<style lang="scss">
.el-checkbox-button__inner {
  &:hover {
    color: #495dc6 !important;
  }

  &:after {
    border-color: red !important;
  }
}

.el-checkbox-button.is-checked .el-checkbox-button__inner {
  color: white !important;
  background-color: #758ce0 !important;
  border-color: #758ce0 !important;
  box-shadow: none !important;
}

.el-checkbox-button--large .el-checkbox-button__inner {
  padding: 0 12px !important;
}
</style>
