<script lang="ts" setup>
import { useRouter, useRoute } from "vue-router";
import { useParcelStore } from "@/store/parcel";
import DeliveryCard from "@/components/DeliveryCard.vue";

const { push: navigate } = useRouter();
const { params } = useRoute();
const parcelStore = useParcelStore();

const onCreateCancel = () => {
  navigate({
    name: "user-requests",
    params: { id: params.id },
  });
};
// eslint-disable-next-line no-undef
const onCreateDelivery = async (item: IDeliver) => {
  await parcelStore.createParcel(item);

  onCreateCancel();
};
</script>

<template>
  <delivery-card
    v-on="{
        cancel: onCreateCancel,
        confirm: (item: IDeliver) => onCreateDelivery(item),
      }"
  ></delivery-card>
</template>
