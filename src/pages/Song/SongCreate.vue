<script lang="ts" setup>
import { useCreateRequestForm } from '@/composables/form/useCreateRequestForm';
import type { SubmitFormArgs } from '@/models';
import { SongAction } from '@/models/song.model';
import { get } from '@vueuse/core';

const { requestModel, onSubmit, rules } = useCreateRequestForm();

const submitForm = ({ formRef, form }: SubmitFormArgs) => {
  onSubmit(form, get(formRef), '/');
};
</script>

<template>
  <SongForm
    :action="SongAction.CREATE"
    :submit-msg="$t('chords.makeRequest')"
    :rules="rules"
    :model="requestModel"
    @submit="submitForm"
  />
</template>
