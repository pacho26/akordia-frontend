<script lang="ts" setup>
import { ElNotification } from 'element-plus';
import { get } from '@vueuse/core';
import { useNotification } from '@/composables/useNotification';
import { useLoginForm } from '@/composables/form/useLoginForm';
import { usePasswordVisibility } from '@/composables/form/usePasswordVisibility';
import type { FormInstance } from '@/models/element.model';
// import { useIconStore } from '@/store/icons';
// import { storeToRefs } from 'pinia';

const formRef = ref<FormInstance | null>(null);

const router = useRouter();
// const { inputIconSize, iconWeight } = storeToRefs(useIconStore());
const { visible, toggleVisiblity } = usePasswordVisibility();

const { form, rules, error, onSubmit } = useLoginForm();
const { showLoginError } = useNotification();

const submitForm = () =>
  onSubmit(
    get(formRef),
    () => {
      ElNotification.closeAll();
      router.replace('/');
    },
    () => showLoginError(error.value)
  );
</script>

<template>
  <el-form
    ref="formRef"
    label-position="top"
    :model="form"
    :rules="rules"
    label-width="120px"
    class="max-w-[400px]"
    size="large"
    @submit.prevent="submitForm"
  >
    <el-form-item label="Email" prop="email">
      <el-input v-model="form.email" type="text">
        <template #prefix>
          <i text="base" class="fa-solid fa-envelope" />
        </template>
      </el-input>
    </el-form-item>
    <el-form-item label="Password" prop="password">
      <el-input v-model="form.password" :type="visible ? 'text' : 'password'">
        <template #prefix>
          <div @click.stop="toggleVisiblity" cursor="pointer">
            <div v-if="visible">
              <i text="base" class="fa-solid fa-eye" />
            </div>
            <div v-else class="-translate-x-0.25">
              <i text="base" class="fa-solid fa-eye-slash" />
            </div>
          </div>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" native-type="submit">Login</el-button>
      <el-button native-type="button" @click="router.push('/register')">
        Register
      </el-button>
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped>
.fa-eye,
.fa-eye-slash {
  transform: translateY(1px);
}
</style>
