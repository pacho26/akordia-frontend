import { get, set } from '@vueuse/core';

export const usePasswordVisibility = () => {
  const visible = ref(false);
  const toggleVisiblity = () => set(visible, !get(visible));

  return {
    visible,
    toggleVisiblity,
  };
};
