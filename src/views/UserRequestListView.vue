<script lang="ts" setup>
import { computed } from "vue";
import AppTable from "@/components/AppTable.vue";
import { useRoute, useRouter } from "vue-router";
import { useRequestsStore } from "@/store/requests";
import { useAuthStore } from "@/store/auth";

const { meta, params } = useRoute();
const requestsStore = useRequestsStore();
const authStore = useAuthStore();
const { push: navigate } = useRouter();

// TODO promise all only coz don`t have login page
await authStore.getProfile();
await requestsStore.getRequestCollection();

const filters: any[] = [
  {
    name: "approvalStatus",
    placeholder: "approvalStatus",
    type: "select",
    items: ["approved", "waiting_approval"],
  },
];

const headers: string[] = [
  "id",
  "city_from",
  "city_to",
  "type",
  "dispatch_date",
  "description",
  "parcel_type",
  "customer_name",
  "customer_id",
];

const items = computed(() => {
  // TODO make separate call for get req by id
  return (
    requestsStore.requests
      ?.map(({ customer, ...rest }) => ({
        ...rest,
        customer_id: customer.id,
        customer_name: customer.full_name,
        actions: [
          {
            icon: "mdi-pencil",
            name: "edit",
          },
          {
            icon: "mdi-delete",
            name: "delete",
          },
        ],
      }))
      .filter(({ customer_id }) => customer_id === params.id) || []
  );
});

const pagination = computed(() => {
  return requestsStore.pagination;
});

const onParcelCreate = () => {
  navigate({ name: "create-parcel", params });
};
</script>

<template>
  <v-card>
    <v-card-title> {{ meta.title }} </v-card-title>
    <app-table
      v-bind="{
        loading: false,
        headers,
        filters,
        items,
        pagination,
      }"
      v-on="{
        'item:create': onParcelCreate,
      }"
    ></app-table>
  </v-card>
</template>
