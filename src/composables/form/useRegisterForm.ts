import type { UserRegister } from '@/models/auth.model';
import { UserRole } from '@/models/user.model';
import { get } from '@vueuse/core';
import type { ElForm } from 'element-plus';
import * as EmailValidator from 'email-validator';
import { reactive } from 'vue';
import { useAuth } from '../api/auth';
import messages from '@/i18n/translations';

type Language = 'en' | 'hr';
const lang = localStorage.getItem('lang') as Language;

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
        message: messages[lang].form.usernameError,
        trigger: 'blur',
      },
      {
        min: 4,
        max: 20,
        message: messages[lang].form.usernameError2,
        trigger: 'blur',
      },
    ],
    email: [
      {
        required: true,
        message: messages[lang].form.emailError,
        trigger: 'blur',
      },
      {
        validator: () => EmailValidator.validate(form.email),
        message: messages[lang].form.emailError2,
        trigger: 'blur',
      },
    ],
    password: [
      {
        required: true,
        message: messages[lang].form.passwordError,
        trigger: 'blur',
      },
      {
        required: true,
        min: 5,
        message: messages[lang].form.passwordError2,
        trigger: 'blur',
      },
    ],
    repeatedPassword: [
      {
        required: true,
        validator: passwordMatch,
        message: messages[lang].form.passwordError3,
        trigger: 'blur',
      },
    ],
    role: [
      {
        message: messages[lang].form.roleError,
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
