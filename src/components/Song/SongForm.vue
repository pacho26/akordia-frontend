<script lang="ts" setup>
import type { FormInstance } from '@/models/element.model';
import type { Song, SongAction, SongCreate } from '@/models/song.model';

const props = defineProps<{
  action: SongAction;
  rules: object;
  model: SongCreate;
  submitMsg: string;
  song?: Song;
}>();
const emits = defineEmits(['submit', 'error']);
const router = useRouter();

const form = reactive(props.model);
const formRef = ref<FormInstance | null>(null);

const emitSubmit = () => {
  emits('submit', { formRef, form });
};

const updateContent = (newContent: string) => {
  form.content = newContent;
  isPressedSubmitBtn.value = false;
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
</script>

<template>
  <el-form
    ref="formRef"
    label-position="top"
    :model="form"
    :rules="rules"
    size="large"
    @submit.prevent="emitSubmit"
  >
    <div>
      <el-form-item :label="$t('chords.title')" prop="title">
        <el-input v-model="form.title" type="text">
          <template #prefix>
            <i text="base" class="fa-solid fa-music" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item
        :label="$t('chords.alternativeTitle')"
        prop="alternativeTitle"
      >
        <el-input v-model="form.alternativeTitle" type="text">
          <template #prefix>
            <i text="base" class="fa-solid fa-music" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('chords.artist')" prop="artist">
        <el-input v-model="form.artist" type="text">
          <template #prefix>
            <i text="base" class="fa-solid fa-microphone" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('chords.youtubeId')" prop="youtubeId">
        <el-input v-model="form.youtubeId" type="text">
          <template #prefix>
            <i text="base" class="fa-brands fa-youtube" />
          </template>
        </el-input>
      </el-form-item>
    </div>

    <div m="t-8" text="sm">
      <div m="b-3" flex="~">
        <div m="r-1" text="#f56c6c">*</div>
        <div text="#606266">{{ $t('chords.content') }}</div>
      </div>
      <RichTextEditor
        @blur="onEditorBlur"
        @change="updateContent"
        :content="form.content"
      />
      <div p="t-1" text="xs red" :class="{ 'opacity-0': !hasEditorErrorMsg }">
        {{ $t('chords.pleaseEnterContent') }}
      </div>
    </div>

    <el-form-item m="t-8">
      <Button
        variant="primary"
        native-type="submit"
        @click="isPressedSubmitBtn = true"
      >
        {{ submitMsg }}
      </Button>
      <Button variant="secondary" @click="router.back()">
        {{ $t('chords.cancel') }}
      </Button>
    </el-form-item>
  </el-form>
</template>
