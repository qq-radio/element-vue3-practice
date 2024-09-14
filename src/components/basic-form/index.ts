export * from "./src/type";

// hooks暂时用不了
// export { useForm } from "./src/hooks/useForm";

import BasicForm from "./src/BasicForm.vue";

export { BasicForm };

export type BasicFormInstance = InstanceType<typeof BasicForm>;
