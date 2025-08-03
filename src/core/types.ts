export interface MergeOptions {
  folder: string;
  reference?: string;
  fix?: boolean;
  fill?: string;
  output?: string;
  report?: boolean;
}

export interface MissingKeyReport {
  [language: string]: string[];
}

export interface MergeResult {
  merged: Record<string, any>;
  missing: MissingKeyReport;
}