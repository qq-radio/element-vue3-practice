<template>
  <el-form
    ref="formInstance"
    :label-width="labelWidth"
    :label-position="labelPosition"
    :label-suffix="labelSuffix"
    :model="formModel"
  >
    <el-row v-bind="rowProps">
      <template v-for="schemaItem in formSchema" :key="schemaItem.prop">
        <template v-if="schemaItem.component === 'sub-title'">
          <el-col class="mb-3 ml-8 font-bold text-lg">
            {{ schemaItem.label }}
          </el-col>
        </template>
        <template v-else>
          <el-col
            v-if="getVIf(schemaItem)"
            v-bind="getColProps(schemaItem)"
            class="pr-4"
          >
            <el-form-item
              v-bind="schemaItem.formItemProps"
              :label="getLabel(schemaItem)"
              :prop="schemaItem.prop"
              :rules="schemaItem.rules"
            >
              <slot
                v-if="schemaItem.slot"
                :name="schemaItem.slot"
                :model="formModel"
                style="width: 100%"
              />
              <component
                :is="getComponent(schemaItem.component)"
                v-else
                v-bind="schemaItem.componentProps"
                v-model="formModel[schemaItem.prop]"
                :disabled="disabled"
                style="width: 100%"
                @change="(...v: unknown[]) => onChange(v, schemaItem)"
              />
              <div v-if="getVIfMax(schemaItem)" style="text-align: right">
                {{ getMaxLimitText(schemaItem) }}
              </div>
            </el-form-item>
          </el-col>
        </template>
      </template>
    </el-row>
    <el-row v-if="hasFooter" v-bind="rowProps">
      <slot name="footer" v-bind="{ handleReset, handleSubmit }">
        <el-button v-if="hasReset" @click="handleReset">
          {{ resetText }}
        </el-button>
        <el-button type="primary" :loading="loading" @click="handleSubmit">
          {{ submitText }}
        </el-button>
      </slot>
    </el-row>
  </el-form>
</template>

<script lang="ts" setup>
import type { BasicFormProps, BasicFormEmits, FormSchema } from "./type";
import type { FormInstance } from "element-plus";

import { normalizeSchema } from "./tools/normalize-schema";
import { getComponent } from "./tools/component";
import { isArray, isObject, isFunction, isUndefined } from "lodash";
import dayjs from "dayjs";

defineOptions({
  name: "BasicForm",
  inheritAttrs: false,
});

const props = withDefaults(defineProps<BasicFormProps>(), {
  model: () => ({}),
  schemas: () => [],
  loading: false,

  rowProps: () => ({}),
  colProps: () => ({ span: 24 }),
  formItemProps: () => ({}),

  hasLabel: true,
  labelSuffix: ":",
  labelWidth: "100px",
  labelPosition: "right",

  hasFooter: true,
  hasReset: true,
  resetText: "重置",
  submitText: "提交",

  hasErrorTip: true,
});

const emit = defineEmits<BasicFormEmits>();

const formInstance = ref<FormInstance>();
const formProps = ref<Partial<BasicFormProps>>();
const formSchema = ref<FormSchema[]>([]);
const formModel = ref<Recordable>({});
const defaultFormModel = ref<Recordable>({});

const getProps = computed(() => {
  return { ...props, ...unref(formProps) } as BasicFormProps;
});

watchEffect(() => {
  formSchema.value = normalizeSchema(getProps.value.schemas);
  formModel.value = getProps.value.model || {};
  defaultFormModel.value = setDefaultFormModel(getProps.value.schemas);
});

function setDefaultFormModel(schemas: FormSchema[]) {
  return schemas.reduce(
    (acc, cur) =>
      cur.defaultValue
        ? {
            ...acc,
            [cur.prop]: [cur.defaultValue],
          }
        : acc,
    {}
  );
}

function getVIf(schemaItem: FormSchema) {
  const { vIf } = schemaItem;

  if (isUndefined(vIf)) {
    return true;
  }

  if (isFunction(vIf)) {
    return vIf(formModel.value, schemaItem);
  }
}

function getColProps(schemaItem?: FormSchema) {
  return schemaItem?.colProps || props.colProps;
}

function getLabel(schemaItem: FormSchema) {
  const hasLabel = isUndefined(schemaItem.hasLabel)
    ? props.hasLabel
    : schemaItem.hasLabel;
  return hasLabel ? schemaItem.label : "";
}

function getVIfMax(schemaItem: FormSchema) {
  return (
    (schemaItem.component === "input" || schemaItem.component === "textarea") &&
    schemaItem.max
  );
}

function getMaxLimitText(schemaItem: FormSchema) {
  return (
    ((formModel.value[schemaItem.prop] as string)?.length || 0) +
    "/" +
    schemaItem.max
  );
}

function formatTime(time, formatType) {
  return dayjs(time).format(formatType);
}

function onTimeRangeChange(values: any, schemaItem: FormSchema) {
  const { componentProps: { timeRangeMapFields, format } = {} } = schemaItem;

  if (!isArray(timeRangeMapFields)) {
    return;
  }

  const [startDate, endDate] = timeRangeMapFields;
  const [value = []] = values;

  if (!value && !startDate && !endDate) {
    return;
  }

  setFieldsValue({
    [startDate]: formatTime(value[0], format),
    [endDate]: formatTime(value[1], format),
  });
}

function setFieldsValue(values: Recordable) {
  if (!isObject(values)) {
    return;
  }

  for (const [field, value] of Object.entries(values)) {
    formModel.value[field] = value;
  }
}

const onChange = (values: unknown, schemaItem: FormSchema) => {
  if (schemaItem.component === "time-picker") {
    onTimeRangeChange(values, schemaItem);
  }

  emit("change", values, schemaItem);
};

const handleReset = () => {
  formModel.value = {};
  formInstance.value?.clearValidate();
  emit("reset");
};

const handleSubmit = async () => {
  try {
    const valid = await formInstance.value?.validate();
    if (valid) {
      emit("submit", formModel.value);
    }
  } catch (error: unknown) {
    console.error("表单提交错误", error);
  }
  return false;
};

defineExpose({
  setFieldsValue,
  handleReset,
});
</script>

<style lang="scss" scoped>
:deep .el-row {
  &:last-child {
    float: right;
  }
}
</style>
