import { defineStore } from "pinia";
import { ref } from "vue";
import { auth } from "@/api";

export const useAuthStore = defineStore("auth", () => {
  const profile = ref<IProfile | null>(null);
  const loading = ref<boolean>(false);

  const getProfile = async () => {
    const $profile = window.localStorage.getItem("profile");

    if ($profile) {
      profile.value = JSON.parse($profile);
      return;
    }

    loading.value = true;

    try {
      const { data } = await auth.getProfile();
      window.localStorage.setItem("profile", JSON.stringify(data));
      profile.value = data;
    } catch (error) {
      error;
    } finally {
      loading.value = false;
    }
  };

  return {
    profile,
    getProfile,
  };
});
