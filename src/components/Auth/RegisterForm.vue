<script lang="ts" setup>
import { ElNotification } from 'element-plus';
import { get } from '@vueuse/core';
import { useNotification } from '@/composables/useNotification';
import { usePasswordVisibility } from '@/composables/form/usePasswordVisibility';
import { useRegisterForm } from '@/composables/form/useRegisterForm';
import type { FormInstance } from '@/models/element.model';

const formRef = ref<FormInstance | null>(null);

const router = useRouter();
const { visible, toggleVisiblity } = usePasswordVisibility();
const { visible: repeatedVisible, toggleVisiblity: toggleRepeatedVisibility } =
  usePasswordVisibility();

const { form, repeatedPassword, rules, error, onSubmit, roles } =
  useRegisterForm();
const { showRegisterError } = useNotification();

const submitForm = () =>
  onSubmit(
    get(formRef),
    () => {
      ElNotification.closeAll();
      router.replace('/');
    },
    () => showRegisterError(error.value)
  );
</script>

<template>
  <el-form
    ref="formRef"
    label-position="top"
    :model="form"
    :rules="rules"
    label-width="180px"
    class="w-full md:w-[500px]"
    size="large"
    @submit.prevent="submitForm"
  >
    <el-form-item label="Username" prop="username">
      <el-input v-model="form.username" type="text">
        <template #prefix>
          <i text="base" class="fa-solid fa-user" />
        </template>
      </el-input>
    </el-form-item>
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
    <el-form-item label="Repeated password" prop="repeatedPassword">
      <el-input
        v-model="repeatedPassword"
        :type="repeatedVisible ? 'text' : 'password'"
      >
        <template #prefix>
          <div @click.stop="toggleRepeatedVisibility" cursor="pointer">
            <div v-if="repeatedVisible">
              <i text="base" class="fa-solid fa-eye" />
            </div>
            <div v-else class="-translate-x-0.25">
              <i text="base" class="fa-solid fa-eye-slash" />
            </div>
          </div>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item label="Role" prop="role">
      <el-radio-group v-model="form.role" size="large">
        <el-radio-button
          v-for="role in roles"
          :key="role.label"
          :label="role.value"
          type="info"
        />
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" native-type="submit">Register</el-button>
      <el-button native-type="button" @click="router.push('/login')">
        Login
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
