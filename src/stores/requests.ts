import { defineStore } from 'pinia';
import type { Request } from '@/models/request.model';

interface State {
  lastRequest: Request;
}

export const useRequestsStore = defineStore({
  id: 'requests',
  state: (): State => ({
    lastRequest: {
      _id: '',
      title: '',
      artist: '',
      content: '',
      author: '',
      rating: 0,
      voters: [],
      createdAt: '',
      updatedAt: '',
    },
  }),
  persist: true,
  getters: {},
  actions: {
    setLastRequest(request: Request) {
      this.lastRequest = request;
    },
    clearSongsData() {
      this.$reset();
    },
  },
});
