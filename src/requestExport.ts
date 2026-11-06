import type { RequestCapture, RequestLog } from "./api";

export type ExportRecord = RequestLog & {
  capture?: RequestCapture;
  captureReadError?: string;
};

// Read captures one at a time: a recording can contain a large response body.
export async function collectExportRecords(
  logs: RequestLog[],
  includeContent: boolean,
  readCapture: (id: string) => Promise<RequestCapture>,
): Promise<ExportRecord[]> {
  const records: ExportRecord[] = [];
  for (const log of logs) {
    const record: ExportRecord = { ...log };
    if (includeContent && log.contentCaptured) {
      try {
        record.capture = await readCapture(log.id);
      } catch (error) {
        record.captureReadError = error instanceof Error ? error.message : String(error);
      }
    }
    records.push(record);
  }
  return records;
}

export function recordsToJson(records: ExportRecord[]) {
  return JSON.stringify(records, null, 2);
}

const csvColumns = [
  "id", "startedAt", "providerId", "providerName", "model", "statusCode", "outcome",
  "durationMs", "requestBytes", "retryCount", "inputTokens", "outputTokens", "totalTokens",
  "cachedInputTokens", "reasoningTokens", "contentCaptured", "error",
] as const satisfies readonly (keyof RequestLog)[];

function csvCell(value: RequestLog[keyof RequestLog]) {
  let text = value == null ? "" : String(value);
  // Spreadsheet applications may execute formula-like strings even in quoted cells.
  if (typeof value === "string" && /^[\s\uFEFF]*[=+\-@]/u.test(text)) text = `'${text}`;
  return `"${text.replace(/"/g, '""')}"`;
}

export function recordsToCsv(records: RequestLog[]) {
  const rows = [csvColumns.join(","), ...records.map(record => csvColumns.map(key => csvCell(record[key])).join(","))];
  // UTF-8 BOM makes Chinese text readable when opening the file in Excel.
  return `\uFEFF${rows.join("\r\n")}\r\n`;
}
