import DisplayItem from "./src/BasicDisplay.vue";

export type PlusDisplayItemInstance = InstanceType<typeof DisplayItem>;
export type { PlusDisplayItemProps } from "./src/index.vue";

export const PlusDisplayItem = DisplayItem;
