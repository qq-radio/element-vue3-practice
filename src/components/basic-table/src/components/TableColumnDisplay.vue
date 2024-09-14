<template>
  <div>
    <BasicRender
      v-if="isFunction(schema.render)"
      :render="schema.render"
      v-bind="params"
    />
    <slot
      v-else-if="isString(schema.slot)"
      :name="schema.slot"
      v-bind="params"
    />
    <component
      v-else-if="displayComponent"
      :is="displayComponent"
      v-bind="displayProps"
    />
    <span v-else>
      {{ formattedValue }}
    </span>
    <el-tooltip v-if="schema.tooltip" :content="schema.tooltip" placement="top">
      <el-icon :size="16"><QuestionFilled /></el-icon>
    </el-tooltip>
  </div>
</template>

<script lang="ts" setup>
import type { ColumnDisplayProps, ColumnDisplayParams } from "../type";

import { getComponent } from "../tools/component";
import { normalizeComponentProps } from "../tools/component-props";
import { isFunction, isString } from "lodash";

import { QuestionFilled } from "@element-plus/icons-vue";

defineOptions({
  name: "TableColumnDisplay",
});

const props = withDefaults(defineProps<ColumnDisplayProps>(), {
  type: "default",
  schema: () => ({
    prop: "",
    label: "",
  }),
});

const params = computed<ColumnDisplayParams>(() => {
  return {
    row: props.row || {},
    column: props.column,
    columnIndex: props.columnIndex,
    schema: props.schema,
    value: props.schema.prop && props.row ? props.row[props.schema.prop] : "",
  };
});

const formattedValue = computed(() => {
  if (isFunction(props.schema.formatter)) {
    return props.schema.formatter({ ...params.value });
  }

  return params.value.value;
});

const displayComponent = computed(() =>
  props.schema.displayType ? getComponent(props.schema.displayType) : ""
);

const displayProps = computed(() =>
  props.schema.displayType
    ? normalizeComponentProps(props.schema.displayType, formattedValue.value, {
        ...params.value,
      })
    : {}
);
</script>
