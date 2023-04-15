import { defineStore } from "pinia";
import { ref } from "vue";
import { request } from "@/api";

export const useParcelStore = defineStore("parcel", () => {
  const requests = ref<IParcel[]>([]);
  const pagination = ref({
    page: 1,
    limit: 10,
    total: 0,
  });
  const parcel = ref<null | IOrder | IOrder>(null);

  const loading = ref<boolean>(false);

  const getUserRequestCollection = async (uid: string, sort?: string) => {
    const $requests = window.localStorage.getItem("requests")
      ? JSON.parse(window.localStorage.getItem("requests") || "")
      : null;

    if ($requests?.items.length) {
      const { items, ...$pagination } = $requests;

      if (sort === "create_at") {
        items.sort((a: IDeliver | IOrder, b: IDeliver | IOrder) => {
          return +new Date(b.create_at) - +new Date(a.create_at);
        });
      } else {
        items.sort((a: IDeliver | IOrder, b: IDeliver | IOrder) => {
          return +new Date(b.dispatch_date) - +new Date(a.dispatch_date);
        });
      }

      requests.value = items.filter(
        ({ customer }: { customer: { id: string } }) => customer.id === uid
      );

      pagination.value = $pagination;

      return;
    }

    loading.value = true;

    try {
      const { data } = await request.getRequestCollection(uid);
      const { items, ...$pagination } = data;

      window.localStorage.setItem("requests", JSON.stringify(data));

      items.sort((a: IParcel, b: IParcel) => {
        return +new Date(b.create_at) - +new Date(a.create_at);
      });

      requests.value = items;
      pagination.value = $pagination;
    } catch (error) {
      error;
    } finally {
      loading.value = false;
    }
  };

  const getParcel = async (pid: string) => {
    const $requests = JSON.parse(window.localStorage.getItem("requests") || "");

    parcel.value = $requests.find(({ id }: { id: string }) => id === pid);
  };

  const createParcel = async (parcel: Partial<IOrder | IDeliver>) => {
    //  TODO api
    const $requests = JSON.parse(window.localStorage.getItem("requests") || "");

    $requests.items.push({ id: $requests.items.length + 1, ...parcel });

    const data = {
      items: $requests.items,
      total: $requests.items.length,
      page: 1,
      limit: 10,
    };

    localStorage.setItem("requests", JSON.stringify(data));
  };

  const editParcel = async (parcel: Partial<IOrder | IDeliver>) => {
    //  TODO api
    const $requests = JSON.parse(window.localStorage.getItem("requests") || "");
    const index = $requests?.items.findIndex(({ id }: { id: string }) => {
      return id === parcel.id;
    });

    $requests.items[index] = parcel;

    const data = {
      items: $requests.items,
      total: $requests.items.length,
      page: 1,
      limit: 10,
    };

    console.warn(data);
    localStorage.setItem("requests", JSON.stringify(data));
  };

  const removeParcel = async (pid: string) => {
    //  TODO api
    const $requests = JSON.parse(window.localStorage.getItem("requests") || "");

    const data = {
      items: $requests.items.filter(({ id }: { id: string }) => id !== pid),
      total: $requests.items.length,
      page: 1,
      limit: 10,
    };

    localStorage.setItem("requests", JSON.stringify(data));
  };

  return {
    requests,
    pagination,
    parcel,
    getParcel,
    createParcel,
    editParcel,
    removeParcel,
    getUserRequestCollection,
  };
});
