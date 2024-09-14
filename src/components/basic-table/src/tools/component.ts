import type { DisplayType as ComponentType } from "../type";

import { ElImage } from "element-plus";

import type { Component } from "vue";

const componentMap = new Map<ComponentType, Component>();

componentMap.set("img", ElImage);

function getComponent(component: ComponentType): Component | string {
  return componentMap.get(component) || "span";
}

export { getComponent };
