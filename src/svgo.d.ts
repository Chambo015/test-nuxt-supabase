declare module "*.svg" {
  import type { DefineComponent } from "vue";

  const component: DefineComponent<{
    filled?: boolean
    fontControlled?: boolean
  }>;
  export default component;
};
