import type { ComponentType } from '../types/form'

function getPrefix(component: ComponentType) {
  let prefix
  switch (component) {
    case 'input':
    case 'input-number':
    case 'textarea':
      prefix = '请输入'
      break
    case 'switch':
    case 'radio-group':
    case 'checkbox-group':
    case 'select':
    case 'tree-select':
    case 'date-picker':
    case 'time-picker':
      prefix = '请选择'
      break
    default:
      prefix = '请输入'
      break
  }

  return prefix
}

export { getPrefix }
