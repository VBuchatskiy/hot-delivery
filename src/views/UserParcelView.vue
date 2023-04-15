<script lang="ts" setup>
import { useRoute } from "vue-router";

const { meta, params } = useRoute();
</script>

<template>
  <v-card>
    <v-card-title>{{ meta.title }}</v-card-title>
    <v-card-actions>
      <b-btn
        v-bind="{
          to: { name: 'create-order', params: { id: params.id } },
        }"
      >
        Order
      </b-btn>
      <b-btn
        v-bind="{
          to: {
            name: 'create-deliver',
            params: { id: params.id },
          },
        }"
      >
        Delivery
      </b-btn>
    </v-card-actions>
    <v-card-actions class="d-flex justify-end">
      <b-btn
        v-bind="{
          to: { name: 'user-requests', params: { id: params.id } },
        }"
      >
        Cancel
      </b-btn>
    </v-card-actions>
  </v-card>
</template>
