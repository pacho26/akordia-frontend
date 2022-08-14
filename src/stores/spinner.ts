import { defineStore } from 'pinia';

interface State {
  isLoading: boolean;
  isFirstLoad: boolean;
}

export const useSpinnerStore = defineStore({
  id: 'spinner',
  state: (): State => ({
    isLoading: false,
    isFirstLoad: true,
  }),
  persist: false,
  getters: {},
  actions: {
    setIsLoading(isLoading: boolean) {
      this.isLoading = isLoading;
      this.isFirstLoad = false;
    },
  },
});
