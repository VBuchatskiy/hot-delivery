<script lang="ts" setup>
import { computed } from "vue";
import AppTable from "@/components/AppTable.vue";
import { useRoute } from "vue-router";
import { useRequestsStore } from "@/store/requests";
import { useAuthStore } from "@/store/auth";

const { meta } = useRoute();
const store = useRequestsStore();
const authStore = useAuthStore();

await authStore.getProfile();
await store.getRequestCollection();

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
  return (
    store.requests?.map(({ customer, ...rest }) => ({
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
    })) || []
  );
});

const pagination = computed(() => {
  return store.pagination;
});
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
    ></app-table>
  </v-card>
</template>
