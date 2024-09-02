<template>
  <div class="plus-table">
    <el-table
      v-loading="loading"
      v-bind="$attrs"
      :data="tableDatas"
      :row-key="rowKey"
      :border="true"
      highlight-current-row
      scrollbar-always-on
    >
      <template #default>
        <slot name="default">
          <!-- 选择栏 -->
          <el-table-column
            v-if="isSelection"
            key="selection"
            type="selection"
            v-bind="selectionTableColumnProps"
          />

          <!-- 序号栏 -->
          <PlusTableTableColumnIndex
            v-if="hasIndexColumn"
            :index-content-style="indexContentStyle"
            :index-table-column-props="indexTableColumnProps"
            :page-info="(pagination as PlusPaginationProps)?.modelValue"
          />

          <!-- 展开行 -->
          <el-table-column
            v-if="hasExpand"
            type="expand"
            v-bind="expandTableColumnProps"
          >
            <template #default="scoped">
              <div class="plus-table-expand-col">
                <slot name="expand" :index="scoped.$index" v-bind="scoped" />
              </div>
            </template>
          </el-table-column>

          <!--配置渲染栏  -->
          <PlusTableColumn
            :columns="subColumns"
            :editable="editable"
            @formChange="handleFormChange"
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

            <!-- 表单el-form-item 下一行额外的内容 的插槽 -->
            <template v-for="(_, key) in extraSlots" :key="key" #[key]="data">
              <slot :name="key" v-bind="data" />
            </template>

            <!-- tooltip-icon  插槽 -->
            <template v-if="$slots['tooltip-icon']" #tooltip-icon>
              <slot name="tooltip-icon" />
            </template>

            <!--表格单元格编辑的插槽 -->
            <template v-if="$slots['edit-icon']" #edit-icon>
              <slot name="edit-icon" />
            </template>
          </PlusTableColumn>

          <!-- 操作栏 -->
          <PlusTableActionBar
            v-if="actionBar"
            v-bind="actionBar"
            @clickAction="handleAction"
            @clickActionConfirmCancel="handleClickActionConfirmCancel"
          >
            <!-- 操作栏更多icon插槽 -->
            <template
              v-if="$slots['action-bar-more-icon']"
              #action-bar-more-icon
            >
              <slot name="action-bar-more-icon" />
            </template>
          </PlusTableActionBar>
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
import {
  reactive,
  toRefs,
  watch,
  ref,
  provide,
  shallowRef,
  useSlots,
  unref,
  computed,
} from 'vue'
import type { PlusPaginationProps } from '@plus-pro-components/components/pagination'
import {
  DefaultPageInfo,
  TableFormRefInjectionKey,
  TableFormFieldRefInjectionKey,
} from '@plus-pro-components/constants'
import type { Ref, ComputedRef } from 'vue'
import type { ComponentSize } from 'element-plus/es/constants'
import type { TableInstance } from 'element-plus'
import { ElTable, ElTableColumn, vLoading } from 'element-plus'
import type {
  PageInfo,
  PlusColumn,
  RecordType,
  FormFieldRefsType,
} from '@plus-pro-components/types'
import {
  getTableCellSlotName,
  getTableHeaderSlotName,
  getFieldSlotName,
  getExtraSlotName,
  filterSlots,
  isSVGElement,
} from '@plus-pro-components/components/utils'
import { cloneDeep } from 'lodash-es'
import PlusTableActionBar from './table-action-bar.vue'
import PlusTableColumn from './table-column.vue'
import PlusTableTableColumnIndex from './table-column-index.vue'
import type {
  ButtonsCallBackParams,
  PlusTableState,
  PlusTableSelfProps as PlusTableProps,
  PlusTableEmits,
  TableFormRefRow,
  FormChangeCallBackParams,
} from './type'

defineOptions({
  name: 'PlusTable',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<PlusTableProps>(), {
  defaultSize: 'default',
  pagination: false,
  actionBar: false,
  hasIndexColumn: false,
  titleBar: true,
  isSelection: false,
  hasExpand: false,
  loading: false,
  data: () => [],
  columns: () => [],

  rowKey: 'id',
  indexTableColumnProps: () => ({}),
  indexContentStyle: () => ({}),
  selectionTableColumnProps: () => ({
    width: 40,
  }),
  expandTableColumnProps: () => ({}),
  editable: false,
})
const emit = defineEmits<PlusTableEmits>()

const subColumns: Ref<PlusColumn[]> = ref([])
const columnsIsChange: Ref<boolean> = ref(false)
const filterColumns: Ref<PlusColumn[]> = ref([])

const tableDatas = computed<RecordType[]>(() => props.data)

const slots = useSlots()

/**
 * 表格单元格的插槽
 */
const cellSlots = filterSlots(slots, getTableCellSlotName())

/**
 * 表格单元格表头的插槽
 */
const headerSlots = filterSlots(slots, getTableHeaderSlotName())

/**
 * 表单单项的插槽
 */
const fieldSlots = filterSlots(slots, getFieldSlotName())

/**
 * el-form-item 下一行额外的内容 的插槽
 */
const extraSlots = filterSlots(slots, getExtraSlotName())

/**
 * 表单的ref
 */
const formRefs = shallowRef<Record<string | number, TableFormRefRow[]>>({})
provide(TableFormRefInjectionKey, formRefs)
/**
 * 表单Field的ref
 */
const formFieldRefs = shallowRef<FormFieldRefsType>({})
provide(TableFormFieldRefInjectionKey, formFieldRefs)

// 监听配置更改
watch(
  () => props.columns,
  (val) => {
    subColumns.value = val.filter((item) => unref(item.hideInTable) !== true)
    filterColumns.value = cloneDeep(subColumns.value)
    columnsIsChange.value = !columnsIsChange.value
  },
  {
    deep: true,
    immediate: true,
  }
)

const handleAction = (callbackParams: ButtonsCallBackParams) => {
  emit('clickAction', callbackParams)
}

const handleClickActionConfirmCancel = (
  callbackParams: ButtonsCallBackParams
) => {
  emit('clickActionConfirmCancel', callbackParams)
}

const handleFilterTableConfirm = (_columns: PlusColumn[]) => {
  filterColumns.value = _columns
  subColumns.value = _columns.filter(
    (item) =>
      unref(item.hideInTable) !== true && item.__selfHideInTable !== true
  )
}

const handleFormChange = (data: FormChangeCallBackParams) => {
  emit('formChange', data)
}

defineExpose({
  formRefs,
})
</script>
