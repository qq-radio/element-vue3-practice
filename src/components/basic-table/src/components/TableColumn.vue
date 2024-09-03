<template>
  <div>
    <el-table-column
      v-if="schema"
      v-bind="schema.columnProps"
      :label="schema.label"
      :prop="schema.prop"
      :width="schema.width"
    >
      <template #header="scoped">
        <span>
          <PlusRender
            v-if="schema.renderHeader && isFunction(schema.renderHeader)"
            :render="schema.renderHeader"
            :params="{ ...scoped, ...schema, cellIndex: index }"
            :callback-value="getLabel(schema.label)"
          />

          <slot
            v-else
            :name="getTableHeaderSlotName(schema.prop)"
            :prop="schema.prop"
            :label="getLabel(schema.label)"
            :field-props="schema.fieldProps"
            :value-type="schema.valueType"
            :cell-index="index"
            v-bind="scoped"
            :column="{ ...scoped, ...schema }"
          >
            {{ getLabel(schema.label) }}
          </slot>

          <el-tooltip
            v-if="schema.tooltip"
            placement="top"
            v-bind="getTooltip(schema.tooltip)"
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
        <BasicDisplay
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
        </BasicDisplay>
      </template>
    </el-table-column>
  </div>
</template>

<script lang="ts" setup>
import type { TableSchema } from "../types";
import {
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

defineOptions({
  name: "PlusTableTableColumn",
});

interface TableColumnProps {
  column?: TableSchema;
}

const props = withDefaults(defineProps<TableColumnProps>(), {
  column: undefined,
});
</script>
