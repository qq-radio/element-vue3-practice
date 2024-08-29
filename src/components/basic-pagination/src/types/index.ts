import type { PaginationProps } from "element-plus";

export interface BasicPaginationProps extends PaginationProps {
  modelValue?: Page;
}

export interface Page {
  currentPage: number;
  pageSize: number;
  total: number;
}
