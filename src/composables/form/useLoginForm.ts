import type { UserLogin } from '@/models/auth.model';
import type { ElForm } from 'element-plus';
import * as EmailValidator from 'email-validator';
import { useAuth } from '../api/auth';

export const useLoginForm = () => {
  const form: UserLogin = reactive({
    email: '',
    password: '',
  });

  const rules = reactive({
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
        const res = await auth.login(form);
        if (res) {
          return onSuccess();
        }
      }
      onError();
    });
  };

  return {
    form,
    rules,
    onSubmit,
    ...auth,
  };
};
