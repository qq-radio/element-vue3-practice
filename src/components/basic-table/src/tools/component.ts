import type { DisplayType as ComponentType } from "../type";

import { ElImage, ElLink, ElTag, ElProgress } from "element-plus";

import { BasicCopy } from "@/components/basic-copy";
import { BasicBadge } from "@/components/basic-badge";

import type { Component } from "vue";

const componentMap = new Map<ComponentType, Component>();

componentMap.set("img", ElImage);
componentMap.set("link", ElLink);
componentMap.set("tag", ElTag);
componentMap.set("progress", ElProgress);
componentMap.set("copy", BasicCopy);
componentMap.set("badge", BasicBadge);

function getComponent(component: ComponentType): Component | string {
  return componentMap.get(component) || "span";
}

export { getComponent };
