import { TableSchema } from '@/components/basic-table'

export const tableSchemas: TableSchema[] = [
  {
    visible: false,
    searchConfig: {
      label: '创建开始时间',
      prop: 'createStartTime',
      component: 'input',
    },
  },
  {
    visible: false,
    searchConfig: {
      label: '创建结束时间',
      prop: 'createEndTime',
      component: 'input',
    },
  },
  {
    label: '奖品名称',
    prop: 'awardName',
    searchConfig: {
      label: '奖品名称',
      prop: 'awardName',
      component: 'input',
    },
  },
  {
    label: '商户编码',
    prop: 'storeNumber',
  },
  {
    label: '商户名称',
    prop: 'storeName',
    searchConfig: {
      label: '商户名称',
      prop: 'storeName',
      component: 'input',
    },
  },
  {
    label: '奖品数量',
    prop: 'number',
  },
  {
    label: '开奖日期',
    prop: 'awardDate',
    searchConfig: {
      label: '开奖日期',
      prop: 'awardDate',
      component: 'input',
    },
  },
  {
    label: '开奖开始时间',
    prop: 'awardStartTime',
    searchConfig: {
      label: '开奖开始时间',
      prop: 'awardStartTime',
      component: 'input',
    },
  },
  {
    label: '开奖结束时间',
    prop: 'awardEndTime',
    searchConfig: {
      label: '开奖结束时间',
      prop: 'awardEndTime',
      component: 'input',
    },
  },
  {
    label: '扫箱内码数量',
    prop: 'boxInNumber',
  },
  {
    label: '扫箱码开始时间',
    prop: 'boxInStartTime',
  },
  {
    label: '扫箱码结束时间',
    prop: 'boxInEndTime',
  },
  {
    label: '指定奖品中奖次数',
    prop: 'awardTimes',
  },
  {
    label: '指定开奖商品',
    prop: 'awardProductList',
  },
  {
    label: '指定扫箱内码商品',
    prop: 'scanProductList',
  },
  {
    label: '创建时间',
    prop: 'createTime',
  },
  {
    label: '状态',
    prop: 'status',
  },
]
