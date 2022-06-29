<script setup lang="ts">
import { QuillEditor } from '@vueup/vue-quill';

interface Props {
  readOnly?: boolean;
  content?: string;
}

const props = defineProps<Props>();

const options = {
  formats: ['bold', 'color'],
  modules: {
    toolbar: ['bold', { color: ['#000', '#689f38'] }],
    clipboard: {
      matchVisual: false,
    },
  },
};

const editor = ref(null);

onMounted(() => {
  editor.value.setHTML(props.content || '');
});
</script>

<template>
  <QuillEditor
    ref="editor"
    :theme="readOnly ? 'bubble' : 'snow'"
    :placeholder="readOnly ? '' : 'Add chords content here...'"
    :options="options"
    :read-only="readOnly"
    :spellcheck="false"
    text="!base sm:!lg"
    @text-change="$emit('text-change', editor.getHTML())"
    :class="readOnly ? 'remove-padding' : 'bg-white'"
  />
</template>

<style lang="scss">
.ql-toolbar.ql-snow {
  background: #f0f2f4;
}

.remove-padding {
  .ql-editor {
    padding: 0 !important;

    p {
      cursor: inherit !important;
    }
  }
}

strong {
  font-weight: 600 !important;
}
</style>
