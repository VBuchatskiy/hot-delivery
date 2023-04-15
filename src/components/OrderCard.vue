<script lang="ts" setup>
import { ref, reactive, defineProps, defineEmits, onMounted } from "vue";
import { useAuthStore } from "@/store/auth";

const authStore = useAuthStore();

const valid = ref(false);

const props = defineProps<{
  // eslint-disable-next-line no-undef
  order?: IOrder;
}>();

const emit = defineEmits<{
  // eslint-disable-next-line no-undef
  (event: "confirm", item: IOrder): void;
  (event: "cancel"): void;
}>();

// eslint-disable-next-line no-undef
const order = reactive<IOrder>({
  customer: authStore?.profile,
  city_from: "",
  city_to: "",
  create_at: new Date(),
  type: "",
  dispatch_date: "",
  parcel_type: "order",
});

const options: {
  // eslint-disable-next-line no-undef
  [key: string]: {
    label: string;
    type: string;
    placeholder: string;
    items?: string[];
    rules: { (data: string): string | boolean }[];
  };
} = {
  city_from: {
    label: "City from",
    type: "autocomplete",
    placeholder: "Select city from",
    items: ["Nikolaev", "Budva"],
    rules: [
      (value: string) => {
        if (value) return true;
        return "You must enter a city from.";
      },
    ],
  },
  city_to: {
    label: "City to",
    type: "autocomplete",
    placeholder: "Select city to",
    items: ["Nikolaev", "Budva"],
    rules: [
      (value: string) => {
        if (value) return true;
        return "You must enter a city to.";
      },
    ],
  },
  type: {
    label: "Product type",
    type: "autocomplete",
    placeholder: "",
    items: ["gadgets", "drinks", "clothes", "medicines", "other"],
    rules: [
      (value: string) => {
        if (value) return true;
        return "You must enter a product type.";
      },
    ],
  },
  dispatch_date: {
    label: "Dispatch date",
    type: "date",
    placeholder: "",
    rules: [
      (value: string) => {
        if (value) return true;
        return "You must enter a date.";
      },
    ],
  },
};

onMounted(() => {
  if (props.order) {
    Object.assign(order, props.order);
  }
});
</script>

<template>
  <v-form v-model="valid">
    <v-card>
      <v-card-title>
        {{ props.order ? "Edit parcel" : "Create parcel" }}
      </v-card-title>
      <template v-for="(value, prop) in options" v-bind:key="prop">
        <template v-if="!/customer|parcel_type/g.test(prop as keyof IOrder)">
          <template v-if="options[prop].type !== 'date'">
            <v-card-text>
              <v-autocomplete
                v-model="order[prop as keyof IOrder]"
                v-bind="{
                  label: options[prop].label,
                  items: options[prop].items,
                  rules: options[prop].rules,
                }"
              ></v-autocomplete>
            </v-card-text>
          </template>
          <template v-else>
            <v-card-text>
              <v-text-field
                v-model="order.dispatch_date"
                v-bind="{
                  placeholder: options[prop].label,
                  type: options[prop].type,
                  rules: options[prop].rules,
                }"
              ></v-text-field>
            </v-card-text>
          </template>
        </template>
      </template>
      <v-card-actions class="d-flex justify-end">
        <v-btn
          v-on="{
            click: () => emit('cancel'),
          }"
        >
          Cancel
        </v-btn>
        <v-btn
          class="mr-2"
          v-bind="{
            disabled: !valid,
          }"
          v-on="{
            click: () => emit('confirm', order),
          }"
        >
          {{ props.order ? "Edit" : "Create" }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>
