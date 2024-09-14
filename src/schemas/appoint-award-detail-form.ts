import { FormSchema } from "@/components/basic-form";

export const formSchemas: FormSchema[] = [
  {
    label: "奖品名称",
    prop: "awardName",
    component: "input",
    required: true,
  },
  {
    label: "商户编码",
    prop: "storeNumber",
    component: "input",
    required: true,
  },
  {
    label: "商户名称",
    prop: "storeName",
    component: "input",
    required: true,
  },
  {
    label: "奖品数量",
    prop: "number",
    component: "input-number",
    componentProps: {
      min: 0,
    },
    required: true,
  },
  {
    label: "开奖日期",
    prop: "awardDate",
    component: "date-picker",
    required: true,
  },
  {
    label: "开奖开始时间",
    prop: "awardStartTime",
    component: "time-picker",
    componentProps: {
      format: "HH:mm:ss",
    },
    required: true,
  },
  {
    label: "开奖结束时间",
    prop: "awardEndTime",
    component: "time-picker",
    componentProps: {
      format: "HH:mm:ss",
    },
    required: true,
  },
  {
    label: "扫箱内码数量",
    prop: "boxInNumber",
    component: "input-number",
    componentProps: {
      min: 0,
    },
    required: true,
  },
  {
    label: "扫箱码开始时间",
    prop: "boxInStartTime",
    component: "time-picker",
    componentProps: {
      format: "HH:mm:ss",
    },
    required: true,
  },
  {
    label: "扫箱码结束时间",
    prop: "boxInEndTime",
    component: "time-picker",
    componentProps: {
      format: "HH:mm:ss",
    },
    required: true,
  },
  {
    label: "指定奖品中奖次数",
    prop: "awardTimes",
    component: "input-number",
    required: true,
  },
  {
    label: "指定开奖商品",
    prop: "awardProductList",
    component: "input",
    required: true,
  },
  {
    label: "指定扫箱内码商品",
    prop: "scanProductList",
    component: "input",
    required: true,
  },
  {
    label: "状态",
    prop: "status",
    component: "input",
    required: true,
  },
];
