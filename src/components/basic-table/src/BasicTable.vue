<template>
  <div class="basic-table">
    <BasicForm
      v-if="searchSchemas.length"
      v-bind="searchProps"
      v-model="searchParams"
      :schemas="searchSchemas"
      :search-loading="loadingStatus"
      @search="handleSearch"
      @reset="handleReset"
    />
    <TableBody
      v-bind="tableProps"
      :schemas="tableSchemas"
      :data="tableDatas"
      :loading="loadingStatus"
    >
      <template v-for="(_, slotName) in $slots" #[slotName]="scope">
        <slot :name="slotName" v-bind="scope" />
      </template>
    </TableBody>
    <BasicPagination
      v-if="pagination"
      v-bind="paginationProps"
      v-model="currentPage"
      @change="handlePaginationChange"
    >
      <template v-if="$slots['pagination-left']" #pagination-left>
        <slot name="pagination-left" />
      </template>
      <template v-if="$slots['pagination-right']" #pagination-right>
        <slot name="pagination-right" />
      </template>
    </BasicPagination>
  </div>
</template>

<script lang="ts" setup>
import type { BasicTableProps, BasicTableEmits } from './types'
import type { Page } from '@/components/basic-pagination'
import type { BasicFormProps } from '@/components/basic-form'

import TableBody from './components/TableBody.vue'
import { BasicPagination } from '@/components/basic-pagination'

import { isFunction, isObject } from '@/utils/is'

defineOptions({
  name: 'BasicTable',
})

const props = withDefaults(defineProps<BasicTableProps>(), {
  schemas: () => [],
  immediate: true,
  loading: false,
  ellipsis: false,
  searchProps: () => ({}),
  tableProps: () => ({}),
  paginationProps: () => ({}),
})

const emits = defineEmits<BasicTableEmits>()

const searchSchemas = computed(() => {
  return props.schemas.filter((item) => isObject(item.searchConfig))
})

const searchParams = ref<Recordable>({})

const tableSchemas = computed(() => {
  return props.schemas.filter((item) => item.visible !== false)
})

const tableDatas = ref<Recordable[]>([])

const loadingStatus = ref(false)

const page = ref<Page>({
  currentPage: 1,
  pageSize: 10,
  total: 0,
})

const query = async () => {
  try {
    if (!isFunction(props.request)) {
      return
    }

    loadingStatus.value = true

    const payload = {
      ...searchParams.value,
      ...{
        [props.pageInfoMap?.currentPage || 'currentPage']:
          page.value.currentPage,
        [props.pageInfoMap?.pageSize || 'pageSize']: page.value.pageSize,
      },
      ...props.params,
    }

    const { data, total: dataTotal } = await props.request(payload)
    const list = (props.postData && props.postData(data)) || data
    tableDatas.value = list || []
    total.value = dataTotal || list.length

    emits('requestComplete', tableDatas.value)
  } catch (error: unknown) {
    emits('requestError', error)
  }
  loadingStatus.value = false
}

if (props.immediate) {
  query()
}

const handlePaginationChange = (_pageInfo: Page): void => {
  page.value = _pageInfo
  query()
  emits('paginationChange', _pageInfo)
}

const handleSearch = (val: Recordable) => {
  const data =
    (props.beforeSearchSubmit && props.beforeSearchSubmit(val)) || val
  searchParams.value = data
  page.value.currentPage = 1
  query()
  emits('search', searchParams.value)
}

const handleReset = (params: Recordable) => {
  searchParams.value = { ...params }
  page.value.currentPage = 1
  query()
  emits('reset', searchParams.value)
}
</script>
