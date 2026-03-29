import { createApp, version as vueVersion } from "vue";
import App from "./App.vue";
import "./style.css";

console.info(`Vue version ${vueVersion}`);

createApp(App).mount("#app");
