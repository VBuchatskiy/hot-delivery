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

  const getRequestCollection = async (sort?: string) => {
    const $requests = window.localStorage.getItem("requests")
      ? JSON.parse(window.localStorage.getItem("requests") || "")
      : null;

    if ($requests?.items.length) {
      const { items, ...$pagination } = $requests;
      // Mode to back end as
      if (sort === "create_at") {
        items.sort((a: IDeliver | IOrder, b: IDeliver | IOrder) => {
          return +new Date(b.create_at) - +new Date(a.create_at);
        });
      } else {
        items.sort((a: IDeliver | IOrder, b: IDeliver | IOrder) => {
          return +new Date(b.dispatch_date) - +new Date(a.dispatch_date);
        });
      }

      requests.value = items;

      pagination.value = $pagination;

      return;
    }

    try {
      const { data } = await request.getRequestCollection();
      const { items, ...$pagination } = data;

      window.localStorage.setItem("requests", JSON.stringify(data));

      items.sort((a: IParcel, b: IParcel) => {
        return +new Date(b.create_at) - +new Date(a.create_at);
      });

      requests.value = items;
      request;
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
