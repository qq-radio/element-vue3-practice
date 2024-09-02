<template>
  <div>
    <el-table-column
      v-bind="column.columnProps"
      :prop="column.prop"
      :width="column.width"
      :min-width="column.minWidth"
      :index="index"
    >
      <template #header="scoped">
        <span class="plus-table-column__header">
          <PlusRender
            v-if="column.renderHeader && isFunction(column.renderHeader)"
            :render="column.renderHeader"
            :params="{ ...scoped, ...column, cellIndex: index }"
            :callback-value="getLabel(column.label)"
          />

          <!--表格单元格Header的插槽 -->
          <slot
            v-else
            :name="getTableHeaderSlotName(column.prop)"
            :prop="column.prop"
            :label="getLabel(column.label)"
            :field-props="column.fieldProps"
            :value-type="column.valueType"
            :cell-index="index"
            v-bind="scoped"
            :column="{ ...scoped, ...column }"
          >
            {{ getLabel(column.label) }}
          </slot>

          <el-tooltip
            v-if="column.tooltip"
            placement="top"
            v-bind="getTooltip(column.tooltip)"
          >
            <slot name="tooltip-icon">
              <el-icon class="plus-table-column__header__icon" :size="16">
                <QuestionFilled />
              </el-icon>
            </slot>
          </el-tooltip>
        </span>
      </template>

      <template #default="{ row, column, $index, ...rest }">
        <PlusDisplayItem
          ref="plusDisplayItemInstance"
          :column="column"
          :row="row"
          :index="$index"
          :editable="editable"
          :rest="{ column, ...rest }"
          @change="(data) => handleChange(data, $index, column, column, rest)"
        >
          <!--表单单项的插槽 -->
          <template
            v-if="$slots[getFieldSlotName(column.prop)]"
            #[getFieldSlotName(column.prop)]="data"
          >
            <slot :name="getFieldSlotName(column.prop)" v-bind="data" />
          </template>

          <!-- 表单el-form-column 下一行额外的内容 的插槽 -->
          <template
            v-if="$slots[getExtraSlotName(column.prop)]"
            #[getExtraSlotName(column.prop)]="data"
          >
            <slot :name="getExtraSlotName(column.prop)" v-bind="data" />
          </template>

          <!--表格单元格的插槽 -->
          <template
            v-if="$slots[getTableCellSlotName(column.prop)]"
            #[getTableCellSlotName(column.prop)]="data"
          >
            <slot :name="getTableCellSlotName(column.prop)" v-bind="data" />
          </template>

          <!--表格单元格编辑的插槽 -->
          <template v-if="$slots['edit-icon']" #edit-icon>
            <slot name="edit-icon" />
          </template>
        </PlusDisplayItem>
      </template>
    </el-table-column>
  </div>
</template>

<script lang="ts" setup>
import { PlusDisplayItem } from "@plus-pro-components/components/display-item";
import type { PlusDisplayItemInstance } from "@plus-pro-components/components/display-item";
import type { TableSchema, Recordable } from "../types";
import {
  getTooltip,
  getTableKey,
  getTableCellSlotName,
  getTableHeaderSlotName,
  getFieldSlotName,
  getExtraSlotName,
  isFunction,
  getLabel,
} from "@plus-pro-components/components/utils";
import { TableFormRefInjectionKey } from "@plus-pro-components/constants";
import { QuestionFilled } from "@element-plus/icons-vue";
import type { Ref, ComputedRef } from "vue";
import { ref, inject, watch, computed } from "vue";
import { PlusRender } from "@plus-pro-components/components/render";
import type { TableColumnCtx } from "element-plus";
import { ElTableColumn, ElTooltip, ElIcon } from "element-plus";
import type { TableFormRefRow, FormChangeCallBackParams } from "./type";

export interface PlusTableTableColumnProps {
  column?: TableSchema;
  editable?: boolean | "click" | "dblclick";
}
export interface PlusTableTableColumnEmits {
  (e: "formChange", data: FormChangeCallBackParams): void;
}

defineOptions({
  name: "PlusTableTableColumn",
});

const props = withDefaults(defineProps<PlusTableTableColumnProps>(), {
  column: () => ({}),
  editable: false,
});
const emit = defineEmits<PlusTableTableColumnEmits>();

/**
 *  表单ref处理
 */
const plusDisplayItemInstance = ref<PlusDisplayItemInstance[] | null>();
const formRef = inject(TableFormRefInjectionKey) as Ref<
  Record<string | number, TableFormRefRow[]>
>;

/**
 *  设置表单ref
 */
const setFormRef = () => {
  if (!plusDisplayItemInstance.value?.length) return;
  const data: Recordable = {};
  const list: {
    index: number;
    prop: string;
    formInstance: ComputedRef<any>;
  }[] =
    plusDisplayItemInstance.value?.map((item) => ({
      ...item,
      ...item?.getDisplayItemInstance(),
    })) || [];
  list.forEach((item) => {
    if (!data[item.index]) {
      data[item.index] = [];
    }
    data[item.index].push(item);
  });

  formRef.value = data;
};

watch(
  plusDisplayItemInstance,
  () => {
    setFormRef();
  },
  {
    deep: true,
  }
);

// 是否需要editIcon
const hasPropsEditIcon = computed(
  () => props.editable === "click" || props.editable === "dblclick"
);

/**
 * 获取key
 * @param item
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const getKey = (item: TableSchema) => getTableKey(item, true);

/**
 * 表单发生变化
 * @param data
 * @param index
 * @param column
 * @param item
 */
const handleChange = (
  data: { value: any; prop: string; row: Recordable },
  index: number,
  column: TableColumnCtx<Recordable>,
  item: TableSchema,
  rest: Recordable
) => {
  const formChangeCallBackParams = {
    ...data,
    index,
    column: { ...column, ...item },
    rowIndex: index,
    ...rest,
  } as unknown as FormChangeCallBackParams;

  emit("formChange", formChangeCallBackParams);
};

defineExpose({
  plusDisplayItemInstance,
});
</script>
