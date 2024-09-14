import type {
  DisplayType as ComponentType,
  ColumnDisplayParams,
} from "../type";

import { merge, isArray } from "lodash";

function normalizeComponentProps(
  component: ComponentType,
  formattedValue: unknown,
  params: ColumnDisplayParams
): Recordable {
  if (component === "img") {
    const isMultiple = isArray(formattedValue);

    return merge(
      {
        fit: "cover",
        previewTeleported: true,
        hideOnClickModal: true,

        src: isMultiple ? formattedValue[0] : formattedValue,
        previewSrcList: isMultiple ? formattedValue : [formattedValue],
      },
      params.schema.displayProps
    );
  }

  return {};
}

export { normalizeComponentProps };
