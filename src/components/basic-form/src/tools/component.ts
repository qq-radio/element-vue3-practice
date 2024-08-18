import type { ComponentType } from '../types/form'
import {
  ElInput,
  ElInputNumber,
  ElDatePicker,
  ElTimePicker,
  ElCheckbox,
  ElCascader,
  ElTreeSelect,
  ElSwitch,
  ElRate,
  ElSlider,
  ElTransfer,
  ElColorPicker,
} from 'element-plus'
import BasicCheckboxGroup from '@/components/basic-checkbox/BasicCheckboxGroup.vue'
import BasicRadioGroup from '@/components/basic-radio/BasicRadioGroup.vue'
import BasicSelect from '@/components/basic-select/BasicSelect.vue'
import type { Component } from 'vue'

export type ComponentMapValue = {
  component: Component
  componentProps: Recordable
}

export const componentMap: Record<ComponentType, ComponentMapValue> = {
  input: {
    component: ElInput,
    componentProps: {
      placeholder: '请输入',
      allowClear: true,
    },
  },
  'input-number': {
    component: ElInputNumber,
    componentProps: {
      placeholder: '请输入',
      allowClear: true,
    },
  },
  textarea: {
    component: ElInput,
    componentProps: {
      placeholder: '请输入',
      allowClear: true,
    },
  },
  'date-picker': {
    component: ElDatePicker,
    componentProps: {
      placeholder: ['开始时间', '结束时间'],
      allowClear: true,
    },
  },
  'time-picker': {
    component: ElTimePicker,
    componentProps: {
      placeholder: '请选择',
      allowClear: true,
    },
  },
  'radio-group': {
    component: BasicRadioGroup,
    componentProps: {
      placeholder: '请选择',
      allowClear: true,
    },
  },
  checkbox: {
    component: ElCheckbox,
    componentProps: {
      placeholder: '请选择',
      allowClear: true,
    },
  },
  'checkbox-group': {
    component: BasicCheckboxGroup,
    componentProps: {
      placeholder: '请选择',
      allowClear: true,
    },
  },
  select: {
    component: BasicSelect,
    componentProps: {
      placeholder: '请选择',
      allowClear: true,
    },
  },
  'tree-select': {
    component: ElTreeSelect,
    componentProps: {
      placeholder: '请选择',
      allowClear: true,
    },
  },
  switch: {
    component: ElSwitch,
    componentProps: {
      placeholder: '请选择',
      allowClear: true,
    },
  },
  rate: {
    component: ElRate,
    componentProps: {
      placeholder: '请选择',
      allowClear: true,
    },
  },
  slider: {
    component: ElSlider,
    componentProps: {
      placeholder: '请选择',
      allowClear: true,
    },
  },
  transfer: {
    component: ElTransfer,
    componentProps: {
      placeholder: '请选择',
      allowClear: true,
    },
  },
  cascader: {
    component: ElCascader,
    componentProps: {
      placeholder: '请选择',
      allowClear: true,
    },
  },
  'color-picker': {
    component: ElColorPicker,
    componentProps: {
      placeholder: '请选择',
      allowClear: true,
    },
  },
  title: {
    component: ElColorPicker,
    componentProps: {
      placeholder: '请选择',
      allowClear: true,
    },
  },
  upload: {
    component: ElColorPicker,
    componentProps: {
      placeholder: '请选择',
      allowClear: true,
    },
  },
}

function getComponent(component: ComponentType): Component {
  return componentMap[component]?.component
}

function getComponentProps(component: ComponentType): Recordable {
  return componentMap[component]?.componentProps
}

export { getComponent, getComponentProps }
