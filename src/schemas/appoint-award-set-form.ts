import { FormSchema } from '@/components/basic-form'

export const formSchemas: FormSchema[] = [
  {
    label: '指定开奖名称',
    prop: 'name',
    component: 'input',
    required: true,
  },
  {
    label: '活动id',
    prop: 'activityConfigId',
    component: 'input',
    required: true,
  },
  {
    label: '状态',
    prop: 'status',
    component: 'input',
    required: true,
  },
]
