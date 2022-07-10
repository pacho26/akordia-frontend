<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { useSong } from '@/composables/api/songs';
import { useEditSongForm } from '@/composables/form/useEditSongForm';
import { SongAction } from '@/models/song.model';
import type { SubmitFormArgs } from '@/models';
import { get } from '@vueuse/core';

const route = useRoute();

const { fetchSong, song } = useSong();

const songId = computed(() => route.params.id as string);

const { songModel, rules, onSubmit, fillSongModel } = useEditSongForm();

watchEffect(async () => {
  if (songId.value) {
    await fetchSong(songId.value);
    if (song.value) {
      fillSongModel(song.value);
    }
  }
});

const submitForm = ({ formRef, form }: SubmitFormArgs) => {
  onSubmit(songId.value, form, get(formRef), `/song/${songId.value}`);
};
</script>

<template>
  <SongForm
    :song="song"
    submit-msg="Edit song"
    :action="SongAction.EDIT"
    :model="songModel"
    :rules="rules"
    @submit="submitForm"
  />
</template>
