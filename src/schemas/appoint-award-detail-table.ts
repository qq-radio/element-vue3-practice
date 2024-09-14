import { TableSchema } from "@/components/basic-table";
import Enum from "@/utils/enum";
import { mapObjectArrayFields } from "@/utils";

export const EFFECT_STATUS_ENUM = new Enum([
  ["NOT_EFFECT", 0, "未生效"],
  ["EFFECTED", 1, "生效"],
]);

export const tableSchemas: TableSchema[] = [
  {
    label: "状态",
    prop: "status",
    searchConfig: {
      label: "状态",
      prop: "status",
      component: "select",
      componentProps: {
        options: mapObjectArrayFields(EFFECT_STATUS_ENUM.getList(), {
          label: "text",
        }),
      },
    },
  },
  {
    label: "图片有没有显示？？？？",
    prop: "disImage",
    displayType: "img",
  },
  {
    label: "商户编码",
    prop: "storeNumber",
  },
  {
    label: "商户名称",
    prop: "storeName",
    searchConfig: {
      label: "商户名称",
      prop: "storeName",
      component: "input",
    },
  },
  {
    label: "奖品数量",
    prop: "number",
  },
  {
    label: "开奖日期",
    prop: "awardDate",
    searchConfig: {
      label: "开奖日期",
      prop: "awardDate",
      component: "date-picker",
    },
  },
  {
    visible: false,
    searchConfig: {
      label: "开奖时间",
      prop: "awardTimeRange",
      component: "time-picker",
      componentProps: {
        isRange: true,
        format: "HH:mm:ss",
        timeRangeMapFields: ["awardStartTime", "awardEndTime"],
      },
    },
  },
  {
    label: "开奖开始时间",
    prop: "awardStartTime",
  },
  {
    label: "开奖结束时间",
    prop: "awardEndTime",
  },
  {
    label: "扫箱内码数量",
    prop: "boxInNumber",
  },
  {
    label: "扫箱码开始时间",
    prop: "boxInStartTime",
  },
  {
    label: "扫箱码结束时间",
    prop: "boxInEndTime",
  },
  {
    label: "指定奖品中奖次数",
    prop: "awardTimes",
    width: 160,
  },
  {
    label: "指定开奖商品",
    prop: "awardProductList",
  },
  {
    label: "指定扫箱内码商品",
    prop: "scanProductList",
    width: 160,
  },
  {
    label: "创建时间",
    prop: "createTime",
    searchConfig: {
      label: "创建时间",
      prop: "createTimeRange",
      component: "time-picker",
      componentProps: {
        isRange: true,
        format: "HH:mm:ss",
        timeRangeMapFields: ["createStartTime", "createEndTime"],
      },
    },
  },
  {
    label: "是否生效",
    prop: "status",
    formatter: ({ value }) => EFFECT_STATUS_ENUM.getText(value),
  },
  {
    label: "操作",
    prop: "actions",
    slot: "actions",
    width: 180,
  },
];
