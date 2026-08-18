import type {
  TrialStartResponse,
  Step1Response,
  Step2BudgetResponse,
  Step2KonsepResponse,
  TrialSession,
} from "../types/weddingTrial";

const API_BASE_URL = "http://127.0.0.1:8000";
const STORAGE_KEY = "wedding_trial_session_id";

export function getStoredSessionId(): string | null {
  return localStorage.getItem(STORAGE_KEY);
}

export function setStoredSessionId(sessionId: string): void {
  localStorage.setItem(STORAGE_KEY, sessionId);
}

export function clearStoredSessionId(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export async function startTrial(): Promise<TrialStartResponse> {
  const response = await fetch(`${API_BASE_URL}/api/trial/start`, {
    method: "POST",
  });
  if (!response.ok) {
    throw new Error("Gagal memulai trial");
  }
  return response.json();
}

export async function chooseKota(
  sessionId: string,
  kota: string,
): Promise<Step1Response> {
  const response = await fetch(`${API_BASE_URL}/api/trial/step1`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ session_id: sessionId, kota }),
  });
  if (!response.ok) {
    throw new Error("Gagal menyimpan pilihan kota");
  }
  return response.json();
}

export async function chooseBudget(
  sessionId: string,
  budgetTotal: number,
): Promise<Step2BudgetResponse> {
  const response = await fetch(`${API_BASE_URL}/api/trial/step2-budget`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ session_id: sessionId, budget_total: budgetTotal }),
  });
  if (!response.ok) {
    throw new Error("Gagal menyimpan budget");
  }
  return response.json();
}

export async function chooseKonsep(
  sessionId: string,
  konsep: string,
): Promise<Step2KonsepResponse> {
  const response = await fetch(`${API_BASE_URL}/api/trial/step2-konsep`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ session_id: sessionId, konsep }),
  });
  if (!response.ok) {
    throw new Error("Gagal menyimpan pilihan konsep");
  }
  return response.json();
}

export async function getTrialSession(
  sessionId: string,
): Promise<TrialSession> {
  const response = await fetch(`${API_BASE_URL}/api/trial/${sessionId}`);
  if (!response.ok) {
    throw new Error("Sesi trial tidak ditemukan atau sudah kedaluwarsa");
  }
  return response.json();
}
