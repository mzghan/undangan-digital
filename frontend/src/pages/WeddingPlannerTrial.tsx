import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  startTrial,
  chooseKota,
  chooseBudget,
  chooseKonsep,
  getStoredSessionId,
  setStoredSessionId,
  clearStoredSessionId,
} from "../api/weddingTrial";
import type {
  Step2BudgetResponse,
  Step2KonsepResponse,
  BudgetTier,
  PriceItem,
} from "../types/weddingTrial";

type Step =
  | "loading"
  | "kota"
  | "jalur"
  | "budget-input"
  | "hasil-budget"
  | "konsep-input"
  | "hasil-konsep";

const KOTA_OPTIONS = ["Jakarta", "Bandung"];
const KONSEP_OPTIONS = [
  { value: "gedung", label: "Gedung" },
  { value: "taman", label: "Taman / Outdoor" },
  { value: "cafe", label: "Cafe / Resto" },
];

function formatRupiah(value: number): string {
  return `Rp ${value.toLocaleString("id-ID")}`;
}

const STATUS_BUDGET_LABEL: Record<
  string,
  { label: string; className: string }
> = {
  terbatas: {
    label: "Budget Terbatas",
    className: "bg-amber-100 text-amber-800",
  },
  normal: {
    label: "Budget Normal",
    className: "bg-emerald-100 text-emerald-800",
  },
  leluasa: { label: "Budget Leluasa", className: "bg-sky-100 text-sky-800" },
};

function PriceItemRow({ item }: { item: PriceItem }) {
  return (
    <li className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
      <div>
        <p className="text-sm text-gray-800">{item.item_name}</p>
        {item.bisa_diskip && (
          <span className="text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full mt-1 inline-block">
            Bisa dilewati dulu
          </span>
        )}
      </div>
      <div className="text-right ml-4 whitespace-nowrap">
        <p className="text-sm font-medium text-gray-800">
          {item.bisa_diskip ? "—" : formatRupiah(item.harga_alokasi)}
        </p>
        <p className="text-xs text-gray-400">
          Kisaran pasar: {formatRupiah(item.harga_estimasi_min)} –{" "}
          {formatRupiah(item.harga_estimasi_max)}
        </p>
      </div>
    </li>
  );
}

function TierBreakdown({ tier }: { tier: BudgetTier }) {
  const semuaItem = [
    ...tier.items_wajib,
    ...tier.items_penting,
    ...tier.items_opsional,
  ];
  const totalAlokasi = semuaItem.reduce(
    (sum, item) => sum + item.harga_alokasi,
    0,
  );

  return (
    <div>
      <div className="flex items-center gap-3 mb-1">
        <h2 className="text-lg font-semibold text-gray-800">
          {formatRupiah(tier.budget_total)}
        </h2>
        <span
          className={`text-xs px-2 py-1 rounded-full ${STATUS_BUDGET_LABEL[tier.status_budget]?.className}`}
        >
          {STATUS_BUDGET_LABEL[tier.status_budget]?.label}
        </span>
      </div>

      <div className="mb-6 mt-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Wajib</h3>
        <ul>
          {tier.items_wajib.map((i) => (
            <PriceItemRow key={i.item_name} item={i} />
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Penting</h3>
        <ul>
          {tier.items_penting.map((i) => (
            <PriceItemRow key={i.item_name} item={i} />
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Opsional</h3>
        <ul>
          {tier.items_opsional.map((i) => (
            <PriceItemRow key={i.item_name} item={i} />
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-between pt-3 border-t-2 border-gray-200">
        <p className="text-sm font-semibold text-gray-800">Total Alokasi</p>
        <p className="text-sm font-semibold text-rose-700">
          {formatRupiah(totalAlokasi)}
        </p>
      </div>
    </div>
  );
}

function WeddingPlannerTrial() {
  const [step, setStep] = useState<Step>("loading");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [kota, setKota] = useState("");
  const [kotaError, setKotaError] = useState<string | null>(null);
  const [budgetInput, setBudgetInput] = useState("");
  const [selectedKonsep, setSelectedKonsep] = useState("");
  const [budgetResult, setBudgetResult] = useState<Step2BudgetResponse | null>(
    null,
  );
  const [konsepResult, setKonsepResult] = useState<Step2KonsepResponse | null>(
    null,
  );
  const [activeTierIndex, setActiveTierIndex] = useState(1); // default: tab "Ideal" (index 1)

  // Mulai sesi trial saat halaman pertama dibuka
  useEffect(() => {
    const existing = getStoredSessionId();
    if (existing) {
      setSessionId(existing);
      setStep("kota");
      return;
    }

    startTrial()
      .then((res) => {
        setStoredSessionId(res.session_id);
        setSessionId(res.session_id);
        setStep("kota");
      })
      .catch(() => setStep("kota")); // tetap lanjut, error ditangani saat submit
  }, []);

  const kotaMutation = useMutation({
    mutationFn: (kotaDipilih: string) =>
      chooseKota(sessionId as string, kotaDipilih),
    onSuccess: (res) => {
      if (!res.kota_tersedia) {
        setKotaError(
          `Maaf, kota "${res.kota}" belum tersedia untuk trial. Coba Jakarta atau Bandung dulu ya.`,
        );
        return;
      }
      setKotaError(null);
      setStep("jalur");
    },
  });

  const budgetMutation = useMutation({
    mutationFn: (budgetTotal: number) =>
      chooseBudget(sessionId as string, budgetTotal),
    onSuccess: (res) => {
      setBudgetResult(res);
      setStep("hasil-budget");
    },
  });

  const konsepMutation = useMutation({
    mutationFn: (konsep: string) => chooseKonsep(sessionId as string, konsep),
    onSuccess: (res) => {
      setKonsepResult(res);
      setStep("hasil-konsep");
    },
  });

  function handleReset() {
    clearStoredSessionId();
    setSessionId(null);
    setKota("");
    setKotaError(null);
    setBudgetInput("");
    setSelectedKonsep("");
    setBudgetResult(null);
    setKonsepResult(null);
    setActiveTierIndex(1);
    setStep("loading");
    startTrial().then((res) => {
      setStoredSessionId(res.session_id);
      setSessionId(res.session_id);
      setStep("kota");
    });
  }

  return (
    <div className="max-w-3xl mx-auto p-8">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-3xl font-bold text-rose-800">
          Coba Wedding Planner Basic
        </h1>
        <button
          onClick={handleReset}
          className="text-sm text-gray-400 hover:text-rose-700"
        >
          Mulai Ulang
        </button>
      </div>
      <p className="text-gray-500 mb-8">
        Isi beberapa pertanyaan singkat, kami bantu susunkan rencana
        pernikahanmu.
      </p>

      {step === "loading" && (
        <p className="text-gray-500">Menyiapkan sesi trial...</p>
      )}

      {step === "kota" && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-1">
            Mau menikah di kota mana?
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            Standar harga vendor beda-beda di tiap kota, jadi kami sesuaikan
            dulu.
          </p>

          <div className="flex gap-3 flex-wrap mb-4">
            {KOTA_OPTIONS.map((opt) => (
              <button
                key={opt}
                onClick={() => setKota(opt)}
                className={`px-4 py-2 rounded-md border text-sm ${
                  kota === opt
                    ? "bg-rose-700 text-white border-rose-700"
                    : "bg-white text-gray-700 border-gray-300 hover:border-rose-400"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          {kotaError && (
            <p className="text-sm text-red-600 mb-4">{kotaError}</p>
          )}

          <button
            disabled={!kota || kotaMutation.isPending}
            onClick={() => kotaMutation.mutate(kota)}
            className="bg-rose-700 text-white px-6 py-2 rounded-md hover:bg-rose-800 transition-colors disabled:opacity-40"
          >
            {kotaMutation.isPending ? "Memproses..." : "Lanjut"}
          </button>
        </div>
      )}

      {step === "jalur" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => setStep("budget-input")}
            className="bg-white rounded-lg shadow-sm p-6 text-left hover:ring-2 hover:ring-rose-300 transition"
          >
            <h3 className="font-semibold text-gray-800 mb-1">
              Saya sudah punya budget
            </h3>
            <p className="text-sm text-gray-500">
              Masukkan nominal budget, kami bantu prioritaskan kebutuhan yang
              wajib dulu.
            </p>
          </button>
          <button
            onClick={() => setStep("konsep-input")}
            className="bg-white rounded-lg shadow-sm p-6 text-left hover:ring-2 hover:ring-rose-300 transition"
          >
            <h3 className="font-semibold text-gray-800 mb-1">
              Saya belum patok budget
            </h3>
            <p className="text-sm text-gray-500">
              Lihat dulu referensi konsep pernikahan (gedung, taman, cafe)
              beserta kisaran harganya.
            </p>
          </button>
        </div>
      )}

      {step === "budget-input" && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-1">
            Berapa budget yang kamu siapkan?
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            Masukkan angka dalam Rupiah, contoh: 150000000
          </p>

          <input
            type="number"
            value={budgetInput}
            onChange={(e) => setBudgetInput(e.target.value)}
            placeholder="150000000"
            className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-rose-300"
          />

          <button
            disabled={!budgetInput || budgetMutation.isPending}
            onClick={() => budgetMutation.mutate(Number(budgetInput))}
            className="bg-rose-700 text-white px-6 py-2 rounded-md hover:bg-rose-800 transition-colors disabled:opacity-40"
          >
            {budgetMutation.isPending ? "Menghitung..." : "Lihat Rekomendasi"}
          </button>
        </div>
      )}

      {step === "hasil-budget" && budgetResult && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-sm text-gray-400 mb-4">
            Rata-rata biaya nikah di kota ini:{" "}
            {formatRupiah(budgetResult.rata_rata_kota_min)} –{" "}
            {formatRupiah(budgetResult.rata_rata_kota_max)}
          </p>
          <TierBreakdown
            tier={{
              label: "Ideal",
              budget_total: budgetResult.budget_total,
              status_budget: budgetResult.status_budget,
              items_wajib: budgetResult.items_wajib,
              items_penting: budgetResult.items_penting,
              items_opsional: budgetResult.items_opsional,
            }}
          />
        </div>
      )}

      {step === "konsep-input" && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Pilih konsep pernikahan
          </h2>
          <div className="flex gap-3 flex-wrap mb-4">
            {KONSEP_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSelectedKonsep(opt.value)}
                className={`px-4 py-2 rounded-md border text-sm ${
                  selectedKonsep === opt.value
                    ? "bg-rose-700 text-white border-rose-700"
                    : "bg-white text-gray-700 border-gray-300 hover:border-rose-400"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <button
            disabled={!selectedKonsep || konsepMutation.isPending}
            onClick={() => konsepMutation.mutate(selectedKonsep)}
            className="bg-rose-700 text-white px-6 py-2 rounded-md hover:bg-rose-800 transition-colors disabled:opacity-40"
          >
            {konsepMutation.isPending
              ? "Menyusun breakdown..."
              : "Lihat Breakdown"}
          </button>
        </div>
      )}

      {step === "hasil-konsep" && konsepResult && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="font-semibold text-gray-800 text-lg">
            {konsepResult.nama_referensi}
          </h2>
          <p className="text-sm text-gray-500 mt-1 mb-4">
            {konsepResult.deskripsi_singkat}
          </p>

          <div className="flex gap-2 border-b border-gray-200 mb-4">
            {konsepResult.tiers.map((tier, idx) => (
              <button
                key={tier.label}
                onClick={() => setActiveTierIndex(idx)}
                className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
                  activeTierIndex === idx
                    ? "border-rose-700 text-rose-700"
                    : "border-transparent text-gray-400 hover:text-gray-600"
                }`}
              >
                {tier.label}
                <span className="block text-xs font-normal">
                  {formatRupiah(tier.budget_total)}
                </span>
              </button>
            ))}
          </div>

          <TierBreakdown tier={konsepResult.tiers[activeTierIndex]} />
        </div>
      )}
    </div>
  );
}

export default WeddingPlannerTrial;
