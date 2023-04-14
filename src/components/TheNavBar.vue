<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "vue-router";

const { getRoutes } = useRouter();
const authStore = useAuthStore();

const navigation = ref(
  getRoutes()
    .filter(({ meta }) => meta.main)
    .map(({ name, meta }) => ({ name, title: meta.title }))
);
</script>

<template>
  <v-app-bar>
    <template v-slot:default>
      <v-spacer></v-spacer>
      <v-list
        class="d-flex text-capitalize"
        v-bind="{
          lines: 'one',
        }"
      >
        <template v-for="{ name, title } of navigation" v-bind:key="name">
          <template v-if="name === 'parcel'">
            <v-list-item
              v-bind="{
                value: name,
                rounded: 'xl',
                activeColor: 'error',
                to: {
                  name: 'user-requests',
                  params: { id: authStore?.profile?.id },
                },
              }"
            >
              {{ title }}
            </v-list-item>
          </template>
          <template v-else>
            <v-list-item
              v-bind="{
                value: name,
                rounded: 'xl',
                activeColor: 'error',
                to: {
                  name,
                },
              }"
            >
              {{ title }}
            </v-list-item>
          </template>
        </template>
      </v-list>
    </template>
  </v-app-bar>
</template>
