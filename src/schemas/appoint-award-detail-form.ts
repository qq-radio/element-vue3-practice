import { FormSchema } from '@/components/basic-form'

export const formSchemas: FormSchema[] = [
  {
    label: '奖品名称',
    prop: 'awardName',
    component: 'input',
  },
  {
    label: '商户编码',
    prop: 'storeNumber',
    component: 'input',
  },
  {
    label: '商户名称',
    prop: 'storeName',
    component: 'input',
  },
  {
    label: '奖品数量',
    prop: 'number',
    component: 'input',
  },
  {
    label: '开奖日期',
    prop: 'awardDate',
    component: 'date-picker',
  },
  {
    label: '开奖开始时间',
    prop: 'awardStartTime',
    component: 'time-picker',
  },
  {
    label: '开奖结束时间',
    prop: 'awardEndTime',
    component: 'time-picker',
  },
  {
    label: '扫箱内码数量',
    prop: 'boxInNumber',
    component: 'input-number',
  },
  {
    label: '扫箱码开始时间',
    prop: 'boxInStartTime',
    component: 'time-picker',
  },
  {
    label: '扫箱码结束时间',
    prop: 'boxInEndTime',
    component: 'time-picker',
  },
  {
    label: '指定奖品中奖次数',
    prop: 'awardTimes',
    component: 'input-number',
  },
  {
    label: '指定开奖商品',
    prop: 'awardProductList',
    component: 'input',
  },
  {
    label: '指定扫箱内码商品',
    prop: 'scanProductList',
    component: 'input',
  },
  {
    label: '状态',
    prop: 'status',
    component: 'input',
  },
]
