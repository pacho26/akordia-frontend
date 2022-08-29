import type { UserLogin } from '@/models/auth.model';
import type { ElForm } from 'element-plus';
import * as EmailValidator from 'email-validator';
import { useAuth } from '../api/auth';
import messages from '@/i18n/translations';

type Language = 'en' | 'hr';

export const useLoginForm = () => {
  const form: UserLogin = reactive({
    email: '',
    password: '',
  });

  const lang = localStorage.getItem('lang') as Language;

  const rules = reactive({
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
