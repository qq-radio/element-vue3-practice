import { TableSchema } from '@/components/basic-table'

export const tableSchemas: TableSchema[] = [
  {
    visible: false,
    searchConfig: {
      label: '指定开奖名称',
      prop: 'appointAwardName',
      component: 'input',
    },
  },
  {
    visible: false,
    searchConfig: {
      label: '活动名称',
      prop: 'storeName',
      component: 'input',
    },
  },
  {
    label: '指定开奖ID',
    prop: 'id',
  },
  {
    label: '指定开奖名称',
    prop: 'name',
  },
  {
    label: '活动名称',
    prop: 'activityName',
  },
  {
    label: '状态',
    prop: 'status',
    searchConfig: {
      label: '状态',
      prop: 'status',
      component: 'select',
    },
  },
  {
    label: '活动开始时间',
    prop: 'startTime',
  },
  {
    label: '活动结束时间',
    prop: 'endTime',
  },
  {
    label: '创建人',
    prop: 'createBy',
  },
  {
    label: '创建时间',
    prop: 'createTime',
  },
  {
    label: '修改人',
    prop: 'updateBy',
  },
  {
    label: '修改时间',
    prop: 'updateTime',
  },
]
