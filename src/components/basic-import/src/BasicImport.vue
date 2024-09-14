<template>
  <div class="basic-import">
    <el-button type="primary" @click="isUploadVisible = true">
      <el-icon><Upload /></el-icon><span>导入</span>
    </el-button>
    <el-dialog
      v-model="isUploadVisible"
      title="导入"
      width="650px"
      append-to-body
    >
      <div class="basic-import-dialog__template">
        <span>下载模板：</span>
        <span style="color: #409eff" @click="downExcelTemplate">
          {{ config.templateName }}
        </span>
      </div>
      <el-upload
        ref="upload"
        method="post"
        accept=".xlsx, .xls"
        :limit="1"
        :headers="headers"
        :action="uploadAction"
        :disabled="isUploading"
        :on-progress="handleUploadProgress"
        :on-success="handleUploadSuccess"
        :on-error="handleUploadError"
        :auto-upload="true"
        drag
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
      </el-upload>
      <div class="tip-text">
        只能导入xls、xlsx格式文件，不超过5MB，每次只能导入10000条数据。
      </div>
      <template #footer>
        <el-button @click="isUploadVisible = false">取消</el-button>
        <el-button type="primary" :loading="isUploading" @click="handleSubmit"
          >确定</el-button
        >
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import type { BasicImportProps, BasicImportEmits } from "./type";

// import { fileImport } from "@/api/activityConfig/activityConfig.js";
// import store from "@/store";

import { ref, reactive, computed, h } from "vue";
import type { VNode } from "vue";
import { ElMessage } from "element-plus";
import { Upload } from "@element-plus/icons-vue";

defineOptions({
  name: "BasicImport",
});

const props = withDefaults(defineProps<BasicImportProps>(), {});

const emit = defineEmits<BasicImportEmits>();

const isUploadVisible = ref(false);
const isUploading = ref(false);

const uploadResult = reactive({
  fileUrl: "",
  fileName: "",
});

const headers = computed(() => ({
  // Authorization: "Bearer " + store.getters.access_token,
}));

const uploadAction = "/tsf-activity/activityAwardControlDetail/fileUpload";

const downExcelTemplate = () => {
  const { templateName = "模板", importUrl } = props.config;
  const params = props.params;

  if (!importUrl) {
    ElMessage.error("导入模板链接不能为空");
    return;
  }

  // downBlobFile(importUrl, params, templateName, "get");
};

const handleUploadProgress = () => {
  isUploading.value = true;
};

const handleUploadError = (error) => {
  const message = JSON.parse(error.message);
  ElMessage.error((message && message.msg) || "上传失败");
  isUploading.value = true;
};

const handleUploadSuccess = (response) => {
  try {
    isUploading.value = false;

    if (response.code === 1) {
      ElMessage.error(response.msg || "上传失败");
      return;
    }

    const { failCount, failMsgs } = response.data;

    if (failCount) {
      let errorNodes = <VNode[]>[];

      failMsgs.forEach((v) => {
        errorNodes.push(h("div", { style: "color: #f56c6c" }, v));
      });

      ElMessage({
        message: h("p", { style: "padding: 5px 20px;" }, errorNodes),
        showClose: true,
        duration: 0,
        type: "error",
        customClass: "message-text",
      });
    }
    uploadResult.fileUrl = { ...response.data };
  } catch (error) {}
};

const handleSubmit = async () => {
  try {
    const params = {
      fileUrl: uploadResult.fileUrl,
      fileName: uploadResult.fileName,
    };

    const response = await fileImport(params).then(() => {
      const { code, msg } = response.data;

      if (code !== 0) {
        ElMessage.error(msg);
        return;
      }

      ElMessage.success("导入成功");
      emit("success");

      isUploadVisible.value = false;
    });
  } catch (error: any) {
    ElMessage.error(error);
  } finally {
    isUploading.value = false;
  }
};
</script>

<style lang="scss">
@import "./style.scss";
</style>
