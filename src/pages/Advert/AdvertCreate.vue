<script lang="ts" setup>
import { useCreateAdvertForm } from '@/composables/form/useCreateAdvertForm';
import type { FormInstance } from '@/models/element.model';
import { get } from '@vueuse/core';

const { advertModel, onSubmit, rules } = useCreateAdvertForm();

const form = reactive(advertModel);
const formRef = ref<FormInstance | null>(null);

const save = async () => {
  onSubmit(form, get(formRef));
};

const isEditorBlurred = ref(false);
const isPressedSubmitBtn = ref(false);

const onEditorBlur = () => {
  isEditorBlurred.value = true;
};

const hasEditorErrorMsg = computed(() => {
  return (
    ((!form.content || form.content === '<p><br></p>') &&
      isEditorBlurred.value) ||
    isPressedSubmitBtn.value
  );
});

const updateContent = (newContent: string) => {
  form.content = newContent;
  isPressedSubmitBtn.value = false;
};
</script>

<template>
  <el-form
    ref="formRef"
    label-position="top"
    :model="form"
    :rules="rules"
    size="large"
    @submit.prevent="save"
  >
    <el-form-item
      label="Title"
      prop="title"
      text="2xl"
      font="500"
      flex="vcenter"
      m="!b-8"
    >
      <el-input
        v-model="form.title"
        type="text"
        size="large"
        :placeholder="$t('advert.placeholderTitleText')"
      />
    </el-form-item>
    <AdvertRichTextEditor
      @change="updateContent"
      @blur="onEditorBlur"
      :content="form.content"
    />
    <div p="t-1" text="xs red" :class="{ 'opacity-0': !hasEditorErrorMsg }">
      {{ $t('advert.pleaseEnterContent') }}
    </div>
    <div flex="vcenter gap-4" justify="end" m="t-4">
      <Link to="/">
        <Button variant="secondary">{{ $t('advert.discard') }}</Button>
      </Link>
      <Button variant="primary" @click="save">{{
        $t('advert.publish')
      }}</Button>
    </div>
  </el-form>
</template>
