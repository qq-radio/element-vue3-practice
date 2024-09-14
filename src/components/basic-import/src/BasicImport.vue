<template>
  <div>
    <el-dialog title="导入" v-model="upload.open" width="650px" append-to-body>
      <div class="template-download">
        <span>下载模板：</span>
        <template v-for="(item, index) in templateList" :key="index">
          <div @click="downExcelTemp(item.val, item.label)">
            {{ item.label }}模板
          </div>
        </template>
      </div>
      <div style="margin: 15px 0">
        <span>选择导入数据：</span>
        <el-select
          style="width: 70%"
          v-model="specifyType"
          placeholder="请选择导入定投数据"
        >
          <el-option
            v-for="item in templateList"
            :key="item.val"
            :label="item.label + '数据'"
            :value="item.val"
          >
          </el-option>
        </el-select>
      </div>
      <el-upload
        v-if="specifyType"
        ref="upload"
        :limit="1"
        accept=".xlsx, .xls"
        method="post"
        :headers="headers"
        :action="uploadAction"
        :disabled="upload.isUploading"
        :on-progress="handleFileUploadProgress"
        :on-success="handleFileSuccess"
        :on-error="handleFileError"
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
      <div class="tip-text">只能导入”不固定奖项“</div>
      <template #footer>
        <div class="dialog-footer">
          <el-button
            type="primary"
            :loading="upload.isUploading"
            @click="submitFileForm"
            >确定</el-button
          >
          <el-button @click="upload.open = false">取消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, h } from "vue";
import { ElMessage } from "element-plus";
import { fileImport } from "@/api/activityConfig/activityConfig.js";
import store from "@/store";

const templateList = ref([
  { val: 1, label: "定投地区" },
  { val: 2, label: "定投商户" },
  { val: 3, label: "定投SD订单" },
  { val: 4, label: "国家行政区域" },
]);

const specifyType = ref("");
const upload = reactive({
  open: false,
  isUploading: false,
  url: "",
  fileName: "",
});

const errorVisible = ref(false);
const errorData = ref([]);

const props = defineProps({
  activityAwardControlConfigId: {
    type: String,
    default: "",
  },
  activityId: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["success"]);

const headers = computed(() => {
  return {
    Authorization: "Bearer " + store.getters.access_token,
  };
});

const uploadAction = computed(() => {
  return `/tsf-activity/activityAwardControlDetail/fileUpload`;
});

const downExcelTemp = (type, label) => {
  downBlobFile(
    `/tsf-activity/activityAwardControlDetail/exportTemplate/${type}?activityId=${props.activityId}`,
    {},
    `${label}模板`,
    "get"
  );
};

const handleFileUploadProgress = () => {
  upload.isUploading = true;
};

const handleFileError = (error) => {
  const message = JSON.parse(error.message);
  ElMessage.error((message && message.msg) || "上传失败,数据格式不合法!");
  upload.open = false;
};

const handleFileSuccess = (response) => {
  upload.isUploading = false;
  if (response.code === 1) {
    ElMessage.error(response.msg || "上传失败");
    errorVisible.value = true;
    errorData.value = response.data;
  } else {
    if (response.data && response.data.failCount) {
      let errorEl = [];
      response.data.failMsgs.forEach((v) => {
        errorEl.push(h("div", { style: "color: #f56c6c;" }, v));
      });
      ElMessage({
        message: h("p", { style: "padding: 5px 20px;" }, errorEl),
        type: "error",
        duration: 0,
        showClose: true,
        customClass: "elMessage",
      });
      return;
    }
    upload.url = response.data.fileUrl;
    upload.fileName = response.data.fileName;
  }
};

const submitFileForm = () => {
  if (!specifyType.value) {
    ElMessage.error("请先选择导入定投数据");
    return;
  }
  const params = {
    activityAwardControlConfigId: props.activityAwardControlConfigId,
    specifyType: specifyType.value,
    data: {
      fileUrl: upload.url,
      fileName: upload.fileName,
    },
  };
  fileImport(params).then((res) => {
    if (res.data.code != 0) {
      ElMessage.warning(res.data.msg);
      return;
    }
    ElMessage.success("导入成功");
    upload.open = false;
    emit("success");
  });
};

const show = () => {
  specifyType.value = "";
  upload.isUploading = false;
  upload.open = true;
};
</script>

<style lang="scss">
.template-download {
  display: flex;
}
.template-download div {
  margin-right: 30px;
  color: #409eff;
  cursor: pointer;
}
.tip-text {
  margin-top: 5px;
  font-size: 12px;
  color: red;
}
.elMessage {
  width: 350px;
}
</style>
