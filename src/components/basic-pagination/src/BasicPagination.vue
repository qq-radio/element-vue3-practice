<template>
  <el-pagination
    v-bind="getAttrs"
    :current-page="page.currentPage"
    :page-size="page.pageSize"
    :total="page.total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script lang="ts" setup>
import type { BasicPaginationProps, BasicPaginationEmits, Page } from "./type";

defineOptions({
  name: "BasicPagination",
});

const props = withDefaults(defineProps<BasicPaginationProps>(), {
  modelValue: () => ({
    currentPage: 1,
    pageSize: 10,
    total: 0,
  }),
});

const emit = defineEmits<BasicPaginationEmits>();

const getAttrs = computed(() => ({
  layout: "total, sizes, prev, pager, next, jumper",
  pageSizes: [10, 20, 30, 40, 50, 100, 200, 300, 400, 500],
  currentPage: 1,
  pageSize: 10,
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

const handleCurrentChange = (p: number) => {
  page.value.currentPage = p;
  emit("current-change", p);
  handleEmit();
};

const handleSizeChange = (s: number) => {
  page.value.pageSize = s;
  page.value.currentPage = 1;
  emit("size-change", s);
  handleEmit();
};
</script>
