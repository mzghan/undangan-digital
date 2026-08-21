import type {
  Vendor,
  VendorCreateRequest,
  VendorUpdateRequest,
} from "../types/vendor";

const API_BASE_URL = "http://127.0.0.1:8000";

export async function addVendor(payload: VendorCreateRequest): Promise<Vendor> {
  const response = await fetch(`${API_BASE_URL}/api/trial/vendor-premium`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error("Gagal menambah vendor");
  }
  return response.json();
}

export async function listVendor(sessionId: string): Promise<Vendor[]> {
  const response = await fetch(
    `${API_BASE_URL}/api/trial/vendor-premium/${sessionId}`,
  );
  if (!response.ok) {
    throw new Error("Gagal mengambil daftar vendor");
  }
  return response.json();
}

export async function updateVendor(
  vendorId: number,
  payload: VendorUpdateRequest,
): Promise<Vendor> {
  const response = await fetch(
    `${API_BASE_URL}/api/trial/vendor-premium/item/${vendorId}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
  );
  if (!response.ok) {
    throw new Error("Gagal memperbarui vendor");
  }
  return response.json();
}

export async function deleteVendor(vendorId: number): Promise<void> {
  const response = await fetch(
    `${API_BASE_URL}/api/trial/vendor-premium/item/${vendorId}`,
    { method: "DELETE" },
  );
  if (!response.ok) {
    throw new Error("Gagal menghapus vendor");
  }
}
