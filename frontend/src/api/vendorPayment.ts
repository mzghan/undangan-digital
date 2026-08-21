import type {
  VendorPayment,
  VendorPaymentCreateRequest,
  VendorPaymentUpdateRequest,
  VendorPaymentSummary,
} from "../types/vendorPayment";

const API_BASE_URL = "http://127.0.0.1:8000";

async function handle<T>(response: Response, errorMessage: string): Promise<T> {
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.detail ?? errorMessage);
  }
  return response.json();
}

export async function addPayment(
  payload: VendorPaymentCreateRequest,
): Promise<VendorPayment> {
  const response = await fetch(
    `${API_BASE_URL}/api/trial/vendor-payment-premium`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
  );
  return handle(response, "Gagal menambah jadwal pembayaran");
}

export async function listPayments(
  sessionId: string,
): Promise<VendorPayment[]> {
  const response = await fetch(
    `${API_BASE_URL}/api/trial/vendor-payment-premium/${sessionId}`,
  );
  return handle(response, "Gagal mengambil jadwal pembayaran");
}

export async function getPaymentSummary(
  sessionId: string,
): Promise<VendorPaymentSummary> {
  const response = await fetch(
    `${API_BASE_URL}/api/trial/vendor-payment-premium/${sessionId}/summary`,
  );
  return handle(response, "Gagal mengambil ringkasan pembayaran");
}

export async function updatePayment(
  paymentId: number,
  payload: VendorPaymentUpdateRequest,
): Promise<VendorPayment> {
  const response = await fetch(
    `${API_BASE_URL}/api/trial/vendor-payment-premium/item/${paymentId}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
  );
  return handle(response, "Gagal memperbarui jadwal pembayaran");
}

export async function deletePayment(paymentId: number): Promise<void> {
  const response = await fetch(
    `${API_BASE_URL}/api/trial/vendor-payment-premium/item/${paymentId}`,
    { method: "DELETE" },
  );
  await handle(response, "Gagal menghapus jadwal pembayaran");
}
