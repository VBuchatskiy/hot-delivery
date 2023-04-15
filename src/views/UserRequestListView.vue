<script lang="ts" setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useParcelStore } from "@/store/parcel";
import AppTable from "@/components/AppTable.vue";
import DeliveryCard from "@/components/DeliveryCard.vue";
import OrderCard from "@/components/OrderCard.vue";

const { meta, params } = useRoute();
const parcelStore = useParcelStore();
const { push: navigate } = useRouter();

// eslint-disable-next-line no-undef
const parcel = ref<IOrder | IDeliver | null>(null);
const deleteDialogVisible = ref(false);
const editDialogVisible = ref(false);
const sort = ref<"create_at" | "dispatch_date">("create_at");

const headers: string[] = [
  "id",
  "city_from",
  "city_to",
  "type",
  "dispatch_date",
  "description",
  "parcel_type",
  "customer_name",
  "create_at",
];

await parcelStore.getUserRequestCollection(params.id as string, sort.value);

const items = computed(() => {
  // TODO make separate call for get req by id
  return (
    parcelStore.requests?.map(({ customer, ...rest }) => ({
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
  return parcelStore.pagination;
});

const onParcelCreate = () => {
  navigate({ name: "create-parcel", params: { id: params.id } });
};

// eslint-disable-next-line no-undef, @typescript-eslint/no-unused-vars
const onParcelDelete = (item: IOrder | IDeliver) => {
  parcel.value = item;
  deleteDialogVisible.value = true;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-undef
const onParcelEdit = (item: IOrder | IDeliver) => {
  console.warn(item);
  parcel.value = item;
  editDialogVisible.value = true;
};

const onParcelEditConfirm = () => {
  onParcelEditCancel();
};

const onParcelEditCancel = () => {
  parcel.value = null;
  editDialogVisible.value = false;
};

const onDeleteCancel = () => {
  parcel.value = null;
  deleteDialogVisible.value = false;
};

const onDeleteParcelConfirm = async () => {
  await parcelStore.removeParcel(parcel?.value?.id as string);
  await parcelStore.getUserRequestCollection(params.id as string);
  onDeleteCancel();
};

const onParcelDeleteCancel = () => {
  parcel.value = null;
  deleteDialogVisible.value = false;
};

const onParcelSortChange = async (value: "create_at" | "dispatch_date") => {
  sort.value = value;
  await parcelStore.getUserRequestCollection(params.id as string, sort.value);
};
</script>

<template>
  <v-card>
    <v-card-title> {{ meta.title }} </v-card-title>
    <app-table
      v-bind="{
        loading: false,
        headers,
        items,
        pagination,
      }"
      v-on="{
        'item:edit': (item: IOrder | IDeliver) => onParcelEdit(item),
        'item:delete': (item: IOrder | IDeliver) => onParcelDelete(item)
      }"
    >
      <template v-slot:prepend>
        <v-col
          v-bind="{
            cols: 2,
          }"
        >
          <v-select
            v-bind="{
              modelValue: sort,
              placeholder: 'Sort by',
              items: ['create_at', 'dispatch_date'],
            }"
            v-on="{
              'update:modelValue': onParcelSortChange,
            }"
          ></v-select>
        </v-col>
      </template>
      <template v-slot:append>
        <b-btn v-on="{ click: onParcelCreate }"> Create </b-btn>
      </template>
    </app-table>
    <v-dialog v-model="deleteDialogVisible">
      <v-card>
        <v-card-title> Delete parcel </v-card-title>
        <v-card-text> Are you sure want to delete parcel?</v-card-text>
        <v-card-actions class="d-flex justify-end">
          <v-btn
            v-on="{
              click: onParcelDeleteCancel,
            }"
          >
            Cancel
          </v-btn>
          <v-btn
            v-on="{
              click: onDeleteParcelConfirm,
            }"
          >
            Confirm
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="editDialogVisible">
      <template v-if="parcel">
        <template v-if="parcel.parcel_type === 'deliver'">
          <delivery-card
            v-bind="{
              deliver: parcel,
            }"
            v-on="{
              cancel: onParcelEditCancel,
              confirm: onParcelEditConfirm,
            }"
          ></delivery-card>
        </template>
        <template v-else>
          <order-card
            v-bind="{
              order: parcel,
            }"
            v-on="{
              cancel: onParcelEditCancel,
              confirm: onParcelEditConfirm,
            }"
          ></order-card>
        </template>
      </template>
    </v-dialog>
  </v-card>
</template>
