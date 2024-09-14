export interface ImportConfig {
  templateName: string;
  importUrl: string;
}

export interface BasicImportProps {
  config: ImportConfig;
  params?: Recordable;
}

export interface BasicImportEmits {
  (e: "success"): void;
  (e: "fail"): void;
  (e: "complete"): void;
}
