<template>
  <el-config-provider>
    <BaseHeader />
    <div class="flex main-container">
      <BaseSide />
      <div w="full" m="1.5" bg-white>
        <BasicTable
          ref="basicTableRef"
          :importConfig="importConfig"
          :exportConfig="exportConfig"
          :schemas="tableSchemas"
          :method="loadTableData"
          autoLoad
        />
        <BasicFormDialog
          :schemas="formSchemas"
          @submit="handleSubmit"
          @reset="handleReset"
        />
      </div>
    </div>
  </el-config-provider>
</template>

<script setup lang="ts">
import { tableSchemas } from "./schemas/table";
import { formSchemas } from "./schemas/form";

const importConfig = {};

const exportConfig = {};

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

const loadTableData = () => {};

const handleSubmit = (values: Recordable) => {
  console.log("表单提交", values);
};

const handleReset = () => {
  console.log("重置表单", "handleReset");
};
</script>

<style></style>
