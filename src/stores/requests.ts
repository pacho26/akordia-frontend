import { defineStore } from 'pinia';
import type { Request } from '@/models/request.model';

interface State {
  lastRequest: Request | null;
}

export const useRequestsStore = defineStore({
  id: 'requests',
  state: (): State => ({
    lastRequest: null,
  }),
  persist: true,
  getters: {},
  actions: {
    setLastRequest(request: Request | null) {
      this.lastRequest = request;
    },
    clearRequestsData() {
      this.$reset();
    },
  },
});
