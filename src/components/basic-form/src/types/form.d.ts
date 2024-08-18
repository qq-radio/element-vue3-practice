import type {
  RowProps,
  ColProps,
  FormItemProps,
  FormItemRule,
} from 'element-plus'

export type ElementPlusComponentType =
  | 'input'
  | 'input-number'
  | 'textarea'
  | 'date-picker'
  | 'time-picker'
  | 'radio-group'
  | 'checkbox'
  | 'checkbox-group'
  | 'select'
  | 'tree-select'
  | 'switch'
  | 'rate'
  | 'slider'
  | 'transfer'
  | 'cascader'
  | 'color-picker'

export type CustomComponentType = 'title' | 'upload'

export type ComponentType = ElementPlusComponentType | CustomComponentType

export interface FormSchemaItem {
  label: string
  prop: string
  defaultValue?: string
  component: ComponentType
  componentProps?: Recordable<unknown>
  componentListeners?: Recordable<() => void>
  slot?: string

  colProps?: Partial<Mutable<ColProps>>
  formItemProps?: Partial<Mutable<FormItemProps>>

  required?: boolean
  min?: number
  max?: number
  rules?: FormItemRule[]

  hasLabel?: boolean
  hidden?: boolean
  vIf?: (model: Recordable, schemaItem: FormSchemaItem) => boolean
}

export interface BasicFormProps {
  model: Recordable
  schema: FormSchemaItem[]
  loading: boolean

  rowProps?: Partial<Mutable<RowProps>>
  colProps?: Partial<Mutable<ColProps>>
  formItemProps?: Partial<Mutable<FormItemProps>>

  hasLabel?: boolean
  labelSuffix?: string
  labelWidth?: string | number
  labelPosition?: 'left' | 'right' | 'top'

  hasFooter?: boolean
  hasReset?: boolean
  resetText?: string
  submitText?: string
  footerAlign?: 'left' | 'right' | 'center'

  hasErrorTip?: boolean
}

export interface BasicFormEmits {
  (e: 'update:modelValue', values: Props['model']): void
  (e: 'change', e: unknown, schemaItem: FormSchemaItem): void
  (e: 'submit', values: Props['model']): void
  (e: 'reset', values: Props['model']): void
}
