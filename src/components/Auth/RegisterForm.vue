<script lang="ts" setup>
import { usePasswordVisibility } from '@/composables/form/usePasswordVisibility';
import { useRegisterForm } from '@/composables/form/useRegisterForm';
import { useNotification } from '@/composables/useNotification';
import type { FormInstance } from '@/models/element.model';
import { get } from '@vueuse/core';
import { ElNotification } from 'element-plus';

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
          type="primary"
        />
      </el-radio-group>
    </el-form-item>
    <el-form-item m="t-10">
      <Button variant="primary" native-type="submit">Register</Button>
      <Button
        variant="secondary"
        native-type="button"
        @click="router.push('/login')"
      >
        Login
      </Button>
    </el-form-item>
  </el-form>
</template>

<style lang="scss">
.fa-eye,
.fa-eye-slash {
  transform: translateY(1px);
}

.el-radio-button__inner {
  &:hover {
    color: #6175de !important;
  }
}

.el-radio-button__original-radio:checked + .el-radio-button__inner {
  color: white !important;
  background-color: #6175de !important;
  border-color: #6175de !important;
  box-shadow: none !important;
}
</style>
