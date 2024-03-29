<script lang="ts" setup>
import { useNotification } from '@/composables/useNotification';
import messages from '@/i18n/translations';
import type Advert from '@/models/advert.model';
import router from '@/router';
import { deleteAdvertById, getAdvertById } from '@/services/api/adverts';
import { useUserStore } from '@/stores/user';
import { useRoute } from 'vue-router';

const { showNotification } = useNotification();
const { userId } = useUserStore();
const route = useRoute();

const editor = ref<any>();
const advert = ref<Advert>();

type Language = 'en' | 'hr' | 'de';

onBeforeMount(async () => {
  try {
    advert.value = await getAdvertById(route.params.id as string);
  } catch (error) {
    console.error(error);

    const lang = localStorage.getItem('lang') as Language;
    showNotification({
      title: messages[lang].notifications.advertNotFoundTitle,
      message: messages[lang].notifications.advertNotFoundText,
      type: 'error',
    });
    setTimeout(() => {
      router.go(-1);
    }, 1500);
  }
});

onMounted(() => {
  if (editor.value && advert.value) {
    editor.value.setHTML(advert.value.content || '');
  }
});

watchEffect(() => {
  if (advert.value) {
    editor.value.setHTML(advert.value.content || '');
  }
});

const isCurrentUserAuthor = computed(() => {
  return advert.value ? advert.value.authorId === userId : false;
});

const advertTitle = computed(() => {
  return advert.value?.title || '';
});

const deleteAdvert = async () => {
  try {
    await deleteAdvertById(route.params.id as string);
    const lang = localStorage.getItem('lang') as Language;
    showNotification({
      title: messages[lang].notifications.advertDeletedTitle,
      message: messages[lang].notifications.advertDeletedText,
      type: 'success',
    });
    router.push('/');
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <div class="container">
    <div flex="vcenter gap-4" justify="between" m="b-4">
      <div text="3xl gray-800" font="600" leading="8">
        {{ advertTitle }}
      </div>
      <Button
        v-if="isCurrentUserAuthor"
        @click="deleteAdvert"
        variant="primary"
        h="!40px"
        >Delete advert</Button
      >
    </div>
    <QuillEditor ref="editor" theme="bubble" read-only class="no-padding" />
    <p flex="vcenter gap-1.5" justify="end" text="right gray-600" m="t-4">
      {{ $t('advert.author') }}:
      <Link
        v-if="advert"
        :to="`/profile/${advert.authorId}`"
        class="font-500 text-primary-500 hover:text-primary-700"
        >{{ advert.authorUsername }}</Link
      >
    </p>
  </div>
</template>

<style lang="scss">
.no-padding {
  .ql-editor {
    padding: 0 !important;
    height: fit-content !important;
  }

  .ql-blank {
    height: fit-content !important;
  }
}
</style>
