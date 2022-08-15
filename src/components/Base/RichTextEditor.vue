<script setup lang="ts">
import { QuillEditor } from '@vueup/vue-quill';

interface Props {
  readOnly?: boolean;
  content?: string;
}

const props = defineProps<Props>();

const emits = defineEmits(['change']);

const router = useRouter();

const options = {
  formats: ['bold', 'color'],
  modules: {
    toolbar: ['bold', { color: ['#000', '#495dc6'] }],
    clipboard: {
      matchVisual: false,
    },
  },
};

const editor = ref<any>();

let isEditorSet = false;

const isCreateRoute = router.currentRoute.value.path.split('/')[2] === 'new';

watchEffect(() => {
  if (props.content && !isEditorSet && !isCreateRoute && editor.value) {
    editor.value.setHTML(props.content);
    isEditorSet = true;
  }
});

onMounted(() => {
  editor.value.setHTML(props.content || '');
});

const emitChange = () => {
  emits('change', editor.value.getHTML());
};
</script>

<template>
  <QuillEditor
    ref="editor"
    :theme="readOnly ? 'bubble' : 'snow'"
    :placeholder="readOnly ? '' : `${$t('chords.addChordsHere')}...`"
    :options="options"
    :read-only="readOnly"
    :spellcheck="false"
    text="!base sm:!lg"
    @text-change="emitChange"
    :class="readOnly ? 'read-only' : 'bg-white'"
  />
</template>

<style lang="scss">
.ql-toolbar.ql-snow {
  background: #f0f2f4;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.ql-container {
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}

.read-only {
  .ql-editor {
    padding: 0 !important;
    line-height: 1.5;

    p {
      cursor: inherit !important;
    }
  }
}

strong {
  font-weight: 600 !important;
}
</style>
