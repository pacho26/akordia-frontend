import { defineStore } from 'pinia';
import type { Advert } from '@/models/advert.model';

interface State {
  adverts: Advert[] | null;
}

export const useAdvertsStore = defineStore({
  id: 'adverts',
  state: (): State => ({
    adverts: null,
  }),
  persist: true,
  getters: {},
  actions: {
    setAdverts(adverts: Advert[] | null) {
      this.adverts = adverts;
    },
    clearRequestsData() {
      this.$reset();
    },
  },
});
