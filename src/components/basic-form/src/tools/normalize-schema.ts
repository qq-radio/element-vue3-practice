import type { FormSchema } from "../types/form";

import { getPrefix } from "./component-prefix";
import { normalizeRule } from "./normalize-rule";

import { merge } from "@/utils/object";

function getPlaceholder(formItem: FormSchema) {
  return getPrefix(formItem.component) + formItem.label;
}

function addFormItemPlaceholder(formItem: FormSchema) {
  return merge(
    {
      componentProps: {
        placeholder: getPlaceholder(formItem),
      },
    },
    formItem
  );
}

function addFormItemAllowClear(formItem: FormSchema) {
  return merge(
    {
      componentProps: {
        allowClear: true,
      },
    },
    formItem
  );
}

function addFormItemTimeFormat(formItem: FormSchema) {
  if (formItem.component === "date-picker") {
    return merge(
      {
        componentProps: {
          format: formItem?.componentProps?.format || "YYYY-MM-DD",
          valueFormat: formItem?.componentProps?.valueFormat || "YYYY-MM-DD",
        },
      },
      formItem
    );
  }

  return formItem;
}

function filterSchema(schema: FormSchema[]) {
  return schema.filter((schemaItem) => schemaItem.prop);
}

function sortSchema(schema: FormSchema[]) {
  return schema.sort((a, b) => (a.sort || 0) - (b.sort || 0));
}

function normalizeSchemaItem(schemaItem: FormSchema) {
  return [
    addFormItemPlaceholder,
    addFormItemAllowClear,
    addFormItemTimeFormat,
    normalizeRule,
  ].reduce((acc, func) => func(acc), schemaItem);
}

function normalizeSchema(schema: FormSchema[]) {
  return filterSchema(sortSchema(schema)).map(normalizeSchemaItem);
}

export { normalizeSchema, normalizeSchemaItem };
