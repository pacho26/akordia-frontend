import type { Request, RequestCreate } from '@/models/request.model';
import * as api from '@/services/api/requests';
import { set } from '@vueuse/core';
import { useResultState } from '../index';

const loading = ref(false);

export const useRequest = () => {
  const request = ref<Request>();
  const { error, isError, isSuccess } = useResultState();

  const fetchRequest = async () => {
    try {
      set(loading, true);

      const fetchedRequest = await api.getRandomRequest();
      if (fetchedRequest) {
        set(request, fetchedRequest.data);
        return request;
      }
    } catch (err) {
      set(error, err);
      return null;
    } finally {
      loading.value = false;
    }
  };

  return {
    request,
    fetchRequest,
    error,
    isError,
    isSuccess,
    loading,
  };
};

export const useRequestCreate = () => {
  const request = ref<Request>();
  const { error, isError, isSuccess } = useResultState();

  const createRequest = async (requestData: RequestCreate) => {
    try {
      const newRequest = await api.createRequest(requestData);
      if (newRequest) {
        set(request, newRequest);
        return newRequest;
      }
    } catch (err) {
      set(error, err);
      return false;
    }
  };

  return {
    request,
    createRequest,
    error,
    isError,
    isSuccess,
  };
};
