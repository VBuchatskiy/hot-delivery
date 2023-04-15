<script setup lang="ts">
import { ref, computed, defineProps, defineEmits } from "vue";

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
      <slot name="prepend"> </slot>
      <template v-slot:append>
        <slot name="append"> </slot>
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
      ></v-pagination>
    </v-card-actions>
  </v-card>
</template>
