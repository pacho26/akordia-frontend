import type { UserRegister } from '@/models/auth.model';
import { UserRole } from '@/models/user.model';
import { get } from '@vueuse/core';
import type { ElForm } from 'element-plus';
import * as EmailValidator from 'email-validator';
import { reactive } from 'vue';
import { useAuth } from '../api/auth';

export const useRegisterForm = () => {
  const form: UserRegister = reactive({
    username: '',
    email: '',
    password: '',
    role: UserRole.User,
  });
  const repeatedPassword = ref('');

  const roles = computed(() =>
    Object.entries(UserRole).map(([label, value]) => ({ label, value }))
  );

  const passwordMatch = () =>
    form.password.trim() !== '' &&
    form.password.trim().toString() === get(repeatedPassword).trim().toString();

  const rules = reactive({
    username: [
      {
        required: true,
        message: 'Please enter your username',
        trigger: 'blur',
      },
      {
        min: 2,
        max: 24,
        message: 'Name should be between 2 and 24 characters',
        trigger: 'blur',
      },
    ],
    email: [
      {
        required: true,
        message: 'Please enter your email',
        trigger: 'blur',
      },
      {
        validator: () => EmailValidator.validate(form.email),
        message: 'Please enter a valid email',
        trigger: 'blur',
      },
    ],
    password: [
      {
        required: true,
        message: 'Please enter your password',
        trigger: 'blur',
      },
      {
        required: true,
        min: 5,
        message: 'Password too short',
        trigger: 'blur',
      },
    ],
    repeatedPassword: [
      {
        required: true,
        validator: passwordMatch,
        message: 'Passwords do not match',
        trigger: 'blur',
      },
    ],
    role: [
      {
        message: 'Please select a role',
        trigger: 'change',
      },
    ],
  });

  const auth = useAuth();

  const onSubmit = async (
    formEl: InstanceType<typeof ElForm> | null,
    // eslint-disable-next-line @typescript-eslint/ban-types
    onSuccess: Function,
    // eslint-disable-next-line @typescript-eslint/ban-types
    onError: Function
  ) => {
    if (!formEl) return;
    formEl.validate(async (valid) => {
      if (valid) {
        const res = await auth.register(form);
        if (res) {
          return onSuccess();
        }
      }
      onError();
    });
  };

  return {
    form,
    repeatedPassword,
    rules,
    onSubmit,
    roles,
    ...auth,
  };
};
