import { TableSchema } from "@/components/basic-table";

export const tableSchemas: TableSchema[] = [
  {
    label: "测试-link",
    prop: "link",
  },
  {
    label: "测试-tag",
    prop: "tag",
  },
  {
    label: "测试-progress",
    prop: "progress",
  },
  {
    label: "searchable",
    prop: "justinput",
    searchable: true,
  },
  {
    label: "searchConfig-select作为搜索",
    prop: "select",
    searchConfig: {
      label: "测试-select作为搜索",
      prop: "select",
      component: "input",
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
  },
  {
    label: "操作列",
    prop: "action",
    slot: "action",
  },
];
