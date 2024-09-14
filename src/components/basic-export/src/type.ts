export interface ExportConfig {
  fileName?: string;
  exportUrl: string;
}

export interface BasicExportProps {
  config: ExportConfig;
  params: Recordable;
}

export interface BasicExportEmits {
  (e: "success"): void;
  (e: "fail"): void;
  (e: "complete"): void;
}
