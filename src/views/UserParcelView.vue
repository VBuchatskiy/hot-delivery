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
          to: { name: 'create-order', params },
        }"
      >
        Order
      </b-btn>
      <b-btn
        v-bind="{
          to: { name: 'create-delivery', params },
        }"
      >
        Delivery
      </b-btn>
    </v-card-actions>
  </v-card>
</template>
