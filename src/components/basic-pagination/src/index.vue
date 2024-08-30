<template>
  <el-pagination
    v-bind="getAttrs"
    :current-page="page.currentPage"
    :page-size="page.pageSize"
    :total="total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script lang="ts" setup>
import type { BasicPaginationProps, BasicPaginationEmits, Page } from "./types";

import { DefaultPaginationSettings } from "@/settings/index";

defineOptions({
  name: "BasicPagination",
});

const props = withDefaults(defineProps<BasicPaginationProps>(), {
  modelValue: () => ({}),
});

const emit = defineEmits<BasicPaginationEmits>();

const getAttrs = computed(() => ({
  ...DefaultPaginationSettings,
  ...(useAttrs() || {}),
}));

const page = ref<Page>({
  currentPage: 1,
  pageSize: 10,
  total: 0,
});

watchEffect(() => {
  page.value = { ...props.modelValue };
});

const handleEmit = () => {
  emit("update:modelValue", page.value);
  emit("change", page.value);
};

const handleSizeChange = (pageSize: number) => {
  page.value.pageSize = pageSize;
  page.value.page = 1;
  handleEmit();
  emit("size-change", pageSize);
};

const handleCurrentChange = (page: number) => {
  page.value.page = page;
  handleEmit();
  emit("current-change", page);
};
</script>
