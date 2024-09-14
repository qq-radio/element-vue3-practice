<template>
  <el-button type="primary" icon="download" @click="handleExport">
    导出
  </el-button>
</template>

<script lang="ts" setup>
import { BasicExportProps, BasicExportEmits } from "./type";

import { downBlobFile } from "@/util/index";
import { isObject } from "lodash";

import { ElMessage } from "element-plus";

defineOptions({
  name: "BasicExport",
});

const props = withDefaults(defineProps<BasicExportProps>(), {});

const emit = defineEmits<BasicExportEmits>();

const handleError = (message) => {
  ElMessage.error(message);
  throw new Error(message);
};

const handleExport = async () => {
  try {
    const { fileName = "导出文件", exportUrl } = props.config;
    const params = props.params;

    if (!exportUrl) {
      handleError("导出链接不能为空");
    }

    if (!isObject(params)) {
      handleError("导出参数不能为空");
    }

    await downBlobFile(exportUrl, params, fileName);

    ElMessage.success("导出成功");
    emit("success");
  } catch (error) {
    handleError(`导出失败:${error}`);
    emit("fail");
  } finally {
    emit("complete");
  }
};
</script>
