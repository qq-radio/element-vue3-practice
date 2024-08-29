import type {
  RowProps,
  ColProps,
  FormItemProps,
  FormItemRule,
  FormValidateCallback,
  FormItemProp,
} from "element-plus";

import type { FormSchema } from "@/components/basic-form/src/types/form.d";

export interface BasicTableProps {
  schemas: TableSchema[];
  tableDatas?: Recordable[];
  api?: (params: Partial<PageInfo> & Recordable) => Promise<{
    data: RecordType[];
    total: number;
  }>;
  extraParams?: Recordable;
  paramsFormatter?: (params: Recordable) => Recordable;
  responseFormatter?: (tableDatas: Array<Recordable>) => Array<Recordable>;
  showIndexColumn?: boolean;
  immediate?: boolean;
  loading?: boolean;
  ellipsis?: boolean;
}

export interface BasicTableEmits {
  (e: "search", data: Recordable): void;
  (e: "reset", data: Recordable): void;
  (e: "pagination-change", pageInfo: PageInfo): void;
  (e: "request-error", error: unknown): void;
  (e: "request-complete", tableDatas: RecordType[]): void;
}

export type RenderType = "img" | "link" | "tag" | "progress" | "copy";

export type CustomRenderType = string | VNode | JSX.Element | Component;

export interface TableSchema {
  label: string;
  prop: string;
  visible?: boolean;
  width?: string | number;
  renderType?: RenderType;
  customRender?: (
    value: any,
    data: { row: RecordType; column: TableSchema; index: number }
  ) => CustomRenderType;
  searchable?: boolean;
  searchConfig?: FormSchema;
}
