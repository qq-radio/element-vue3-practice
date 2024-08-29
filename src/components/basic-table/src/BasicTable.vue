<template>
  <div class="plus-page">
    <component :is="renderWrapper().search" v-if="search">
      <PlusSearch
        ref="plusSearchInstance"
        v-bind="search"
        v-model="values"
        :schemas="schemas"
        :search-loading="loadingStatus"
        @search="handleSearch"
        @reset="handleReset"
      >
        <template v-if="$slots['search-footer']" #footer="data">
          <slot name="search-footer" v-bind="data" />
        </template>
      </PlusSearch>
    </component>

    <el-divider v-if="dividerProps" v-bind="dividerProps" />

    <slot name="extra" />

    <component :is="renderWrapper().table" class="plus-page__table_wrapper">
      <PlusTable
        ref="plusTableInstance"
        :title-bar="{ refresh: true }"
        v-bind="table"
        :table-data="tableData"
        :loading-status="loadingStatus"
        :schemas="schemas"
        :pagination="
          pagination === false
            ? undefined
            : {
                ...pagination,
                total,
                modelValue: pageInfo,
                pageSizeList: computedDefaultPageSizeList,
              }
        "
        @paginationChange="handlePaginationChange"
        @refresh="handleRefresh"
      >
        <!--表格单元格表头的插槽 -->
        <template v-for="(_, key) in headerSlots" :key="key" #[key]="data">
          <slot :name="key" v-bind="data" />
        </template>

        <!--表格单元格的插槽 -->
        <template v-for="(_, key) in cellSlots" :key="key" #[key]="data">
          <slot :name="key" v-bind="data" />
        </template>

        <!--表单单项的插槽 -->
        <template v-for="(_, key) in fieldSlots" :key="key" #[key]="data">
          <slot :name="key" v-bind="data" />
        </template>

        <template v-if="$slots['table-title']" #title>
          <slot name="table-title" />
        </template>

        <template v-if="$slots['table-toolbar']" #toolbar>
          <slot name="table-toolbar" />
        </template>

        <template v-if="$slots['table-expand']" #expand="data">
          <slot name="table-expand" v-bind="data" />
        </template>

        <template v-if="$slots['table-append']" #append>
          <slot name="table-append" />
        </template>

        <template v-if="$slots['table-empty']" #empty>
          <slot name="table-empty" />
        </template>

        <template v-if="$slots['pagination-left']" #pagination-left>
          <slot name="pagination-left" />
        </template>

        <template v-if="$slots['pagination-right']" #pagination-right>
          <slot name="pagination-right" />
        </template>

        <!-- 表格拖拽行 和 列设置里拖拽 icon -->
        <template v-if="$slots['drag-sort-icon']" #drag-sort-icon>
          <slot name="drag-sort-icon" />
        </template>

        <!-- 表格表头 列设置 icon   -->
        <template v-if="$slots['column-settings-icon']" #column-settings-icon>
          <slot name="column-settings-icon" />
        </template>

        <!-- 表表格表头 密度 icon  -->
        <template v-if="$slots['density-icon']" #density-icon>
          <slot name="density-icon" />
        </template>

        <!--table tooltip-icon  插槽 -->
        <template v-if="$slots['tooltip-icon']" #tooltip-icon>
          <slot name="tooltip-icon" />
        </template>
        <!--table 操作栏更多icon插槽 -->
        <template v-if="$slots['action-bar-more-icon']" #action-bar-more-icon>
          <slot name="action-bar-more-icon" />
        </template>

        <!--表格单元格编辑的插槽 -->
        <template v-if="$slots['edit-icon']" #edit-icon>
          <slot name="edit-icon" />
        </template>
      </PlusTable>
    </component>
  </div>
</template>

<script lang="ts" setup>
import type {
  TableSchema,
  PageInfo,
  RecordType,
  Mutable,
  Recordable,
} from "./types/table.d";
import type {
  PlusSearchProps,
  PlusSearchInstance,
} from "@plus-pro-components/components/search";
import { PlusSearch } from "@plus-pro-components/components/search";
import type {
  PlusTableProps,
  PlusTableInstance,
} from "@plus-pro-components/components/table";
import { PlusTable } from "@plus-pro-components/components/table";
import type { PlusPaginationProps } from "@plus-pro-components/components/pagination";
import { h, ref, useSlots, computed } from "vue";
import type { CardProps } from "element-plus";
import { ElCard, ElDivider } from "element-plus";
import { useTable } from "@plus-pro-components/hooks";
import {
  getTableCellSlotName,
  getTableHeaderSlotName,
  getFieldSlotName,
  filterSlots,
} from "@plus-pro-components/components/utils";
import {
  DefaultPage,
  DefaultPageSizeList,
} from "@plus-pro-components/constants";

defineOptions({
  name: "PlusPage",
});

const props = withDefaults(defineProps<BasicTableProps>(), {
  params: () => ({}),
  schemas: () => [],
  postData: undefined,
  beforeSearchSubmit: undefined,
  isCard: true,
  // eslint-disable-next-line vue/require-valid-default-prop
  search: () => ({}),
  table: () => ({}),
  defaultPageInfo: () => ({ ...DefaultPage }),
  defaultPageSizeList: () => DefaultPageSizeList,
  searchCardProps: () => ({}),
  tableCardProps: () => ({}),
  /**
   * 分页组件的其他参数，不包含total，modelValue，pageSizeList
   */
  pagination: () => ({}),
  immediate: true,
  dividerProps: false,
  pageInfoMap: () => ({
    page: "page",
    pageSize: "pageSize",
  }),
});
const emit = defineEmits<BasicTableEmits>();
const slots = useSlots();

const computedDefaultPageInfo = computed(() => props.defaultPageInfo);
const computedDefaultPageSizeList = computed(() => props.defaultPageSizeList);

const { tableData, pageInfo, total, loadingStatus } = useTable(
  computedDefaultPageInfo
);
const plusSearchInstance = ref<PlusSearchInstance | null>(null);
const plusTableInstance = ref<PlusTableInstance | null>(null);
const values = ref<Recordable>({
  ...(props.search as Partial<PlusSearchProps>)?.defaultValues,
});

/**
 * 表格单元格的插槽
 */
const cellSlots = filterSlots(slots, getTableCellSlotName());
/**
 * 表格单元格表头的插槽
 */
const headerSlots = filterSlots(slots, getTableHeaderSlotName());
/**
 * 表单单项的插槽
 */
const fieldSlots = filterSlots(slots, getFieldSlotName());

/** 渲染包裹层 */
const renderWrapper = () => {
  if (props.isCard) {
    return {
      search: h(ElCard, props.searchCardProps),
      table: h(ElCard, props.tableCardProps),
    };
  }
  return { search: h("div"), table: h("div") };
};

const getList = async () => {
  if (!props.request) return;
  try {
    loadingStatus.value = true;
    const payload: RecordType = {
      ...values.value,
      // eslint-disabled no-useless-spread
      ...{
        [props.pageInfoMap?.page || "page"]: pageInfo.value.page,
        [props.pageInfoMap?.pageSize || "pageSize"]: pageInfo.value.pageSize,
      },
      ...props.params,
    };
    const { data, total: dataTotal } = await props.request(payload);
    const list = (props.postData && props.postData(data)) || data;
    tableData.value = list || [];
    total.value = dataTotal || list.length;
    emit("requestComplete", tableData.value);
  } catch (error: unknown) {
    emit("requestError", error);
  }
  q;
  loadingStatus.value = false;
};

if (props.immediate) {
  getList();
}

const handlePaginationChange = (_pageInfo: PageInfo): void => {
  pageInfo.value = _pageInfo;
  getList();
  emit("paginationChange", _pageInfo);
};

const handleSearch = (val: Recordable) => {
  const data =
    (props.beforeSearchSubmit && props.beforeSearchSubmit(val)) || val;
  values.value = data;
  pageInfo.value.page = 1;
  getList();
  emit("search", values.value);
};

const handleReset = (val: Recordable) => {
  values.value = { ...val };
  pageInfo.value.page = 1;
  getList();
  emit("reset", values.value);
};

const handleRefresh = () => {
  getList();
};

defineExpose({
  plusSearchInstance,
  plusTableInstance,
  getList,
  handleReset,
  /**
   * TODO: 将会在v0.2.0中移除
   */
  handleRest: handleReset,
});
</script>
