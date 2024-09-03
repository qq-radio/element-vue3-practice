<template>
  <component :is="renderComponent" v-bind="customFieldProps" />
</template>

<script lang="ts" setup>
import type { PlusColumn  } from "@plus-pro-components/types";
import type { VNode } from "vue";

import { isVNode } from "vue";
import { isString } from "@/utils/is";

export interface PlusRenderProps {
  callbackValue?: unknown ;
  customFieldProps?: PlusColumn["fieldProps"] | PlusColumn["formItemProps"];
  // eslint-disable-next-line vue/require-default-prop
  render?: PlusColumn["renderField"] | ((...arg: any[]) => void);
  params?: Partial<PlusColumn>;
  // eslint-disable-next-line vue/require-default-prop
  handleChange?: (...arg: any[]) => void;
}

defineOptions({
  name: "PlusRender",
});

const props = withDefaults(defineProps<PlusRenderProps>(), {
  callbackValue: "",
  customFieldProps: () => ({}),
  params: () => ({}),
});

const state = ref();

watch(
  () => props.callbackValue,
  (val) => {
    state.value = val;
  },
  {
    flush: "post",
    immediate: true,
  }
);

/**
 * 渲染自定义
 */
const renderComponent = () => {
  if (!props.render) return;

  /** params 回调第二个参数值 */
  const params = { ...props.params } as PlusColumn;

  /** dynamicComponent 组件 */
  const dynamicComponent = (props.render as (...arg: any[]) => any)(
    state.value,
    params
  );

  /** VNode / J(T)SX  虚拟dom或者jsx */
  if (isVNode(dynamicComponent)) {
    const payload = {
      ...props.customFieldProps,
      ...dynamicComponent.props,
    };

    return {
      ...dynamicComponent,
      props: payload,
    } as VNode;
  } else if (isString(dynamicComponent)) {
    return dynamicComponent;
  }
};
</script>
