<template>
  <el-table-column
    v-if="schema"
    v-bind="schema.columnProps"
    :label="schema.label"
    :prop="schema.prop"
    :width="schema.width"
  >
    <template #default="{ row, column, $index }">
      <TableColumnDisplay
        type="default"
        v-bind="{ row, column, columnIndex: $index, schema }"
      />
    </template>
  </el-table-column>
</template>

<script lang="ts" setup>
import type { TableSchema } from "../type";

import TableColumnDisplay from "./TableColumnDisplay.vue";

defineOptions({
  name: "TableColumn",
});

interface TableColumnProps {
  schema?: TableSchema;
}

withDefaults(defineProps<TableColumnProps>(), {
  schema: undefined,
});
</script>
