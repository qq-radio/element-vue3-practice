<template>
  <el-dialog
    v-bind="$attrs"
    v-model="dialogVisible"
    :title="dialogTitle"
    :width="width"
    :close-on-press-escape="false"
    :append-to-body="false"
    :before-close="handleCancel"
  >
    <div class="dialog-content" :style="{ maxHeight: height + 'px' }">
      <BasicForm
        ref="basicFormInstance"
        v-model="formModel"
        v-bind="formProps"
        :schemas="schemas"
        :disabled="getDisabled"
        @submit="(values) => emit('submit', values)"
      >
        <template #footer="{ handleSubmit }">
          <template v-if="isView">
            <el-button @click="handleCancel">关闭</el-button>
          </template>
          <template v-else>
            <el-button type="primary" :loading="loading" @click="handleSubmit">
              保存
            </el-button>
            <el-button @click="handleCancel"
              >取消
              <template #dot></template>
            </el-button>
          </template>
        </template>
      </BasicForm>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import type {
  BasicFormDialogProps,
  BasicFormDialogEmits,
  DialogAction,
} from './type'
import type { FormInstance } from 'element-plus'

import { ref, computed, watchEffect } from 'vue'

import { BasicForm } from '@/components/basic-form'

defineOptions({
  name: 'BasicFormDialog',
})

const props = withDefaults(defineProps<BasicFormDialogProps>(), {
  visible: false,
  disabled: false,
  loading: false,
  action: 'add',
  height: 760,
  width: 800,

  modelValue: () => ({}),
  formProps: () => ({}),
})

const emit = defineEmits<BasicFormDialogEmits>()

const titleMap: Record<DialogAction, string> = {
  add: '新增',
  edit: '编辑',
  view: '查看详情',
}

const dialogVisible = ref(false)
const dialogTitle = computed(() => {
  return props.title || titleMap[props.action]
})

const isView = computed(() => props.action === 'view')
const getDisabled = computed(() => props.disabled || isView.value)

const basicFormInstance = ref<FormInstance>()
const formModel = ref<Recordable>({})

watchEffect(() => {
  dialogVisible.value = props.visible
  formModel.value = props.modelValue
})

watch(
  () => dialogVisible.value,
  (visible) => {
    if (visible) {
      basicFormInstance.value?.handleReset()
    }
  }
)

const handleCancel = () => {
  emit('update:visible', false)
}
</script>

<style lang="scss" scoped>
.dialog-content {
  padding: 16px 60px;
  overflow-y: auto;
}
</style>
