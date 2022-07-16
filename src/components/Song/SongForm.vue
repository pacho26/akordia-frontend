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

const emitSubmit = () => emits('submit', { formRef, form });

const updateContent = (content: string) => {
  form.content = content;
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
      <el-form-item label="Title" prop="title">
        <el-input v-model="form.title" type="text">
          <template #prefix>
            <i text="base" class="fa-solid fa-music" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="Alternative title" prop="alternativeTitle">
        <el-input v-model="form.alternativeTitle" type="text">
          <template #prefix>
            <i text="base" class="fa-solid fa-music" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="Artist" prop="artist">
        <el-input v-model="form.artist" type="text">
          <template #prefix>
            <i text="base" class="fa-solid fa-microphone" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="Youtube ID" prop="youtubeId">
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
        <div text="#606266">Content</div>
      </div>
      <RichTextEditor
        @blur="onEditorBlur"
        @change="updateContent"
        :content="form.content"
      />
      <div v-if="hasEditorErrorMsg" p="t-1" text="xs red">
        Please enter the content
      </div>
    </div>

    <el-form-item m="t-8">
      <el-button
        type="primary"
        native-type="submit"
        @click="isPressedSubmitBtn = true"
      >
        {{ submitMsg }}
      </el-button>
      <el-button plain native-type="button" @click="router.back()">
        Cancel
      </el-button>
    </el-form-item>
  </el-form>
</template>
