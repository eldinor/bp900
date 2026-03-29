import { mount } from "svelte";
import "./app.css";
import App from "./App.svelte";

declare const __SVELTE_VERSION__: string;

console.info(`Svelte version ${__SVELTE_VERSION__}`);

const app = mount(App, {
  target: document.getElementById("app")!,
});

export default app;
