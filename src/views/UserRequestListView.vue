<script lang="ts" setup>
import { useRoute } from "vue-router";

const { meta } = useRoute();
</script>

<template>
  <div>{{ meta.title }}</div>
</template>
