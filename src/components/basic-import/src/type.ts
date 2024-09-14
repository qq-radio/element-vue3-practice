export interface Config {
  templateName: string;
  importUrl: string;
}

export interface BasicImportProps {
  config?: Config;
  params?: Recordable;
}

export interface BasicImportEmits {
  (e: "success"): void;
  (e: "fail"): void;
  (e: "complete"): void;
}
