import { defineStore } from 'pinia';

interface State {
  isLoading: boolean;
}

export const useSpinnerStore = defineStore({
  id: 'spinner',
  state: (): State => ({
    isLoading: false,
  }),
  persist: true,
  getters: {},
  actions: {
    setIsLoading(isLoading: boolean) {
      this.isLoading = isLoading;
    },
  },
});
