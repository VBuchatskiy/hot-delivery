<script setup lang="ts">
import { ref, reactive, computed, defineProps, defineEmits } from "vue";

interface IAppTableFilter {
  name: string;
  placeholder: string;
  type: "input" | "select" | "date";
  items?: string[];
}

interface IAppTableHeader {
  value: string;
  visible?: boolean;
}

interface IAppTableItemAction {
  icon: string;
  name: string;
  disabled?: boolean;
}

interface IAppTableItem {
  actions?: IAppTableItemAction[];
  type?: string;
  [key: string]: unknown;
}

interface IAppTableProp {
  headers: IAppTableHeader[] | string[];
  filters: IAppTableFilter[];
  items: IAppTableItem[];
  loading?: false;
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

const props = defineProps<IAppTableProp>();
const $page = ref(props.pagination.page);
const $filter = reactive<{ [key: string]: IAppTableFilter }>(
  props.filters.reduce((acc, { name }) => ({ ...acc, [name]: null }), {})
);
const $headers = computed(() => {
  return props.headers.length
    ? props.headers.map((item) => {
        return typeof item === "string"
          ? {
              value: item,
              visible: true,
            }
          : {
              value: item.value,
              visible: item?.visible || true,
            };
      })
    : [];
});
const $length = computed(() => {
  const qty = Math.ceil(props.pagination.total / props.pagination.limit);
  return qty >= 1 ? qty : 1;
});

const emits = defineEmits<{
  (event: "change:filter", page: number, filter: unknown): void;
  (event: "item:create"): void;
  (event: "item:edit", item: unknown): void;
  (event: "item:delete", item: unknown): void;
}>();
</script>

<template>
  <v-card>
    <v-toolbar
      v-bind="{
        height: 'auto',
      }"
    >
      <template v-slot:prepend>
        <v-btn v-bind="{ icon: true }">
          <v-icon> mdi-filter </v-icon>
        </v-btn>
      </template>
      <template v-slot:default>
        <!-- filters -->
        <v-row v-bind="{ alignContent: 'center' }">
          <template
            v-for="{ name, type, items, placeholder } of props.filters"
            v-bind:key="name"
          >
            <template v-if="type === 'select'">
              <v-col v-bind="{ cols: 2 }">
                <b-select
                  v-model="$filter[name]"
                  v-bind="{
                    clearable: true,
                    placeholder,
                    itemTitle: (title: string) => title,
                    itemValue: (value: string) => value,
                    hideDetails: true,
                    items,
                  }"
                  v-on="{
                    'update:modelValue': () => {
                      $page = 1;
                      emits('change:filter', 1, $filter);
                    },
                  }"
                ></b-select>
              </v-col>
            </template>
            <template v-else>
              <v-col v-bind="{ cols: 2 }">
                <b-text-field
                  v-model="$filter[name]"
                  v-bind="{
                    clearable: true,
                    placeholder: placeholder,
                    hideDetails: true,
                  }"
                  v-on="{
                    'update:modelValue': () => {
                      $page = 1;
                      emits('change:filter', 1, $filter);
                    },
                  }"
                ></b-text-field>
              </v-col>
            </template>
          </template>
        </v-row>
        <!-- filters -->
      </template>

      <template v-slot:append>
        <b-btn v-on="{ click: () => emits('item:create') }">
          {{ "create" }}
        </b-btn>
      </template>
    </v-toolbar>

    <v-card-text>
      <v-table>
        <!-- table header -->
        <thead>
          <template v-for="{ value, visible } of $headers" v-bind:key="value">
            <template v-if="visible">
              <th>{{ value }}</th>
            </template>
          </template>
        </thead>
        <!-- table header -->
        <!-- table item  -->
        <tbody>
          <template v-if="props.items.length">
            <template
              v-bind:key="rest.id"
              v-for="{ actions, ...rest } of items"
            >
              <tr>
                <!-- table item value -->
                <template
                  v-for="{ value, visible } of $headers"
                  v-bind:key="value"
                >
                  <template v-if="visible">
                    <td>{{ rest[value] }}</td>
                  </template>
                </template>
                <!-- table item value -->
                <!-- table item action -->
                <td class="text-right">
                  <template v-if="actions">
                    <template
                      v-for="{ name, icon, disabled } in actions"
                      v-bind:key="name"
                    >
                      <v-btn
                        v-bind="{
                          icon: true,
                          disabled,
                        }"
                        v-on="{
                          click: () => emits(`item:${name}` as any, rest),
                        }"
                      >
                        <v-icon> {{ icon }} </v-icon>
                      </v-btn>
                    </template>
                  </template>
                </td>
                <!-- table item action -->
              </tr>
            </template>
          </template>
          <template v-else> no data </template>
        </tbody>
        <!-- table item  -->
      </v-table>
    </v-card-text>
    <v-card-actions class="justify-center">
      <v-pagination
        v-model="$page"
        v-bind="{
          length: $length,
          totalVisible: 10,
        }"
        v-on="{
          'update:modelValue': () => emits('change:filter', $page, $filter),
        }"
      ></v-pagination>
    </v-card-actions>
  </v-card>
</template>
