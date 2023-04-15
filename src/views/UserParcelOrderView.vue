<script lang="ts" setup>
import { useRouter, useRoute } from "vue-router";
import { useParcelStore } from "@/store/parcel";
import OrderCard from "@/components/OrderCard.vue";

const { push: navigate } = useRouter();
const { params } = useRoute();
const parcelStore = useParcelStore();

const onCancelOrder = () => {
  navigate({
    name: "user-requests",
    params: { id: params.id },
  });
};

// eslint-disable-next-line no-undef, @typescript-eslint/no-unused-vars
const onCreateOrder = async (item: IOrder) => {
  await parcelStore.createParcel(item);
  onCancelOrder();
};
</script>

<template>
  <order-card
    v-on="{
        cancel: onCancelOrder,
        confirm: (item: IOrder) => onCreateOrder(item),
      }"
  ></order-card>
</template>
