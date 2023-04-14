<script setup lang="ts">
import TheNavBar from "@/components/TheNavBar.vue";
</script>
<!-- https://vuejs.org/guide/built-ins/suspense.html#combining-with-other-components -->
<template>
  <v-layout>
    <keep-alive>
      <the-nav-bar></the-nav-bar>
    </keep-alive>
    <v-main>
      <router-view v-slot="{ Component }">
        <template v-if="Component">
          <suspense>
            <component v-bind:is="Component"></component>
            <template v-slot:fallback> Loading </template>
          </suspense>
        </template>
      </router-view>
    </v-main>
  </v-layout>
</template>
