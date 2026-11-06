import { describe, expect, it, vi } from "vitest";
import type { RequestCapture, RequestLog } from "./api";
import { collectExportRecords, recordsToCsv, recordsToJson } from "./requestExport";

const log: RequestLog = {
  id: "request-1", startedAt: "2026-11-05T01:02:03Z", providerName: "中文 Provider",
  durationMs: 100, statusCode: 200, outcome: "completed", retryCount: 0,
  requestBytes: 0, contentCaptured: true,
};
const capture: RequestCapture = {
  requestContent: '{"input":"你好\\n世界"}', responseContent: 'data: {"delta":"你好"}\n\ndata: [DONE]\n\n',
  requestCapturedBytes: 30, responseCapturedBytes: 50, requestComplete: true, responseComplete: false,
};

describe("request JSON export", () => {
  it("preserves raw JSON/SSE and incomplete-capture metadata without mutating logs", async () => {
    const records = await collectExportRecords([log], true, vi.fn().mockResolvedValue(capture));
    expect(JSON.parse(recordsToJson(records))).toEqual([{ ...log, capture }]);
    expect(log).not.toHaveProperty("capture");
  });

  it("does not read captures when exporting metadata or uncaptured records", async () => {
    const read = vi.fn();
    expect(await collectExportRecords([log], false, read)).toEqual([log]);
    const uncaptured = { ...log, contentCaptured: false };
    expect(await collectExportRecords([uncaptured], true, read)).toEqual([uncaptured]);
    expect(read).not.toHaveBeenCalled();
  });

  it("preserves record order and reports capture failures while continuing other records", async () => {
    const read = vi.fn().mockRejectedValueOnce(new Error("文件不可读")).mockResolvedValueOnce(capture);
    const records = await collectExportRecords([log, { ...log, id: "request-2" }], true, read);
    expect(records[0]).toEqual({ ...log, captureReadError: "文件不可读" });
    expect(records[1]).toEqual({ ...log, id: "request-2", capture });
    expect(read.mock.calls).toEqual([["request-1"], ["request-2"]]);
  });

  it("retains empty content and handles an empty list", async () => {
    const records = await collectExportRecords([log], true, async () => ({ ...capture, requestContent: "" }));
    expect(JSON.parse(recordsToJson(records))[0].capture.requestContent).toBe("");
    expect(recordsToJson(await collectExportRecords([], true, vi.fn()))).toBe("[]");
  });
});

describe("request CSV export", () => {
  it("uses BOM/CRLF, escapes quotes, commas and newlines, and preserves zero/false", () => {
    const csv = recordsToCsv([{ ...log, providerName: '中文,"测试"\n下一行', contentCaptured: false }]);
    expect(csv.startsWith("\uFEFFid,startedAt,")).toBe(true);
    expect(csv).toContain('"中文,""测试""\n下一行"');
    expect(csv).toContain('"100","0","0","","","","","","false",""\r\n');
  });

  it.each(["=HYPERLINK(1)", "+cmd", "-cmd", "@SUM(1)", " \t=1+1", "\r=1", "\n@cmd"])("neutralizes formula-like string %j", value => {
    expect(recordsToCsv([{ ...log, error: value }])).toContain(`"'${value}"`);
  });

  it("exports metadata only, including token counts, and keeps numeric values numeric", () => {
    const csv = recordsToCsv([{ ...log, inputTokens: 0, outputTokens: 42, durationMs: -1, capture } as RequestLog]);
    expect(csv).toContain("inputTokens,outputTokens,totalTokens,cachedInputTokens,reasoningTokens");
    expect(csv).toContain('"-1","0","0","0","42"');
    expect(csv).not.toContain(capture.responseContent);
  });

  it("emits a header for an empty list", () => {
    expect(recordsToCsv([]).split("\r\n")).toHaveLength(2);
  });
});
