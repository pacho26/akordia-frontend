<script lang="ts" setup>
import type SongModel from '@/models/song';

interface Props {
  song?: SongModel;
}

const props = defineProps<Props>();

const formData: SongModel = {
  id: '',
  title: '',
  alternativeTitle: '',
  artist: '',
  youtubeId: '',
  content: '',
};

onBeforeMount(() => {
  if (props?.song) {
    Object.keys(props.song).forEach((key) => {
      if (key in formData) {
        formData[key] = props.song[key];
      }
    });
  }
});

const print = () => {
  console.log(formData.content);
};
</script>

<template>
  <div m="t-12" flex="~ col gap-9 sm:row">
    <div class="p-float-label">
      <InputText id="inputtext" type="text" v-model="formData.title" w="full" />
      <label for="inputtext">Title*</label>
    </div>

    <div class="p-float-label">
      <InputText
        id="inputtext"
        type="text"
        v-model="formData.artist"
        w="full"
      />
      <label for="inputtext">Artist*</label>
    </div>

    <div class="p-float-label">
      <InputText
        id="inputtext"
        type="text"
        v-model="formData.alternativeTitle"
        w="full"
      />
      <label for="inputtext">Alternative name</label>
    </div>

    <div class="p-float-label">
      <InputText
        id="inputtext"
        type="text"
        v-model="formData.youtubeId"
        w="full"
      />
      <label for="inputtext">Youtube video ID</label>
    </div>
  </div>

  <div m="t-8">
    <RichTextEditor :content="formData.content" />
  </div>

  <Button
    @click="print"
    label="Save"
    float="right"
    m="!t-8"
    class="p-button-success"
  />
</template>
