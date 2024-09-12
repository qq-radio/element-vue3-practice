import type { FormSchema } from "@/components/basic-form";

export const formSchemas: FormSchema[] = [
  {
    label: "指定奖品中奖次数",
    prop: "name",
    component: "input",
    rules: [
      {
        required: true,
        message: "请输入名称111",
      },
    ],
  },
  {
    label: "标题",
    prop: "nameee",
    component: "sub-title",
  },
  {
    label: "名称",
    prop: "nameeeee",
    component: "input",
    hasLabel: false,
    rules: [
      {
        required: true,
        message: "请输入名称111",
      },
    ],
  },
  {
    label: "√状态select",
    prop: "tag",
    component: "select",
    rules: [
      {
        required: true,
        message: "请输入标签",
      },
    ],
    componentProps: {
      options: [
        {
          label: "未解决",
          value: "0",
          color: "red",
        },
        {
          label: "已解决",
          value: "1",
          color: "blue",
        },
        {
          label: "解决中",
          value: "2",
          color: "yellow",
        },
        {
          label: "失败",
          value: "3",
          color: "red",
        },
      ],
    },
  },
  {
    label: "评分",
    prop: "rate",
    component: "rate",
  },
  {
    label: "是否显示",
    prop: "switch",
    component: "switch",
  },
  {
    label: "时间",
    prop: "time",
    component: "date-picker",
  },
  {
    label: "数量",
    prop: "number",
    component: "input-number",
  },
  {
    label: "√要求",
    prop: "demand",
    component: "checkbox",
    componentProps: {
      options: [
        {
          label: "四六级",
          value: "0",
        },
        {
          label: "计算机二级证书",
          value: "1",
        },
        {
          label: "普通话证书",
          value: "2",
        },
      ],
    },
  },
  {
    label: "梦想",
    prop: "gift",
    component: "radio-group",
    componentProps: {
      options: [
        {
          label: "诗",
          value: "0",
        },
        {
          label: "远方",
          value: "1",
        },
        {
          label: "美食",
          value: "2",
        },
      ],
    },
  },
  {
    label: "到期时间",
    prop: "endTime",
    component: "date-picker",
    componentProps: {
      type: "datetimerange",
      startPlaceholder: "请选择开始时间",
      endPlaceholder: "请选择结束时间",
    },
  },
  {
    label: "说明",
    prop: "desc",
    component: "textarea",
    componentProps: {
      maxlength: 10,
      showWordLimit: true,
      autosize: { minRows: 2, maxRows: 4 },
    },
  },
  {
    label: "说明",
    prop: "desc",
    component: "textarea",
    componentProps: {
      maxlength: 10,
      showWordLimit: true,
      autosize: { minRows: 2, maxRows: 4 },
    },
  },
  {
    label: "说明",
    prop: "desc",
    component: "textarea",
    componentProps: {
      maxlength: 10,
      showWordLimit: true,
      autosize: { minRows: 2, maxRows: 4 },
    },
  },
  {
    label: "说明",
    prop: "desc",
    component: "textarea",
    componentProps: {
      maxlength: 10,
      showWordLimit: true,
      autosize: { minRows: 2, maxRows: 4 },
    },
  },
  {
    label: "说明",
    prop: "desc",
    component: "textarea",
    componentProps: {
      maxlength: 10,
      showWordLimit: true,
      autosize: { minRows: 2, maxRows: 4 },
    },
  },
  {
    label: "说明",
    prop: "desc",
    component: "textarea",
    componentProps: {
      maxlength: 10,
      showWordLimit: true,
      autosize: { minRows: 2, maxRows: 4 },
    },
  },
  {
    label: "说明",
    prop: "desc",
    component: "textarea",
    componentProps: {
      maxlength: 10,
      showWordLimit: true,
      autosize: { minRows: 2, maxRows: 4 },
    },
  },
  {
    label: "说明",
    prop: "desc",
    component: "textarea",
    componentProps: {
      maxlength: 10,
      showWordLimit: true,
      autosize: { minRows: 2, maxRows: 4 },
    },
  },
  {
    label: "说明——最后一个",
    prop: "desc",
    component: "textarea",
    componentProps: {
      maxlength: 10,
      showWordLimit: true,
      autosize: { minRows: 2, maxRows: 4 },
    },
  },
];
