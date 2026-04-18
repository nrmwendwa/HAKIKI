const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export type PredictVerdict = "real" | "suspicious" | "fake";

export type DecisionVerdict = "valid" | "suspicious" | "invalid";

export interface EvidenceItem {
  claim: string;
  matched_source: string;
  matched_url: string;
  similarity: number;
  verdict_contribution: string;
}

export interface DeepfakeScores {
  verdict: PredictVerdict;
  confidence: number;
  real: number;
  suspicious: number;
  fake: number;
}

export interface DecisionResult {
  verdict: DecisionVerdict;
  confidence: number;
  reasoning: string;
  evidence: EvidenceItem[];
  signals: {
    claim_score: number | null;
    image_authenticity: number | null;
    source_trust: number | null;
    weights_used: Record<string, number>;
    raw_score: number;
  };
  input_type: "image" | "text" | "document" | "unknown";
  deepfake_scores: DeepfakeScores | null;
  pipeline_errors: string[];
  trace: Record<string, unknown>;
}

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function parseJsonOrThrow<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let detail = `Request failed with status ${res.status}`;
    try {
      const body = await res.json();
      if (body?.detail) detail = String(body.detail);
      else if (body?.error) detail = String(body.error);
    } catch {
      /* non-JSON body */
    }
    throw new ApiError(detail, res.status);
  }
  return (await res.json()) as T;
}

export async function validateUpload(file: File, signal?: AbortSignal): Promise<DecisionResult> {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch(`${API_URL}/validate`, { method: "POST", body: form, signal });
  return parseJsonOrThrow<DecisionResult>(res);
}

export async function validateText(text: string, signal?: AbortSignal): Promise<DecisionResult> {
  const res = await fetch(`${API_URL}/validate-text`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
    signal,
  });
  return parseJsonOrThrow<DecisionResult>(res);
}

export type VerificationLabel = "imethibitishwa" | "ya_uongo" | "haijathibitishwa";

export function decisionToVerificationLabel(verdict: DecisionVerdict): VerificationLabel {
  if (verdict === "valid") return "imethibitishwa";
  if (verdict === "invalid") return "ya_uongo";
  return "haijathibitishwa";
}
