import { useState } from "react";
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
  generateChecklistPremium,
  updateChecklistItemPremium,
  addChecklistItemPremium,
  deleteChecklistItemPremium,
  addSubtask,
  updateSubtask,
  deleteSubtask,
} from "../api/checklistPremium";
import type {
  Step2BudgetResponse,
  Step2KonsepResponse,
} from "../types/weddingTrial";
import type {
  ChecklistItemPremium,
  ChecklistPrioritas,
  ChecklistStatus,
} from "../types/checklistPremium";
import { formatRupiah, TierBreakdown } from "../components/BudgetBreakdown";
import { useEffect } from "react";

type Step =
  | "loading"
  | "kota"
  | "jalur"
  | "budget-input"
  | "konsep-input"
  | "hasil";

type ResultTab = "budget" | "checklist";

const KOTA_OPTIONS = ["Jakarta", "Bandung"];
const KONSEP_OPTIONS = [
  { value: "gedung", label: "Gedung" },
  { value: "taman", label: "Taman / Outdoor" },
  { value: "cafe", label: "Cafe / Resto" },
];
const PAKET = "premium" as const;

const PRIORITAS_LABEL: Record<
  ChecklistPrioritas,
  { label: string; className: string }
> = {
  wajib: { label: "Wajib", className: "bg-rose-100 text-rose-800" },
  penting: { label: "Penting", className: "bg-amber-100 text-amber-800" },
  opsional: { label: "Opsional", className: "bg-gray-100 text-gray-600" },
};

const STATUS_OPTIONS: { value: ChecklistStatus; label: string }[] = [
  { value: "belum", label: "Belum" },
  { value: "proses", label: "Proses" },
  { value: "selesai", label: "Selesai" },
];

function WeddingPlannerTrialPremium() {
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
  const [activeTierIndex, setActiveTierIndex] = useState(1);
  const [resultTab, setResultTab] = useState<ResultTab>("budget");

  // --- state Checklist Lengkap ---
  const [checklistItems, setChecklistItems] = useState<ChecklistItemPremium[]>(
    [],
  );
  const [checklistBudgetTotal, setChecklistBudgetTotal] = useState<
    number | null
  >(null);
  const [expandedItemId, setExpandedItemId] = useState<number | null>(null);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [editItemName, setEditItemName] = useState("");
  const [editItemHarga, setEditItemHarga] = useState("");
  const [editItemPrioritas, setEditItemPrioritas] =
    useState<ChecklistPrioritas>("penting");
  const [editItemCatatan, setEditItemCatatan] = useState("");
  const [newItemName, setNewItemName] = useState("");
  const [newItemHarga, setNewItemHarga] = useState("");
  const [subtaskInputByItem, setSubtaskInputByItem] = useState<
    Record<number, string>
  >({});

  function getCurrentBudgetTotal(): number | null {
    if (budgetResult) return budgetResult.budget_total;
    if (konsepResult) return konsepResult.tiers[activeTierIndex].budget_total;
    return null;
  }

  useEffect(() => {
    const existing = getStoredSessionId(PAKET);
    if (existing) {
      setSessionId(existing);
      setStep("kota");
      return;
    }

    startTrial(PAKET)
      .then((res) => {
        setStoredSessionId(res.session_id, PAKET);
        setSessionId(res.session_id);
        setStep("kota");
      })
      .catch(() => setStep("kota"));
  }, []);

  const kotaMutation = useMutation({
    mutationFn: (kotaDipilih: string) =>
      chooseKota(sessionId as string, kotaDipilih, PAKET),
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

  const checklistMutation = useMutation<ChecklistItemPremium[], Error, number>({
    mutationFn: (budgetTotal) =>
      generateChecklistPremium({
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
    ChecklistItemPremium,
    Error,
    {
      itemId: number;
      payload: Parameters<typeof updateChecklistItemPremium>[1];
    }
  >({
    mutationFn: ({ itemId, payload }) =>
      updateChecklistItemPremium(itemId, payload),
    onSuccess: (updatedItem) => {
      setChecklistItems((prev) =>
        prev.map((item) => (item.id === updatedItem.id ? updatedItem : item)),
      );
      setEditingItemId(null);
    },
  });

  const addItemMutation = useMutation<
    ChecklistItemPremium,
    Error,
    { item_name: string; harga_alokasi: number }
  >({
    mutationFn: (payload) =>
      addChecklistItemPremium({
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
    mutationFn: (itemId) => deleteChecklistItemPremium(itemId),
    onSuccess: (_data, itemId) => {
      setChecklistItems((prev) => prev.filter((item) => item.id !== itemId));
    },
  });

  const addSubtaskMutation = useMutation<
    ChecklistItemPremium extends never
      ? never
      : Awaited<ReturnType<typeof addSubtask>>,
    Error,
    { checklistItemId: number; nama: string }
  >({
    mutationFn: ({ checklistItemId, nama }) =>
      addSubtask({ checklist_item_id: checklistItemId, nama }),
    onSuccess: (newSubtask, variables) => {
      setChecklistItems((prev) =>
        prev.map((item) =>
          item.id === variables.checklistItemId
            ? { ...item, subtasks: [...item.subtasks, newSubtask] }
            : item,
        ),
      );
      setSubtaskInputByItem((prev) => ({
        ...prev,
        [variables.checklistItemId]: "",
      }));
    },
  });

  const toggleSubtaskMutation = useMutation<
    Awaited<ReturnType<typeof updateSubtask>>,
    Error,
    { itemId: number; subtaskId: number; is_done: boolean }
  >({
    mutationFn: ({ subtaskId, is_done }) =>
      updateSubtask(subtaskId, { is_done }),
    onSuccess: (updatedSubtask, variables) => {
      setChecklistItems((prev) =>
        prev.map((item) =>
          item.id === variables.itemId
            ? {
                ...item,
                subtasks: item.subtasks.map((s) =>
                  s.id === updatedSubtask.id ? updatedSubtask : s,
                ),
              }
            : item,
        ),
      );
    },
  });

  const deleteSubtaskMutation = useMutation<
    void,
    Error,
    { itemId: number; subtaskId: number }
  >({
    mutationFn: ({ subtaskId }) => deleteSubtask(subtaskId),
    onSuccess: (_data, variables) => {
      setChecklistItems((prev) =>
        prev.map((item) =>
          item.id === variables.itemId
            ? {
                ...item,
                subtasks: item.subtasks.filter(
                  (s) => s.id !== variables.subtaskId,
                ),
              }
            : item,
        ),
      );
    },
  });

  function handleReset() {
    clearStoredSessionId(PAKET);
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
    setExpandedItemId(null);
    setEditingItemId(null);
    setStep("loading");
    startTrial(PAKET).then((res) => {
      setStoredSessionId(res.session_id, PAKET);
      setSessionId(res.session_id);
      setStep("kota");
    });
  }

  return (
    <div className="max-w-3xl mx-auto p-8">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-3xl font-bold text-rose-800">
          Coba Wedding Planner Premium
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
        pernikahanmu secara lebih lengkap.
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
                    : "Lanjut ke Checklist Lengkap"}
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
                    Checklist Lengkap
                  </h2>
                  <p className="text-sm text-gray-400 mb-4">
                    Termasuk kebutuhan wajib, penting, dan opsional. Setiap item
                    bisa dikasih catatan dan dipecah jadi sub-tugas kecil.
                  </p>

                  <ul>
                    {checklistItems.map((item) => (
                      <li
                        key={item.id}
                        className="py-3 border-b border-gray-100 last:border-0"
                      >
                        {editingItemId === item.id ? (
                          <div className="flex flex-col gap-2 bg-gray-50 rounded-md p-3">
                            <input
                              type="text"
                              value={editItemName}
                              onChange={(e) => setEditItemName(e.target.value)}
                              className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                              placeholder="Nama item"
                            />
                            <div className="flex flex-col gap-2 sm:flex-row">
                              <input
                                type="number"
                                value={editItemHarga}
                                onChange={(e) =>
                                  setEditItemHarga(e.target.value)
                                }
                                className="flex-1 border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                                placeholder="Harga alokasi"
                              />
                              <select
                                value={editItemPrioritas}
                                onChange={(e) =>
                                  setEditItemPrioritas(
                                    e.target.value as ChecklistPrioritas,
                                  )
                                }
                                className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                              >
                                <option value="wajib">Wajib</option>
                                <option value="penting">Penting</option>
                                <option value="opsional">Opsional</option>
                              </select>
                            </div>
                            <textarea
                              value={editItemCatatan}
                              onChange={(e) =>
                                setEditItemCatatan(e.target.value)
                              }
                              placeholder="Catatan (opsional)"
                              rows={2}
                              className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                            />
                            <div className="flex gap-2">
                              <button
                                onClick={() =>
                                  updateItemMutation.mutate({
                                    itemId: item.id,
                                    payload: {
                                      item_name: editItemName,
                                      harga_alokasi: Number(editItemHarga),
                                      prioritas: editItemPrioritas,
                                      catatan: editItemCatatan,
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
                          <div>
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span
                                    className={`text-xs px-2 py-0.5 rounded-full ${PRIORITAS_LABEL[item.prioritas].className}`}
                                  >
                                    {PRIORITAS_LABEL[item.prioritas].label}
                                  </span>
                                  <span className="text-sm text-gray-800">
                                    {item.item_name}
                                  </span>
                                </div>
                                {item.catatan && (
                                  <p className="text-xs text-gray-400 mt-1">
                                    📝 {item.catatan}
                                  </p>
                                )}
                              </div>
                              <div className="flex items-center gap-2 shrink-0">
                                <span className="text-sm font-medium text-gray-600 whitespace-nowrap">
                                  {formatRupiah(item.harga_alokasi)}
                                </span>
                                <select
                                  value={item.status}
                                  onChange={(e) =>
                                    updateItemMutation.mutate({
                                      itemId: item.id,
                                      payload: {
                                        status: e.target
                                          .value as ChecklistStatus,
                                      },
                                    })
                                  }
                                  className="text-xs border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-rose-300"
                                >
                                  {STATUS_OPTIONS.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                      {opt.label}
                                    </option>
                                  ))}
                                </select>
                                <button
                                  onClick={() => {
                                    setEditingItemId(item.id);
                                    setEditItemName(item.item_name);
                                    setEditItemHarga(
                                      String(item.harga_alokasi),
                                    );
                                    setEditItemPrioritas(item.prioritas);
                                    setEditItemCatatan(item.catatan ?? "");
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

                            <button
                              onClick={() =>
                                setExpandedItemId(
                                  expandedItemId === item.id ? null : item.id,
                                )
                              }
                              className="text-xs text-rose-700 mt-2 hover:underline"
                            >
                              {expandedItemId === item.id
                                ? "Sembunyikan"
                                : "Lihat"}{" "}
                              sub-tugas ({item.subtasks.length})
                            </button>

                            {expandedItemId === item.id && (
                              <div className="mt-2 ml-4 border-l-2 border-gray-100 pl-4">
                                <ul>
                                  {item.subtasks.map((sub) => (
                                    <li
                                      key={sub.id}
                                      className="flex items-center justify-between py-1.5"
                                    >
                                      <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                          type="checkbox"
                                          checked={sub.is_done}
                                          onChange={() =>
                                            toggleSubtaskMutation.mutate({
                                              itemId: item.id,
                                              subtaskId: sub.id,
                                              is_done: !sub.is_done,
                                            })
                                          }
                                          className="w-3.5 h-3.5 accent-rose-700"
                                        />
                                        <span
                                          className={`text-xs ${sub.is_done ? "line-through text-gray-400" : "text-gray-700"}`}
                                        >
                                          {sub.nama}
                                        </span>
                                      </label>
                                      <button
                                        onClick={() =>
                                          deleteSubtaskMutation.mutate({
                                            itemId: item.id,
                                            subtaskId: sub.id,
                                          })
                                        }
                                        className="text-xs text-gray-300 hover:text-red-600"
                                      >
                                        Hapus
                                      </button>
                                    </li>
                                  ))}
                                </ul>
                                <div className="flex gap-2 mt-2">
                                  <input
                                    type="text"
                                    value={subtaskInputByItem[item.id] ?? ""}
                                    onChange={(e) =>
                                      setSubtaskInputByItem((prev) => ({
                                        ...prev,
                                        [item.id]: e.target.value,
                                      }))
                                    }
                                    placeholder="Sub-tugas baru"
                                    className="flex-1 border border-gray-300 rounded-md px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-rose-300"
                                  />
                                  <button
                                    disabled={
                                      !subtaskInputByItem[item.id] ||
                                      addSubtaskMutation.isPending
                                    }
                                    onClick={() =>
                                      addSubtaskMutation.mutate({
                                        checklistItemId: item.id,
                                        nama: subtaskInputByItem[item.id],
                                      })
                                    }
                                    className="text-xs bg-white border border-rose-700 text-rose-700 px-3 py-1 rounded-md hover:bg-rose-50 disabled:opacity-40"
                                  >
                                    + Tambah
                                  </button>
                                </div>
                              </div>
                            )}
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
        </div>
      )}
    </div>
  );
}

export default WeddingPlannerTrialPremium;
