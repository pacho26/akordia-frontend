<script lang="ts" setup>
// TODO: Replace with real value
const isAuthor = true;

const options = {
  formats: ['bold', 'color'],
  modules: {
    toolbar: ['bold', { color: ['#000', '#689f38'] }],
    clipboard: {
      matchVisual: false,
    },
  },
};
</script>

<template>
  <div>
    <h1>Song title</h1>
    <h2>Artist name</h2>
  </div>
  <div>
    <QuillEditor
      text="!base sm:!lg"
      :theme="isAuthor ? 'snow' : 'bubble'"
      :placeholder="isAuthor ? 'Add your chords content here...' : ''"
      :options="options"
      spellcheck="false"
      :read-only="!isAuthor"
      :class="isAuthor ? 'bg-white' : 'remove-padding'"
    />
  </div>
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
</style>
