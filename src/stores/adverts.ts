import type { Advert } from '@/models/advert.model';
import { defineStore } from 'pinia';

interface State {
  adverts: Advert[] | null;
}

export const useAdvertsStore = defineStore({
  id: 'adverts',
  state: (): State => ({
    adverts: [],
  }),
  persist: true,
  getters: {},
  actions: {
    setAdverts(adverts: Advert[] | []) {
      this.adverts = adverts?.reverse() || [];
    },
    clearRequestsData() {
      this.$reset();
    },
  },
});
