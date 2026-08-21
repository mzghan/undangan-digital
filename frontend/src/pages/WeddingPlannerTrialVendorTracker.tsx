import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  startTrial,
  chooseKota,
  getStoredSessionId,
  setStoredSessionId,
  clearStoredSessionId,
} from "../api/weddingTrial";
import {
  addVendor,
  listVendor,
  updateVendor,
  deleteVendor,
} from "../api/vendor";
import {
  addPayment,
  listPayments,
  getPaymentSummary,
  updatePayment,
  deletePayment,
} from "../api/vendorPayment";
import type { Vendor, VendorStatusKontrak } from "../types/vendor";
import type {
  VendorPayment,
  VendorPaymentSummary,
  PaymentStatusBayar,
} from "../types/vendorPayment";

const PAKET = "vendor_tracker" as const;

const VENDOR_STATUS_LABEL: Record<
  VendorStatusKontrak,
  { label: string; className: string }
> = {
  belum_kontak: {
    label: "Belum Kontak",
    className: "bg-gray-100 text-gray-600",
  },
  nego: { label: "Nego", className: "bg-amber-100 text-amber-800" },
  dp: { label: "DP", className: "bg-sky-100 text-sky-800" },
  lunas: { label: "Lunas", className: "bg-emerald-100 text-emerald-800" },
};

const VENDOR_STATUS_OPTIONS: { value: VendorStatusKontrak; label: string }[] = [
  { value: "belum_kontak", label: "Belum Kontak" },
  { value: "nego", label: "Nego" },
  { value: "dp", label: "DP" },
  { value: "lunas", label: "Lunas" },
];

const VENDOR_KATEGORI_OPTIONS = [
  "venue",
  "catering",
  "dekorasi",
  "dokumentasi",
  "mua",
  "hiburan",
  "lain",
];

const PAYMENT_STATUS_LABEL: Record<
  PaymentStatusBayar,
  { label: string; className: string }
> = {
  belum_bayar: {
    label: "Belum Bayar",
    className: "bg-amber-100 text-amber-800",
  },
  lunas: { label: "Lunas", className: "bg-emerald-100 text-emerald-800" },
};

function formatRupiah(value: number): string {
  return `Rp ${value.toLocaleString("id-ID")}`;
}

function formatTanggal(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

type ResultTab = "vendor" | "pembayaran";

function WeddingPlannerTrialVendorTracker() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [step, setStep] = useState<"loading" | "dashboard">("loading");
  const [resultTab, setResultTab] = useState<ResultTab>("vendor");

  // --- state Vendor (Checklist + Kontak & Kontrak Tracker) ---
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [vendorLoaded, setVendorLoaded] = useState(false);
  const [showVendorForm, setShowVendorForm] = useState(false);
  const [vendorFormNama, setVendorFormNama] = useState("");
  const [vendorFormKategori, setVendorFormKategori] = useState("");
  const [vendorFormKontak, setVendorFormKontak] = useState("");
  const [vendorFormError, setVendorFormError] = useState<string | null>(null);

  // --- state Jadwal Pembayaran DP ---
  const [payments, setPayments] = useState<VendorPayment[]>([]);
  const [paymentSummary, setPaymentSummary] =
    useState<VendorPaymentSummary | null>(null);
  const [paymentLoaded, setPaymentLoaded] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentFormVendorId, setPaymentFormVendorId] = useState("");
  const [paymentFormJudul, setPaymentFormJudul] = useState("");
  const [paymentFormNominal, setPaymentFormNominal] = useState("");
  const [paymentFormTanggal, setPaymentFormTanggal] = useState("");
  const [paymentFormError, setPaymentFormError] = useState<string | null>(null);

  useEffect(() => {
    const existing = getStoredSessionId(PAKET);
    if (existing) {
      setSessionId(existing);
      setStep("dashboard");
      return;
    }

    startTrial(PAKET)
      .then((res) => {
        setStoredSessionId(res.session_id, PAKET);
        // Paket ini tidak butuh kota/budget — cukup panggil step1 diam-diam
        // dengan kota default supaya baris sesi tersimpan di DB.
        return chooseKota(res.session_id, "Jakarta", PAKET).then(
          () => res.session_id,
        );
      })
      .then((sid) => {
        setSessionId(sid);
        setStep("dashboard");
      })
      .catch(() => setStep("dashboard"));
  }, []);

  const loadVendorMutation = useMutation<Vendor[], Error, void>({
    mutationFn: () => listVendor(sessionId as string),
    onSuccess: (data) => {
      setVendors(data);
      setVendorLoaded(true);
    },
  });

  const addVendorMutation = useMutation<
    Vendor,
    Error,
    { nama_vendor: string; kategori: string; kontak_wa: string }
  >({
    mutationFn: (form) =>
      addVendor({
        session_id: sessionId as string,
        nama_vendor: form.nama_vendor,
        kategori: form.kategori || null,
        kontak_wa: form.kontak_wa || null,
      }),
    onSuccess: (newVendor) => {
      setVendors((prev) => [...prev, newVendor]);
      setShowVendorForm(false);
      setVendorFormNama("");
      setVendorFormKategori("");
      setVendorFormKontak("");
      setVendorFormError(null);
    },
  });

  const updateVendorMutation = useMutation<
    Vendor,
    Error,
    { vendorId: number; payload: Parameters<typeof updateVendor>[1] }
  >({
    mutationFn: ({ vendorId, payload }) => updateVendor(vendorId, payload),
    onSuccess: (updatedVendor) => {
      setVendors((prev) =>
        prev.map((v) => (v.id === updatedVendor.id ? updatedVendor : v)),
      );
    },
  });

  const deleteVendorMutation = useMutation<void, Error, number>({
    mutationFn: (vendorId) => deleteVendor(vendorId),
    onSuccess: (_data, vendorId) => {
      setVendors((prev) => prev.filter((v) => v.id !== vendorId));
      // vendor terhapus -> termin pembayarannya ikut hilang (cascade backend),
      // refresh biar konsisten kalau user pindah ke tab Pembayaran nanti
      if (paymentLoaded) refreshPayments();
    },
  });

  async function refreshPayments() {
    const [list, summary] = await Promise.all([
      listPayments(sessionId as string),
      getPaymentSummary(sessionId as string),
    ]);
    setPayments(list);
    setPaymentSummary(summary);
  }

  const loadPaymentMutation = useMutation<void, Error, void>({
    mutationFn: refreshPayments,
    onSuccess: () => setPaymentLoaded(true),
  });

  const addPaymentMutation = useMutation<
    VendorPayment,
    Error,
    {
      vendor_id: string;
      judul: string;
      nominal: string;
      tanggal_jatuh_tempo: string;
    }
  >({
    mutationFn: (form) =>
      addPayment({
        session_id: sessionId as string,
        vendor_id: Number(form.vendor_id),
        judul: form.judul,
        nominal: Number(form.nominal),
        tanggal_jatuh_tempo: form.tanggal_jatuh_tempo || null,
      }),
    onSuccess: () => {
      refreshPayments();
      setShowPaymentForm(false);
      setPaymentFormVendorId("");
      setPaymentFormJudul("");
      setPaymentFormNominal("");
      setPaymentFormTanggal("");
      setPaymentFormError(null);
    },
    onError: (err) => setPaymentFormError(err.message),
  });

  const updatePaymentMutation = useMutation<
    VendorPayment,
    Error,
    { paymentId: number; payload: Parameters<typeof updatePayment>[1] }
  >({
    mutationFn: ({ paymentId, payload }) => updatePayment(paymentId, payload),
    onSuccess: () => refreshPayments(),
  });

  const deletePaymentMutation = useMutation<void, Error, number>({
    mutationFn: (paymentId) => deletePayment(paymentId),
    onSuccess: () => refreshPayments(),
  });

  function handleReset() {
    clearStoredSessionId(PAKET);
    setSessionId(null);
    setVendors([]);
    setVendorLoaded(false);
    setShowVendorForm(false);
    setVendorFormNama("");
    setVendorFormKategori("");
    setVendorFormKontak("");
    setVendorFormError(null);
    setPayments([]);
    setPaymentSummary(null);
    setPaymentLoaded(false);
    setShowPaymentForm(false);
    setPaymentFormVendorId("");
    setPaymentFormJudul("");
    setPaymentFormNominal("");
    setPaymentFormTanggal("");
    setPaymentFormError(null);
    setResultTab("vendor");
    setStep("loading");

    startTrial(PAKET).then((res) => {
      setStoredSessionId(res.session_id, PAKET);
      chooseKota(res.session_id, "Jakarta", PAKET).then(() => {
        setSessionId(res.session_id);
        setStep("dashboard");
      });
    });
  }

  if (step === "loading") {
    return (
      <div className="max-w-3xl mx-auto p-8">
        <p className="text-gray-400 text-center py-20">Menyiapkan trial...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-8">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold text-rose-800">
          Trial Paket Vendor Tracker
        </h1>
        <button
          onClick={handleReset}
          className="text-xs text-gray-400 hover:text-rose-700"
        >
          Mulai Ulang
        </button>
      </div>
      <p className="text-gray-500 mb-6">
        Kelola kontak, kontrak, dan jadwal pembayaran DP semua vendor
        pernikahanmu di satu tempat.
      </p>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex gap-1 border-b border-gray-100 mb-4">
          <button
            onClick={() => {
              setResultTab("vendor");
              if (!vendorLoaded) loadVendorMutation.mutate();
            }}
            className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
              resultTab === "vendor"
                ? "border-rose-700 text-rose-700"
                : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            Vendor
          </button>
          <button
            onClick={() => {
              setResultTab("pembayaran");
              if (!paymentLoaded) loadPaymentMutation.mutate();
              if (!vendorLoaded) loadVendorMutation.mutate();
            }}
            className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
              resultTab === "pembayaran"
                ? "border-rose-700 text-rose-700"
                : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            Pembayaran
          </button>
        </div>

        {resultTab === "vendor" && (
          <div>
            {loadVendorMutation.isPending && !vendorLoaded ? (
              <p className="text-sm text-gray-400 py-10 text-center">
                Memuat daftar vendor...
              </p>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Checklist & Kontrak Vendor
                  </h2>
                  <button
                    onClick={() => setShowVendorForm((prev) => !prev)}
                    className="text-sm bg-rose-700 text-white px-4 py-1.5 rounded-md hover:bg-rose-800 transition-colors"
                  >
                    {showVendorForm ? "Batal" : "+ Tambah Vendor"}
                  </button>
                </div>

                {showVendorForm && (
                  <div className="bg-gray-50 rounded-md p-4 mb-4 space-y-3">
                    <input
                      type="text"
                      placeholder="Nama vendor (mis. Catering Nikmat Rasa)"
                      value={vendorFormNama}
                      onChange={(e) => setVendorFormNama(e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                    />
                    <div className="flex gap-3 flex-wrap">
                      <select
                        value={vendorFormKategori}
                        onChange={(e) => setVendorFormKategori(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                      >
                        <option value="">Kategori (opsional)</option>
                        {VENDOR_KATEGORI_OPTIONS.map((k) => (
                          <option key={k} value={k}>
                            {k}
                          </option>
                        ))}
                      </select>
                      <input
                        type="text"
                        placeholder="No. WhatsApp (opsional)"
                        value={vendorFormKontak}
                        onChange={(e) => setVendorFormKontak(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                      />
                    </div>
                    {vendorFormError && (
                      <p className="text-xs text-red-600">{vendorFormError}</p>
                    )}
                    <button
                      disabled={addVendorMutation.isPending}
                      onClick={() => {
                        if (!vendorFormNama.trim()) {
                          setVendorFormError("Nama vendor wajib diisi.");
                          return;
                        }
                        addVendorMutation.mutate({
                          nama_vendor: vendorFormNama.trim(),
                          kategori: vendorFormKategori,
                          kontak_wa: vendorFormKontak,
                        });
                      }}
                      className="bg-rose-700 text-white px-4 py-2 rounded-md text-sm hover:bg-rose-800 disabled:opacity-40"
                    >
                      {addVendorMutation.isPending
                        ? "Menyimpan..."
                        : "Simpan Vendor"}
                    </button>
                  </div>
                )}

                {vendors.length === 0 ? (
                  <p className="text-sm text-gray-400 py-10 text-center">
                    Belum ada vendor. Klik "+ Tambah Vendor" untuk mulai lacak
                    vendor kamu.
                  </p>
                ) : (
                  <ul className="space-y-3">
                    {vendors.map((v) => (
                      <li
                        key={v.id}
                        className="border border-gray-100 rounded-md p-3"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-800">
                              {v.nama_vendor}
                            </p>
                            <p className="text-xs text-gray-400">
                              {v.kategori ?? "Tanpa kategori"}
                              {v.kontak_wa ? ` · ${v.kontak_wa}` : ""}
                            </p>
                          </div>
                          <button
                            onClick={() => deleteVendorMutation.mutate(v.id)}
                            className="text-xs text-gray-400 hover:text-red-600 shrink-0 ml-3"
                          >
                            Hapus
                          </button>
                        </div>

                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded-full ${VENDOR_STATUS_LABEL[v.status_kontrak].className}`}
                          >
                            {VENDOR_STATUS_LABEL[v.status_kontrak].label}
                          </span>
                          <select
                            value={v.status_kontrak}
                            onChange={(e) =>
                              updateVendorMutation.mutate({
                                vendorId: v.id,
                                payload: {
                                  status_kontrak: e.target
                                    .value as VendorStatusKontrak,
                                },
                              })
                            }
                            className="border border-gray-300 rounded-md px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-rose-300"
                          >
                            {VENDOR_STATUS_OPTIONS.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Kontak & Kontrak Tracker */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                          <div>
                            <label className="block text-[10px] text-gray-400 mb-0.5">
                              Tanggal kontrak ditandatangani
                            </label>
                            <input
                              type="date"
                              defaultValue={
                                v.tanggal_kontrak
                                  ? v.tanggal_kontrak.slice(0, 10)
                                  : ""
                              }
                              onBlur={(e) => {
                                if (
                                  e.target.value &&
                                  e.target.value !==
                                    v.tanggal_kontrak?.slice(0, 10)
                                ) {
                                  updateVendorMutation.mutate({
                                    vendorId: v.id,
                                    payload: {
                                      tanggal_kontrak: e.target.value,
                                    },
                                  });
                                }
                              }}
                              className="w-full border border-gray-300 rounded-md px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-rose-300"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] text-gray-400 mb-0.5">
                              Link dokumen kontrak
                            </label>
                            <input
                              type="text"
                              placeholder="https://drive.google.com/..."
                              defaultValue={v.dokumen_kontrak_url ?? ""}
                              onBlur={(e) => {
                                if (
                                  e.target.value !==
                                  (v.dokumen_kontrak_url ?? "")
                                ) {
                                  updateVendorMutation.mutate({
                                    vendorId: v.id,
                                    payload: {
                                      dokumen_kontrak_url: e.target.value,
                                    },
                                  });
                                }
                              }}
                              className="w-full border border-gray-300 rounded-md px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-rose-300"
                            />
                          </div>
                        </div>
                        {v.dokumen_kontrak_url && (
                          <a
                            href={v.dokumen_kontrak_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-rose-700 hover:underline mt-1 inline-block"
                          >
                            Buka dokumen kontrak ↗
                          </a>
                        )}

                        <input
                          type="text"
                          placeholder="Catatan vendor..."
                          defaultValue={v.catatan ?? ""}
                          onBlur={(e) => {
                            if (e.target.value !== (v.catatan ?? "")) {
                              updateVendorMutation.mutate({
                                vendorId: v.id,
                                payload: { catatan: e.target.value },
                              });
                            }
                          }}
                          className="w-full border border-gray-300 rounded-md px-2 py-1 text-xs mt-2 focus:outline-none focus:ring-2 focus:ring-rose-300"
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        )}

        {resultTab === "pembayaran" && (
          <div>
            {loadPaymentMutation.isPending && !paymentLoaded ? (
              <p className="text-sm text-gray-400 py-10 text-center">
                Memuat jadwal pembayaran...
              </p>
            ) : (
              <div>
                {paymentSummary && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                    <div className="bg-gray-50 rounded-md p-3">
                      <p className="text-xs text-gray-400">Total Terjadwal</p>
                      <p className="text-sm font-semibold text-gray-800">
                        {formatRupiah(paymentSummary.total_terjadwal)}
                      </p>
                    </div>
                    <div className="bg-emerald-50 rounded-md p-3">
                      <p className="text-xs text-emerald-700">Sudah Lunas</p>
                      <p className="text-sm font-semibold text-emerald-800">
                        {formatRupiah(paymentSummary.total_lunas)}
                      </p>
                    </div>
                    <div className="bg-amber-50 rounded-md p-3">
                      <p className="text-xs text-amber-700">Belum Lunas</p>
                      <p className="text-sm font-semibold text-amber-800">
                        {formatRupiah(paymentSummary.total_belum_lunas)}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-md p-3">
                      <p className="text-xs text-gray-400">Termin Lunas</p>
                      <p className="text-sm font-semibold text-gray-800">
                        {paymentSummary.jumlah_termin_lunas} /{" "}
                        {paymentSummary.jumlah_termin_lunas +
                          paymentSummary.jumlah_termin_belum_lunas}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Jadwal Pembayaran DP
                  </h2>
                  <button
                    onClick={() => setShowPaymentForm((prev) => !prev)}
                    disabled={vendors.length === 0}
                    className="text-sm bg-rose-700 text-white px-4 py-1.5 rounded-md hover:bg-rose-800 transition-colors disabled:opacity-40"
                  >
                    {showPaymentForm ? "Batal" : "+ Tambah Termin"}
                  </button>
                </div>

                {vendors.length === 0 && (
                  <p className="text-xs text-gray-400 mb-3">
                    Tambah vendor dulu di tab "Vendor" sebelum bisa bikin jadwal
                    pembayaran.
                  </p>
                )}

                {showPaymentForm && (
                  <div className="bg-gray-50 rounded-md p-4 mb-4 space-y-3">
                    <div className="flex gap-3 flex-wrap">
                      <select
                        value={paymentFormVendorId}
                        onChange={(e) => setPaymentFormVendorId(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                      >
                        <option value="">Pilih vendor...</option>
                        {vendors.map((v) => (
                          <option key={v.id} value={v.id}>
                            {v.nama_vendor}
                          </option>
                        ))}
                      </select>
                      <input
                        type="text"
                        placeholder="Judul (mis. DP 1, Pelunasan)"
                        value={paymentFormJudul}
                        onChange={(e) => setPaymentFormJudul(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                      />
                    </div>
                    <div className="flex gap-3 flex-wrap">
                      <input
                        type="number"
                        placeholder="Nominal (Rp)"
                        value={paymentFormNominal}
                        onChange={(e) => setPaymentFormNominal(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                      />
                      <input
                        type="date"
                        value={paymentFormTanggal}
                        onChange={(e) => setPaymentFormTanggal(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                      />
                    </div>
                    {paymentFormError && (
                      <p className="text-xs text-red-600">{paymentFormError}</p>
                    )}
                    <button
                      disabled={addPaymentMutation.isPending}
                      onClick={() => {
                        if (
                          !paymentFormVendorId ||
                          !paymentFormJudul.trim() ||
                          !paymentFormNominal
                        ) {
                          setPaymentFormError(
                            "Vendor, judul, dan nominal wajib diisi.",
                          );
                          return;
                        }
                        addPaymentMutation.mutate({
                          vendor_id: paymentFormVendorId,
                          judul: paymentFormJudul.trim(),
                          nominal: paymentFormNominal,
                          tanggal_jatuh_tempo: paymentFormTanggal,
                        });
                      }}
                      className="bg-rose-700 text-white px-4 py-2 rounded-md text-sm hover:bg-rose-800 disabled:opacity-40"
                    >
                      {addPaymentMutation.isPending
                        ? "Menyimpan..."
                        : "Simpan Termin"}
                    </button>
                  </div>
                )}

                {payments.length === 0 ? (
                  <p className="text-sm text-gray-400 py-10 text-center">
                    Belum ada jadwal pembayaran.
                  </p>
                ) : (
                  <ul className="space-y-2">
                    {payments.map((p) => (
                      <li
                        key={p.id}
                        className="border border-gray-100 rounded-md p-3 flex items-center justify-between flex-wrap gap-2"
                      >
                        <div>
                          <p className="text-sm text-gray-800">
                            {p.judul}{" "}
                            <span className="text-xs text-gray-400">
                              · {p.vendor_nama}
                            </span>
                          </p>
                          <p className="text-xs text-gray-400">
                            {formatRupiah(p.nominal)}
                            {p.tanggal_jatuh_tempo
                              ? ` · jatuh tempo ${formatTanggal(p.tanggal_jatuh_tempo)}`
                              : ""}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded-full ${PAYMENT_STATUS_LABEL[p.status_bayar].className}`}
                          >
                            {PAYMENT_STATUS_LABEL[p.status_bayar].label}
                          </span>
                          <select
                            value={p.status_bayar}
                            onChange={(e) =>
                              updatePaymentMutation.mutate({
                                paymentId: p.id,
                                payload: {
                                  status_bayar: e.target
                                    .value as PaymentStatusBayar,
                                },
                              })
                            }
                            className="border border-gray-300 rounded-md px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-rose-300"
                          >
                            <option value="belum_bayar">Belum Bayar</option>
                            <option value="lunas">Lunas</option>
                          </select>
                          <button
                            onClick={() => deletePaymentMutation.mutate(p.id)}
                            className="text-xs text-gray-400 hover:text-red-600"
                          >
                            Hapus
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default WeddingPlannerTrialVendorTracker;
