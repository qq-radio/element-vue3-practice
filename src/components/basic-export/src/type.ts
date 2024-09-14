export interface Config {
  fileName?: string;
  exportUrl: string;
}

export interface BasicExportProps {
  config: Config;
  params: Recordable;
}

export interface BasicExportEmits {
  (e: "success"): void;
  (e: "fail", visible: boolean): void;
  (e: "complete"): void;
}
