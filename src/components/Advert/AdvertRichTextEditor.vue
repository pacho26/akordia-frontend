<script lang="ts" setup>
interface Props {
  readOnly?: boolean;
  content?: string;
}

const props = defineProps<Props>();

const emits = defineEmits(['change']);

const editor = ref<any>();

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
    :placeholder="$t('advert.placeholderContentText')"
    :spellcheck="false"
    text="!base sm:!lg"
    bg="white"
    @text-change="emitChange"
  />
</template>
