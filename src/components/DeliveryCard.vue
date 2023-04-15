<script lang="ts" setup>
import { ref, reactive, defineEmits, defineProps, onMounted } from "vue";
import { useAuthStore } from "@/store/auth";
import dayjs from "dayjs";

const authStore = useAuthStore();
const valid = ref(false);
const props = defineProps<{
  // eslint-disable-next-line no-undef
  deliver?: IDeliver;
}>();

// eslint-disable-next-line no-undef
const deliver = reactive<IDeliver>({
  customer: authStore?.profile || null,
  city_from: "",
  city_to: "",
  type: "",
  create_at: dayjs(new Date()).format("YYYY-MM-DD"),
  dispatch_date: "",
  parcel_type: "deliver",
  description: "",
});

const emit = defineEmits<{
  // eslint-disable-next-line no-undef
  (event: "confirm", item: IDeliver): void;
  (event: "cancel"): void;
}>();

const options: {
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
    items: ["nikolaev", "budva"],
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
    items: ["nikolaev", "budva"],
    rules: [
      (value: string) => {
        if (value) return true;
        return "You must enter a a city to.";
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
  description: {
    label: "Description",
    type: "textarea",
    placeholder: "",
    rules: [
      (value: string) => {
        if (value) return true;
        return "You must enter a description.";
      },
    ],
  },
};

onMounted(() => {
  if (props.deliver) {
    Object.assign(deliver, props.deliver);
  }
});
</script>

<template>
  <v-form v-model="valid">
    <v-card>
      <v-card-title>
        {{ props.deliver ? "Edit parcel" : "Create parcel" }}
      </v-card-title>
      <template v-for="(value, prop) in options" v-bind:key="prop">
        <template v-if="!/customer|parcel_type/g.test(prop as keyof IDeliver)">
          <template v-if="!/textarea|date/g.test(options[prop].type)">
            <v-card-text>
              <v-autocomplete
                v-model="deliver[prop as keyof IDeliver]"
                v-bind="{
                  label: options[prop].label,
                  items: options[prop].items,
                  rules: options[prop].rules,
                }"
              ></v-autocomplete>
            </v-card-text>
          </template>
          <template v-else-if="options[prop].type === 'date'">
            <v-card-text>
              <v-text-field
                v-model="deliver.dispatch_date"
                v-bind="{
                  type: 'date',
                  rules: options[prop].rules,
                }"
              ></v-text-field>
            </v-card-text>
          </template>
          <template v-else>
            <v-card-text>
              <v-textarea
                v-model="deliver.description"
                v-bind="{
                  placeholder: options[prop].label,
                  type: options[prop].type,
                  rules: options[prop].rules,
                }"
              >
              </v-textarea>
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
            click: () => emit('confirm', deliver),
          }"
        >
          {{ props.deliver ? "Edit" : "Create" }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>
