<template>
  <el-config-provider>
    <BaseHeader />
    <div class="flex main-container">
      <BaseSide />
      <div w="1200px" m="1.5">
        <BasicTable
          ref="basicTableRef"
          :importConfig="importConfig"
          :exportConfig="exportConfig"
          :schemas="tableSchemas"
          :method="loadTableData"
          hasSelection
          autoLoad
          @selection-change="handleSelectionChange"
        >
          <template #operation-before>
            <el-button type="primary" @click="openDialog('add')">
              新增
            </el-button>
          </template>
          <template #operation-after>
            <el-button type="primary" @click="batchEnable">
              批量生效
            </el-button>
            <el-button type="primary" @click="batchDisable">
              批量失效
            </el-button>
          </template>
          <template #actions="{ row }">
            <a @click="openDialog('edit')">编辑</a>
            <a @click="openDialog('view')">查看详情</a>
            <a @click="handleDelete(row)">删除</a>
          </template>
        </BasicTable>
        <BasicFormDialog
          v-model:visible="dialogVisible"
          v-model="formModel"
          :action="dialogAction"
          :schemas="formSchemas"
          :formProps="{
            labelWidth: '140px',
          }"
          @submit="handleSubmit"
          @reset="handleReset"
        />
      </div>
    </div>
  </el-config-provider>
</template>

<script setup lang="ts">
import type { DialogAction } from "@/components/basic-form-dialog";

// 活动设置
// import { tableSchemas } from './schemas/appoint-award-set-table'
// import { formSchemas } from './schemas/appoint-award-set-form'

// // 活动明细设置
import { tableSchemas } from "./schemas/appoint-award-detail-table";
import { formSchemas } from "./schemas/appoint-award-detail-form";

const importConfig = {
  templateName: "巡检单价表数据导入模板",
  importUrl: "xxx",
};

const exportConfig = {
  fileName: "巡检单价表",
  exportUrl: "xxxxxxxx",
};

const loadTableData = () => {};

const dialogVisible = ref(false);

const toggleDialogVisible = () => {
  dialogVisible.value = !dialogVisible.value;
};

const openDialog = (action) => {
  toggleDialogVisible();
  dialogAction.value = action;
};

const dialogAction = ref<DialogAction>("add");

const formModel = ref({
  status: "0",
  name: "",
  rate: 2,
  progress: 100,
  switch: true,
  time: new Date().toString(),
  endTime: [],
  img: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
});

const handleSubmit = (values: Recordable) => {
  console.log("表单提交", values);
};

const handleReset = () => {
  console.log("重置表单", "handleReset");
};

const selectedRows = ref([]);

const handleSelectionChange = (rows) => {
  selectedRows.value = rows;
  console.log("勾选项", rows);
};

const validateSelect = () => {
  if (selectedRows.value.length) {
    return;
  }

  throw new Error("请选择需要批量的数据");
};

const batchEnable = () => {
  validateSelect();
  console.log("点击了批量生效");
};

const batchDisable = () => {
  validateSelect();
  console.log("点击了批量失shishi效");
};

const handleDelete = (row) => {
  console.log("要删除的行、行id是:", row, row.id);
};
</script>
