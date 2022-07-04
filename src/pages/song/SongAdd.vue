<script lang="ts" setup>
import { useCreateSongForm } from '@/composables/form/useCreateSongForm';
import type { SubmitFormArgs } from '@/models';
import { SongAction } from '@/models/song.model';
import { get } from '@vueuse/core';

const { songModel, onSubmit, rules } = useCreateSongForm();

const submitForm = ({ formRef, form }: SubmitFormArgs) => {
  onSubmit(form, get(formRef), '/my-songbook');
};
</script>

<template>
  <SongForm
    :action="SongAction.CREATE"
    submit-msg="Add song"
    :rules="rules"
    :model="songModel"
    @submit="submitForm"
  />
</template>
