import { defineStore } from "pinia";
import { ref } from "vue";
import { request } from "@/api";

export const useRequestsStore = defineStore("requests", () => {
  const requests = ref<IParcel[]>([]);
  const pagination = ref({
    page: 1,
    limit: 10,
    total: 0,
  });
  const loading = ref<boolean>(false);

  const getRequestCollection = async () => {
    loading.value = true;
    try {
      const { data } = await request.getRequestCollection();
      const { items, ...$pagination } = data;
      requests.value = items;
      pagination.value = $pagination;
    } catch (error) {
      error;
    } finally {
      loading.value = false;
    }
  };

  return {
    requests,
    pagination,
    getRequestCollection,
  };
});
