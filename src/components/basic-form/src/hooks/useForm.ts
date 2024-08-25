import type {
  FormProps,
  FormAction,
  UseFormReturn,
  FormSchema,
} from '../types/form'
import type { FormValidateCallback, FormItemProp } from 'element-plus'

export function useForm(props?: FormProps): UseFormReturn {
  const formRef = ref<Nullable<FormAction>>(null)

  function getForm() {
    const form = unref(formRef)
    if (!form) {
      new Error(
        'The form instance has not been obtained, please make sure that the form has been rendered when performing the form operation'
      )
    }
    return form as FormAction
  }

  function register(instance: FormAction) {
    onUnmounted(() => {
      formRef.value = null
    })

    formRef.value = instance

    watch(
      () => props,
      () => {
        const formProps = unref(props)
        if (formProps) {
          getForm().setProps(formProps)
        }
      },
      {
        immediate: true,
        deep: true,
      }
    )
  }

  const methods: FormAction = {
    setProps: (formProps: Partial<FormProps>) => {
      getForm().setProps(formProps)
    },

    updateSchema: (schemas: Partial<FormSchema> | Partial<FormSchema>[]) => {
      getForm().updateSchema(schemas)
    },

    appendSchema: (
      schemas: FormSchema | FormSchema[],
      previousField?: string
    ) => {
      getForm().appendSchema(schemas, previousField)
    },

    removeSchema: (fields: string | string[]) => {
      getForm().removeSchema(fields)
    },

    getFieldsValue: () => {
      return getForm().getFieldsValue() || {}
    },

    setFieldsValue: (values: Recordable) => {
      getForm().setFieldsValue(values)
    },

    validate: (callback?: FormValidateCallback) => {
      getForm().validate(callback)
    },

    validateField: (
      props?: Arrayable<FormItemProp>,
      callback?: FormValidateCallback
    ) => {
      getForm().validateField(props, callback)
    },

    resetFields: (props?: Arrayable<FormItemProp>) => {
      getForm().resetFields(props)
    },

    clearValidate: (props?: Arrayable<FormItemProp>) => {
      getForm().clearValidate(props)
    },

    scrollToField: (prop: FormItemProp) => {
      getForm().scrollToField(prop)
    },

    reset: () => {
      getForm().reset()
    },

    submit: () => {
      getForm().submit()
    },
  }

  return [register, methods]
}
