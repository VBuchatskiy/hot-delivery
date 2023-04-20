import App from "./App.vue";
import { createApp } from "vue";
import { router } from "@/router";
import { pinia, vuetify } from "@/plugins";
import { worker } from "@/mocks/browser";

if (process.env.NODE_ENV === "development") {
  worker.start({
    onUnhandledRequest: "bypass",
  });
}

createApp(App).use(pinia).use(vuetify).use(router).mount("#app");
