import type { FormSchema } from "@/components/basic-form";

export type DialogAction = "view" | "add" | "edit";

export interface BasicFormDialogProps {
  visible: boolean;
  disabled?: boolean;
  loading?: boolean;

  title?: string;
  width?: number;
  height?: number;
  action?: DialogAction;

  modelValue: Recordable;
  schemas?: FormSchema[];
  formProps?: Recordable;
}

export interface BasicFormDialogEmits {
  (e: "update:modelValue", values: Recordable): void;
  (e: "update:visible", visible: boolean): void;
  (e: "submit", values: Recordable): void;
}
