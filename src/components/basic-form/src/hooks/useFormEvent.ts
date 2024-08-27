import type { FormProps, FormSchema } from "../types/form";

import {
  normalizeSchema,
  normalizeSchemaItem,
} from "../tools/normalize-schema";
import { isArray, isObject, isString } from "@/utils/is";
import { cloneDeep, uniqBy, merge } from "@/utils/object";

type UpdateSchemaParams = Partial<FormSchema> &
  Required<Pick<FormSchema, "prop">>;

export function useFormSchema(props: ComputedRef<FormProps>) {
  const schemaRef = ref<FormSchema[]>([]);

  // 要记住 schema的crud 需要联动model的crud 还没写
  const modelRef = ref<Recordable>({});

  watchEffect(() => {
    const formProps = unref(props);
    if (formProps) {
      initSchema(props.value.schemas);
    }
  });

  function initSchema(schemas: FormSchema[]) {
    schemaRef.value = normalizeSchema(schemas);
  }

  function updateSchema(schemas: Arrayable<UpdateSchemaParams>) {
    let waitUpdateSchemas: UpdateSchemaParams[] = [];

    if (isObject(schemas)) {
      waitUpdateSchemas.push(schemas as FormSchema);
    }

    if (isArray(schemas)) {
      waitUpdateSchemas = [...schemas];
    }

    waitUpdateSchemas = waitUpdateSchemas.filter((item) => item.prop);

    waitUpdateSchemas = uniqBy(waitUpdateSchemas, "prop");

    if (!waitUpdateSchemas.length) {
      throw new Error("All schema should has prop or prop should not empty");
    }

    waitUpdateSchemas.forEach((schema) => {
      const updateIndex = unref(schemaRef).findIndex(
        (item) => schema.prop === item.prop
      );

      if (updateIndex === -1) {
        return;
      }

      const oldSchema = unref(schemaRef)[updateIndex];

      if (oldSchema) {
        const newSchema = merge(oldSchema, schema);
        _updateSchemaItemByIndex(updateIndex, newSchema);
      }
    });
  }

  function _updateSchemaItemByIndex(index: number, schema: FormSchema) {
    schemaRef.value.splice(index, 1, schema);
  }

  function appendSchema(schemas: Arrayable<FormSchema>, previousProp?: string) {
    let waitAppendSchemas: FormSchema[] = [];

    if (isObject(schemas)) {
      waitAppendSchemas.push(schemas as FormSchema);
    }

    if (isArray(schemas)) {
      waitAppendSchemas = [...schemas];
    }

    waitAppendSchemas = waitAppendSchemas.filter((item) => item.prop);

    waitAppendSchemas = uniqBy(waitAppendSchemas, "prop");

    if (!waitAppendSchemas.length) {
      throw new Error("All schema should has prop or prop should not empty");
    }

    waitAppendSchemas.forEach((schema) => {
      const previousIndex = unref(schemaRef).findIndex(
        (item) => previousProp === item.prop
      );

      _appendSchemaItemByIndex(previousIndex, normalizeSchemaItem(schema));
    });
  }

  function _appendSchemaItemByIndex(index: number, schema: FormSchema) {
    schemaRef.value.splice(index, 0, schema);
  }

  function removeSchema(prop: Arrayable<string>) {
    let propList = (isString(prop) ? [prop] : prop) as string[];

    if (!propList.length) {
      throw new Error("All schema should has prop or prop should not empty");
    }

    propList.forEach((p) => {
      const removeIndex = unref(schemaRef).findIndex((item) => p === item.prop);

      _removeSchemaItemByIndex(removeIndex);
    });
  }

  function _removeSchemaItemByIndex(index: number) {
    schemaRef.value.splice(index, 0);
  }

  return {
    updateSchema,
    removeSchema,
    appendSchema,
  };
}
