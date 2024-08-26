import type { FormProps, FormSchema } from '../types/form'
import { isArray, isObject, isString } from '@/utils/is'
import { cloneDeep, uniqBy } from 'lodash-es'

type SchemaParams = Partial<FormSchema> & Required<Pick<FormSchema, 'prop'>>

export function useFormSchema(props: ComputedRef<FormProps>) {
  const schemaRef = ref<FormSchema[]>([])
  const modelRef = ref<Recordable>({})

  watchEffect(() => {
    const formProps = unref(props)
    if (formProps) {
      schemaRef.value = initSchema(props.value.schemas)
    }
  })

  function initSchema(schemas: FormSchema[]) {}

  function updateSchema(schemas: Arrayable<SchemaParams>) {
    let updateSchemas: Partial<FormSchema>[] = []

    if (isObject(schemas)) {
      updateSchemas.push(schemas as FormSchema)
    }

    if (isArray(schemas)) {
      updateSchemas = [...schemas]
    }

    const hasField = updateSchemas.every((item) => item.prop)
    if (!hasField) {
      throw new Error('All schema should has prop')
    }

    const schema: FormSchema[] = []
    const updatedSchema: FormSchema[] = []
    unref(schemaRef).forEach((val) => {
      const updatedItem = updateSchemas.find((item) => val.prop === item.prop)

      if (updatedItem) {
        const newSchema = deepMerge(val, updatedItem)
        updatedSchema.push(newSchema as FormSchema)
        schema.push(newSchema as FormSchema)
      } else {
        schema.push(val)
      }
    })

    formSchemaRef.value = uniqBy(schema, 'prop')
  }

  async function appendSchema(
    schema: FormSchema | FormSchema[],
    prefixField?: string,
    first = false
  ) {
    const schemaList: FormSchema[] = cloneDeep(unref(schemaRef))
    const addSchemaIds: string[] = Array.isArray(schema)
      ? schema.map((item) => item.prop)
      : [schema.prop]
    if (schemaList.find((item) => addSchemaIds.includes(item.prop))) {
      error('There are schemas that have already been added')
      return
    }
    const index = schemaList.findIndex((schema) => schema.prop === prefixField)
    const _schemaList = isObject(schema)
      ? [schema as FormSchema]
      : (schema as FormSchema[])
    if (!prefixField || index === -1 || first) {
      first
        ? schemaList.unshift(..._schemaList)
        : schemaList.push(..._schemaList)
    } else if (index !== -1) {
      schemaList.splice(index + 1, 0, ..._schemaList)
    }
    formSchemaRef.value = schemaList
  }

  async function removeSchema(fields: string | string[]): Promise<void> {
    const schemaList: FormSchema[] = cloneDeep(unref(schemaRef))
    if (!fields) {
      return
    }

    let fieldList = (isString(fields) ? [fields] : fields) as string[]
    if (isString(fields)) {
      fieldList = [fields as string]
    }
    for (const prop of fieldList) {
      _removeSchema(prop, schemaList)
    }
    formSchemaRef.value = schemaList
  }

  function _removeSchema(prop: string, schemaList: FormSchema[]): void {
    if (isString(prop)) {
      const index = schemaList.findIndex((schema) => schema.prop === prop)
      if (index !== -1) {
        delete formModel[prop]
        schemaList.splice(index, 1)
      }
    }
  }

  return {
    updateSchema,
    removeSchema,
    appendSchema,
  }
}
