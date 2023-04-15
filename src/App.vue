<script setup lang="ts">
import { onMounted } from "vue";
import { useAuthStore } from "@/store/auth";

const store = useAuthStore();

onMounted(async () => {
  await store.getProfile();
});
</script>

<template>
  <router-view></router-view>
</template>
