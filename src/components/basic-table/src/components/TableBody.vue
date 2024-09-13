<template>
  <div>
    <el-table
      v-bind="$attrs"
      :data="tableDatas"
      :border="true"
      highlight-current-row
      scrollbar-always-on
    >
      <template #default>
        <slot name="default">
          <el-table-column
            v-if="hasSelection"
            key="selection"
            type="selection"
            v-bind="selectionColumnProps"
          />

          <el-table-column
            v-if="hasIndex"
            key="index"
            type="index"
            v-bind="indexColumnProps"
          />

          <el-table-column
            v-if="hasExpand"
            key="expand"
            type="expand"
            v-bind="expandColumnProps"
          >
            <template #default="scoped">
              <div>
                <slot name="expand" :index="scoped.$index" v-bind="scoped" />
              </div>
            </template>
          </el-table-column>

          <template v-for="c in columns" :key="c.prop">
            <el-table-column
              v-if="c"
              v-bind="c.columnProps"
              :label="c.label"
              :prop="c.prop"
              :width="c.width || columnWidth"
            >
              <template #default="{ row, column, $index }">
                <TableColumnDisplay
                  type="default"
                  v-bind="{ row, column, columnIndex: $index, schema: c }"
                >
                  <template
                    v-for="slotName in Object.keys(getSlots)"
                    :key="slotName"
                    #[slotName]="scope"
                  >
                    <slot :name="slotName" v-bind="scope" />
                  </template>
                </TableColumnDisplay>
              </template>
            </el-table-column>
          </template>
        </slot>
      </template>

      <template #append>
        <slot name="append" />
      </template>

      <template #empty>
        <slot name="empty" />
      </template>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import type { BasicTableBodyProps, TableSchema } from "../type";

import TableColumnDisplay from "./TableColumnDisplay.vue";

defineOptions({
  name: "TableBody",
  inheritAttrs: false,
});

const props = withDefaults(defineProps<BasicTableBodyProps>(), {
  data: () => [],
  selectionColumnProps: () => ({}),
  indexColumnProps: () => ({}),
  expandColumnProps: () => ({}),
});

const columns = ref<TableSchema[]>([]);
const tableDatas = ref<TableSchema[]>([]);

watchEffect(() => {
  columns.value = props.schemas.filter((s) => s.visible !== false);
  tableDatas.value = props.data;
});

const getSlots = useSlots();
</script>
