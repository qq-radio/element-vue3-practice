import type { TableProps, PaginationProps } from 'element-plus'

import type {
  BasicFormProps,
  FormSchema,
} from '@/components/basic-form/src/types'
import type { Page } from '@/components/basic-pagination'

export type PageMap = {
  [K in keyof Pick<Page, 'pageSize' | 'currentPage'>]: string
}

export interface BasicTableProps {
  schemas: TableSchema[]
  tableDatas?: Array<Recordable>
  request?: (params: Recordable) => Promise<{
    data: {
      records: Array<Recordable>
      total: number
    }
  }>
  pageMap?: PageMap
  extraParams?: Recordable
  paramsFormatter?: (params: Recordable) => Recordable
  responseFormatter?: (tableDatas: Array<Recordable>) => Array<Recordable>
  showIndexColumn?: boolean
  immediate?: boolean
  loading?: boolean
  ellipsis?: boolean

  searchProps?: Partial<BasicFormProps>
  tableProps?: Partial<TableProps<unknown>>
  paginationProps?: Partial<PaginationProps>
}

export interface BasicTableEmits {
  (e: 'search', params: Recordable): void
  (e: 'reset', params: Recordable): void
  (e: 'pagination-change', page: Page): void
  (e: 'request-error', error: unknown): void
  (e: 'request-complete', tableDatas: Array<Recordable>): void
}

export type RenderType = 'img' | 'link' | 'tag' | 'progress' | 'copy'

export type CustomRenderType = string | VNode | JSX.Element | Component

export interface TableSchema {
  label: string
  prop: string
  visible?: boolean
  width?: string | number
  renderType?: RenderType
  customRender?: (
    value: any,
    data: { row: Recordable; column: TableSchema; index: number }
  ) => CustomRenderType
  searchable?: boolean
  searchConfig?: FormSchema
}

// 它的设计原则是，render>slot>valueType 所有为什么这样？
// 我最好应该把renderType改为displayType，这样我才好解释上面这句话
