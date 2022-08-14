<script lang="ts" setup>
import { useLoginForm } from '@/composables/form/useLoginForm';
import { usePasswordVisibility } from '@/composables/form/usePasswordVisibility';
import { useNotification } from '@/composables/useNotification';
import type { FormInstance } from '@/models/element.model';
import { get } from '@vueuse/core';
import { ElNotification } from 'element-plus';

const formRef = ref<FormInstance | null>(null);

const router = useRouter();
const { visible, toggleVisiblity } = usePasswordVisibility();

const { form, rules, onSubmit } = useLoginForm();
const { showLoginError } = useNotification();

const submitForm = () =>
  onSubmit(
    get(formRef),
    () => {
      ElNotification.closeAll();
      router.replace('/');
    },
    () => showLoginError()
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
    <el-form-item m="t-8">
      <Button variant="primary" native-type="submit">Login</Button>
      <Button
        variant="secondary"
        native-type="button"
        @click="router.push('/register')"
      >
        Register
      </Button>
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped>
.fa-eye,
.fa-eye-slash {
  transform: translateY(1px);
}
</style>
