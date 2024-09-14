<template>
  <div class="basic-table">
    <div class="basic-table__search">
      <BasicForm
        v-if="searchSchemas.length"
        v-bind="searchProps"
        v-model="searchParams"
        :schemas="searchSchemas"
        :search-loading="isLoading"
        submitText="查询"
        labelPosition="left"
        @submit="onSearch"
        @reset="onReset"
      />
      <div>
        <slot name="operation-before" />
        <BasicImport
          v-if="isImportVisible"
          :config="importConfig"
          @success="reQuery"
        />
        <BasicExport
          v-if="isExportVisible"
          :config="exportConfig"
          :params="exportParams"
        />
        <slot name="operation-after" />
      </div>
    </div>
    <div class="basic-table__body">
      ??? {{ ($attrs, props) }}
      <TableBody
        v-bind="{
          ...$attrs,
          ...props,
          ...tableProps,
        }"
        :schemas="tableSchemas"
        :data="tableDatas"
        :loading="isLoading"
      >
        <template
          v-for="slotName in Object.keys(getSlots)"
          :key="slotName"
          #[slotName]="scope"
        >
          <slot :name="slotName" v-bind="scope" />
        </template>
      </TableBody>
    </div>
    <div class="basic-table__page">
      <BasicPagination
        v-bind="paginationProps"
        v-model="page"
        @current-change="query"
        @size-change="query"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { BasicTableProps, BasicTableEmits } from "./type";
import type { Page } from "@/components/basic-pagination";

import { isFunction, isObject, cloneDeep, isUndefined } from "lodash";

import TableBody from "./components/TableBody.vue";
import { BasicPagination } from "@/components/basic-pagination";

import { mockDatas } from "@/mock/table";

defineOptions({
  name: "BasicTable",
});

const props = withDefaults(defineProps<BasicTableProps>(), {
  schemas: () => [],
  extraParams: () => ({}),
  immediate: true,
  loading: false,
  ellipsis: false,
  searchProps: () => ({
    labelWidth: 80,
    labelPosition: "left",
    colProps: {
      span: 8,
    },
  }),
  tableProps: () => ({
    columnWidth: 130,
  }),
  paginationProps: () => ({}),
});

const emit = defineEmits<BasicTableEmits>();

const getSlots = useSlots();

const searchSchemas = computed(() => {
  return props.schemas
    .filter((item) => isObject(item.searchConfig))
    .map((item) => item.searchConfig);
});

const searchParams = ref<Recordable>({});

const tableSchemas = computed(() => {
  return props.schemas.filter((item) => item.visible !== false);
});

const tableDatas = ref<Recordable[]>([]);

const isLoading = ref(false);

const page = ref<Page>({
  currentPage: 1,
  pageSize: 10,
  total: 0,
});

const getRequestParams = () => {
  const params = {
    ...props.extraParams,
    ...searchParams.value,
    currentPage: page.value.currentPage,
    pageSize: page.value.pageSize,
  };

  return isFunction(props.paramsFormatter)
    ? props.paramsFormatter(cloneDeep(params))
    : params;
};

const formatRecords = (records: Recordable[]) =>
  isFunction(props.dataFormatter) ? props.dataFormatter(records) : records;

const query = async () => {
  try {
    tableDatas.value = mockDatas;
    page.value.total = 100;
    const requestParams2 = getRequestParams();
    console.log("requestParams2:", requestParams2);

    if (!isFunction(props.request)) {
      return;
    }

    tableDatas.value = mockDatas;

    isLoading.value = true;

    const requestParams = getRequestParams();

    const response = await props.request(requestParams);
    const { total, records } = response.data || {};

    tableDatas.value = formatRecords(records);
    page.value.total = 100;
  } catch (error: unknown) {
    console.log("error:", error);
  } finally {
    isLoading.value = false;
  }
};

const reQuery = () => {
  page.value.currentPage = 1;
  query();
};

if (props.immediate || isFunction(props.request)) {
  query();
}

const onSearch = (params: Recordable) => {
  searchParams.value = params;
  reQuery();
};

const onReset = () => {
  searchParams.value = {};
  reQuery();
};

const isImportVisible = computed(() => {
  return isObject(props.importConfig);
});

const isExportVisible = computed(() => {
  return isObject(props.exportConfig);
});

const exportParams = computed(() => ({
  ...searchParams.value,
  ...props.extraParams,
}));
</script>

<style lang="scss">
@import "./style.scss";
</style>
