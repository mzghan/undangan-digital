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
import {
  generateChecklist,
  updateChecklistItem,
  addChecklistItem,
  deleteChecklistItem,
} from "../api/checklist";
import { setWeddingDate } from "../api/timeline";
import type {
  Step2BudgetResponse,
  Step2KonsepResponse,
  BudgetTier,
  PriceItem,
} from "../types/weddingTrial";
import type {
  ChecklistItem,
  ChecklistItemUpdateRequest,
} from "../types/checklist";
import type { TimelineResponse } from "../types/timeline";

type Step =
  | "loading"
  | "kota"
  | "jalur"
  | "budget-input"
  | "konsep-input"
  | "hasil";

type ResultTab = "budget" | "checklist" | "timeline";

const KOTA_OPTIONS = ["Jakarta", "Bandung"];
const KONSEP_OPTIONS = [
  { value: "gedung", label: "Gedung" },
  { value: "taman", label: "Taman / Outdoor" },
  { value: "cafe", label: "Cafe / Resto" },
];

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

function formatBulanTahun(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    month: "long",
    year: "numeric",
  });
}

function groupItemsByMonth(
  items: ChecklistItem[],
): { label: string; items: ChecklistItem[] }[] {
  const sorted = [...items].sort((a, b) => {
    const da = a.deadline_date ? new Date(a.deadline_date).getTime() : Infinity;
    const db = b.deadline_date ? new Date(b.deadline_date).getTime() : Infinity;
    return da - db;
  });

  const groups: { label: string; items: ChecklistItem[] }[] = [];
  for (const item of sorted) {
    const label = item.deadline_date
      ? formatBulanTahun(item.deadline_date)
      : "Belum ditentukan";
    const existing = groups.find((g) => g.label === label);
    if (existing) {
      existing.items.push(item);
    } else {
      groups.push({ label, items: [item] });
    }
  }
  return groups;
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
  const [resultTab, setResultTab] = useState<ResultTab>("budget");
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([]);
  const [checklistBudgetTotal, setChecklistBudgetTotal] = useState<
    number | null
  >(null);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [editItemName, setEditItemName] = useState("");
  const [editItemHarga, setEditItemHarga] = useState("");
  const [newItemName, setNewItemName] = useState("");
  const [newItemHarga, setNewItemHarga] = useState("");
  const [weddingDateInput, setWeddingDateInput] = useState("");
  const [weddingDateSaved, setWeddingDateSaved] = useState<string | null>(null);

  function getCurrentBudgetTotal(): number | null {
    if (budgetResult) return budgetResult.budget_total;
    if (konsepResult) return konsepResult.tiers[activeTierIndex].budget_total;
    return null;
  }

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
      setResultTab("budget");
      setStep("hasil");
    },
  });

  const konsepMutation = useMutation({
    mutationFn: (konsep: string) => chooseKonsep(sessionId as string, konsep),
    onSuccess: (res) => {
      setKonsepResult(res);
      setResultTab("budget");
      setStep("hasil");
    },
  });

  const timelineMutation = useMutation<TimelineResponse, Error, string>({
    mutationFn: (weddingDateStr) =>
      setWeddingDate({
        session_id: sessionId as string,
        wedding_date: weddingDateStr,
      }),
    onSuccess: (res) => {
      setChecklistItems(res.items);
      setWeddingDateSaved(res.wedding_date);
    },
  });

  const checklistMutation = useMutation<ChecklistItem[], Error, number>({
    mutationFn: (budgetTotal) =>
      generateChecklist({
        session_id: sessionId as string,
        budget_total: budgetTotal,
      }),
    onSuccess: (res, budgetTotal) => {
      setChecklistItems(res);
      setChecklistBudgetTotal(budgetTotal);
      setResultTab("checklist");
    },
  });

  const updateItemMutation = useMutation<
    ChecklistItem,
    Error,
    { itemId: number; payload: ChecklistItemUpdateRequest }
  >({
    mutationFn: ({ itemId, payload }) => updateChecklistItem(itemId, payload),
    onSuccess: (updatedItem) => {
      setChecklistItems((prev) =>
        prev.map((item) => (item.id === updatedItem.id ? updatedItem : item)),
      );
      setEditingItemId(null);
    },
  });

  const addItemMutation = useMutation<
    ChecklistItem,
    Error,
    { item_name: string; harga_alokasi: number }
  >({
    mutationFn: (payload) =>
      addChecklistItem({
        session_id: sessionId as string,
        item_name: payload.item_name,
        harga_alokasi: payload.harga_alokasi,
      }),
    onSuccess: (newItem) => {
      setChecklistItems((prev) => [...prev, newItem]);
      setNewItemName("");
      setNewItemHarga("");
    },
  });

  const deleteItemMutation = useMutation<void, Error, number>({
    mutationFn: (itemId) => deleteChecklistItem(itemId),
    onSuccess: (_data, itemId) => {
      setChecklistItems((prev) => prev.filter((item) => item.id !== itemId));
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
    setResultTab("budget");
    setChecklistItems([]);
    setChecklistBudgetTotal(null);
    setEditingItemId(null);
    setEditItemName("");
    setEditItemHarga("");
    setNewItemName("");
    setNewItemHarga("");
    setWeddingDateInput("");
    setWeddingDateSaved(null);
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

      {step === "hasil" && (budgetResult || konsepResult) && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex gap-2 border-b border-gray-200 mb-6">
            <button
              onClick={() => setResultTab("budget")}
              className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
                resultTab === "budget"
                  ? "border-rose-700 text-rose-700"
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              Budget
            </button>
            <button
              onClick={() => setResultTab("checklist")}
              className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
                resultTab === "checklist"
                  ? "border-rose-700 text-rose-700"
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              Checklist
            </button>
            <button
              disabled={checklistItems.length === 0}
              onClick={() =>
                checklistItems.length > 0 && setResultTab("timeline")
              }
              title={
                checklistItems.length === 0
                  ? "Selesaikan checklist dulu ya"
                  : undefined
              }
              className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
                checklistItems.length === 0
                  ? "border-transparent text-gray-300 cursor-not-allowed"
                  : resultTab === "timeline"
                    ? "border-rose-700 text-rose-700"
                    : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              Timeline
            </button>
          </div>

          {resultTab === "budget" && (
            <div>
              {konsepResult && (
                <>
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
                </>
              )}

              {budgetResult && !konsepResult && (
                <>
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
                </>
              )}

              <button
                disabled={checklistMutation.isPending}
                onClick={() => {
                  const total = getCurrentBudgetTotal();
                  if (total !== null) checklistMutation.mutate(total);
                }}
                className="mt-6 bg-rose-700 text-white px-6 py-2 rounded-md hover:bg-rose-800 transition-colors disabled:opacity-40"
              >
                {checklistMutation.isPending
                  ? "Menyusun checklist..."
                  : checklistItems.length > 0
                    ? "Generate Ulang Checklist"
                    : "Lanjut ke Checklist"}
              </button>
            </div>
          )}

          {resultTab === "checklist" && (
            <div>
              {checklistItems.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-sm text-gray-500 mb-4">
                    Checklist belum dibuat. Buat checklist dari budget yang
                    sudah kamu tentukan di tab Budget.
                  </p>
                  <button
                    disabled={checklistMutation.isPending}
                    onClick={() => {
                      const total = getCurrentBudgetTotal();
                      if (total !== null) checklistMutation.mutate(total);
                    }}
                    className="bg-rose-700 text-white px-6 py-2 rounded-md hover:bg-rose-800 transition-colors disabled:opacity-40"
                  >
                    {checklistMutation.isPending
                      ? "Menyusun checklist..."
                      : "Generate Checklist"}
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-lg font-semibold text-gray-800 mb-1">
                    Checklist Persiapan
                  </h2>
                  <p className="text-sm text-gray-400 mb-4">
                    Dibuat otomatis dari kebutuhan wajib &amp; penting sesuai
                    budget kamu. Kamu bisa edit, hapus, atau tambah item
                    sendiri.
                  </p>

                  <ul>
                    {checklistItems.map((item) => (
                      <li
                        key={item.id}
                        className="py-3 border-b border-gray-100 last:border-0"
                      >
                        {editingItemId === item.id ? (
                          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                            <input
                              type="text"
                              value={editItemName}
                              onChange={(e) => setEditItemName(e.target.value)}
                              className="flex-1 border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                            />
                            <input
                              type="number"
                              value={editItemHarga}
                              onChange={(e) => setEditItemHarga(e.target.value)}
                              className="w-full sm:w-40 border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                            />
                            <div className="flex gap-2 shrink-0">
                              <button
                                onClick={() =>
                                  updateItemMutation.mutate({
                                    itemId: item.id,
                                    payload: {
                                      item_name: editItemName,
                                      harga_alokasi: Number(editItemHarga),
                                    },
                                  })
                                }
                                disabled={updateItemMutation.isPending}
                                className="text-xs bg-rose-700 text-white px-3 py-1.5 rounded-md hover:bg-rose-800 disabled:opacity-40"
                              >
                                Simpan
                              </button>
                              <button
                                onClick={() => setEditingItemId(null)}
                                className="text-xs text-gray-500 px-3 py-1.5 rounded-md hover:bg-gray-100"
                              >
                                Batal
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between">
                            <label className="flex items-center gap-3 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={item.is_done}
                                onChange={() =>
                                  updateItemMutation.mutate({
                                    itemId: item.id,
                                    payload: { is_done: !item.is_done },
                                  })
                                }
                                className="w-4 h-4 accent-rose-700"
                              />
                              <span
                                className={`text-sm ${item.is_done ? "line-through text-gray-400" : "text-gray-800"}`}
                              >
                                {item.item_name}
                              </span>
                            </label>
                            <div className="flex items-center gap-3 ml-4">
                              <span className="text-sm font-medium text-gray-600 whitespace-nowrap">
                                {formatRupiah(item.harga_alokasi)}
                              </span>
                              <button
                                onClick={() => {
                                  setEditingItemId(item.id);
                                  setEditItemName(item.item_name);
                                  setEditItemHarga(String(item.harga_alokasi));
                                }}
                                className="text-xs text-gray-400 hover:text-rose-700"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() =>
                                  deleteItemMutation.mutate(item.id)
                                }
                                disabled={deleteItemMutation.isPending}
                                className="text-xs text-gray-400 hover:text-red-600"
                              >
                                Hapus
                              </button>
                            </div>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-gray-100 sm:flex-row sm:items-center">
                    <input
                      type="text"
                      value={newItemName}
                      onChange={(e) => setNewItemName(e.target.value)}
                      placeholder="Nama item baru"
                      className="flex-1 border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                    />
                    <input
                      type="number"
                      value={newItemHarga}
                      onChange={(e) => setNewItemHarga(e.target.value)}
                      placeholder="Harga"
                      className="w-full sm:w-40 border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                    />
                    <button
                      disabled={!newItemName || addItemMutation.isPending}
                      onClick={() =>
                        addItemMutation.mutate({
                          item_name: newItemName,
                          harga_alokasi: Number(newItemHarga) || 0,
                        })
                      }
                      className="text-sm bg-white border border-rose-700 text-rose-700 px-4 py-1.5 rounded-md hover:bg-rose-50 disabled:opacity-40 shrink-0"
                    >
                      {addItemMutation.isPending
                        ? "Menambah..."
                        : "+ Tambah Item"}
                    </button>
                  </div>

                  {(() => {
                    const totalChecklist = checklistItems.reduce(
                      (sum, item) => sum + item.harga_alokasi,
                      0,
                    );
                    const overBudget =
                      checklistBudgetTotal !== null &&
                      totalChecklist > checklistBudgetTotal;

                    return (
                      <div className="mt-4 pt-4 border-t-2 border-gray-200">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold text-gray-800">
                            Total Checklist
                          </p>
                          <p
                            className={`text-sm font-semibold ${overBudget ? "text-red-600" : "text-rose-700"}`}
                          >
                            {formatRupiah(totalChecklist)}
                          </p>
                        </div>
                        {checklistBudgetTotal !== null && (
                          <div className="flex items-center justify-between mt-1">
                            <p className="text-xs text-gray-400">Budget kamu</p>
                            <p className="text-xs text-gray-400">
                              {formatRupiah(checklistBudgetTotal)}
                            </p>
                          </div>
                        )}
                        {overBudget && (
                          <p className="text-xs text-red-600 bg-red-50 rounded-md px-3 py-2 mt-3">
                            ⚠️ Total melebihi budget kamu (kelebihan{" "}
                            {formatRupiah(
                              totalChecklist - (checklistBudgetTotal ?? 0),
                            )}
                            )
                          </p>
                        )}
                      </div>
                    );
                  })()}
                </>
              )}
            </div>
          )}

          {resultTab === "timeline" && (
            <div>
              {checklistItems.length === 0 ? (
                <p className="text-sm text-gray-400 py-10 text-center">
                  Selesaikan checklist dulu untuk membuka timeline.
                </p>
              ) : !weddingDateSaved ? (
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-1">
                    Kapan rencana hari-H kamu?
                  </h2>
                  <p className="text-sm text-gray-400 mb-4">
                    Kami bantu petakan kapan tiap item checklist idealnya sudah
                    fix, dihitung mundur dari tanggal ini.
                  </p>
                  <input
                    type="date"
                    value={weddingDateInput}
                    onChange={(e) => setWeddingDateInput(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-rose-300"
                  />
                  <button
                    disabled={!weddingDateInput || timelineMutation.isPending}
                    onClick={() => timelineMutation.mutate(weddingDateInput)}
                    className="bg-rose-700 text-white px-6 py-2 rounded-md hover:bg-rose-800 transition-colors disabled:opacity-40"
                  >
                    {timelineMutation.isPending
                      ? "Menyusun timeline..."
                      : "Susun Timeline"}
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">
                        Timeline Persiapan
                      </h2>
                      <p className="text-sm text-gray-400">
                        Menuju hari-H: {formatTanggal(weddingDateSaved)}
                      </p>
                    </div>
                    <button
                      onClick={() => setWeddingDateSaved(null)}
                      className="text-xs text-gray-400 hover:text-rose-700 shrink-0"
                    >
                      Ubah Tanggal
                    </button>
                  </div>

                  {groupItemsByMonth(checklistItems).map((group) => (
                    <div key={group.label} className="mb-6">
                      <h3 className="text-sm font-semibold text-gray-700 mb-2">
                        {group.label}
                      </h3>
                      <ul>
                        {group.items.map((item) => (
                          <li
                            key={item.id}
                            className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                          >
                            <span
                              className={`text-sm ${item.is_done ? "line-through text-gray-400" : "text-gray-800"}`}
                            >
                              {item.item_name}
                            </span>
                            <span className="text-xs text-gray-400 whitespace-nowrap ml-4">
                              {item.deadline_date
                                ? formatTanggal(item.deadline_date)
                                : "—"}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default WeddingPlannerTrial;
