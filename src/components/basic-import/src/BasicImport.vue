<template>
  <div class="basic-import">
    <el-button type="primary" @click="upload.visible = true">
      <el-icon><Upload /></el-icon><span>导入</span>
    </el-button>
    <el-dialog
      v-model="upload.visible"
      title="导入"
      width="650px"
      append-to-body
    >
      <div>
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
        :disabled="upload.isUploading"
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
        <el-button @click="upload.visible = false">取消</el-button>
        <el-button
          type="primary"
          :loading="upload.isUploading"
          @click="handleSubmit"
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

const upload = reactive({
  visible: true,
  isUploading: false,

  fileUrl: "",
  fileName: "",
});

const errorData = ref([]);

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
  upload.isUploading = true;
};

const handleUploadError = (error) => {
  const message = JSON.parse(error.message);
  ElMessage.error((message && message.msg) || "上传失败");
  upload.isUploading = true;
};

const handleUploadSuccess = (response) => {
  try {
    upload.isUploading = false;

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
    upload.fileUrl = response.data.fileUrl;
    upload.fileName = response.data.fileName;
  } catch (error) {}
};

const handleSubmit = async () => {
  try {
    const params = {
      fileUrl: upload.fileUrl,
      fileName: upload.fileName,
    };

    const response = await fileImport(params).then(() => {
      const { code, msg } = response.data;

      if (code !== 0) {
        ElMessage.error(msg);
        return;
      }

      ElMessage.success("导入成功");
      emit("success");

      upload.visible = false;
    });
  } catch (error: any) {
    ElMessage.error(error);
  } finally {
    upload.isUploading = false;
  }
};
</script>

<style lang="scss">
@import "./style.scss";
</style>
