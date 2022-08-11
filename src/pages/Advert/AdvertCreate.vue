<script lang="ts" setup>
import { useNotification } from '@/composables/useNotification';
import router from '@/router';
import { createAdvert } from '@/services/api/adverts';
import { useUserStore } from '@/stores/user';

const { userId, username } = useUserStore();

const title = ref('');
const content = ref('');

const save = async () => {
  const { showNotification } = useNotification();

  const payload = {
    title: title.value,
    content: content.value,
    authorId: userId as string,
    authorUsername: username as string,
  };

  console.log('payload :>> ', payload);

  try {
    await createAdvert(payload);
    showNotification({
      title: 'Advert created!',
      message: 'Advert successfully created.',
      type: 'success',
    });
    router.push('/');
  } catch (error) {
    console.log('error :>> ', error);
    showNotification({
      title: 'Error!',
      message: 'Something went wrong.',
      type: 'error',
    });
  }
};

const updateContent = (newContent: string) => {
  content.value = newContent;
};
</script>

<template>
  <div>
    <el-form-item
      label="Title"
      prop="title"
      text="2xl"
      font="500"
      flex="vcenter"
      m="!b-8"
    >
      <el-input
        v-model="title"
        type="text"
        size="large"
        placeholder="e.g. Heavy metal band is looking for a drummer"
      />
    </el-form-item>
    <AdvertRichTextEditor @change="updateContent" :content="content" />
    <div flex="vcenter gap-4" justify="end" m="t-4">
      <Link to="/">
        <Button variant="secondary">Discard</Button>
      </Link>
      <Button variant="primary" @click="save">Save</Button>
    </div>
  </div>
</template>
