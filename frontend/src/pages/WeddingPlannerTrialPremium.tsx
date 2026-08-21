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
import {
  setWeddingDatePremium,
  resetDeadlineToRecommended,
} from "../api/timelinePremium";
import type {
  Step2BudgetResponse,
  Step2KonsepResponse,
} from "../types/weddingTrial";
import type {
  ChecklistItemPremium,
  ChecklistPrioritas,
  ChecklistStatus,
} from "../types/checklistPremium";
import {
  addVendor,
  listVendor,
  updateVendor,
  deleteVendor,
} from "../api/vendor";
import {
  addGuest,
  listGuest,
  getGuestSummary,
  updateGuest,
  deleteGuest,
} from "../api/guest";
import {
  addTable,
  listTables,
  listUnassignedGuests,
  updateTable,
  deleteTable,
  assignGuest,
  unassignGuest,
} from "../api/seating";
import type { TimelinePremiumResponse } from "../types/timelinePremium";
import type { Vendor, VendorStatusKontrak } from "../types/vendor";
import type {
  Guest,
  GuestKategori,
  GuestStatusRsvp,
  GuestSummary,
} from "../types/guest";
import type { SeatingTable, UnassignedGuest } from "../types/seating";
import { useRef } from "react";
import { formatRupiah, TierBreakdown } from "../components/BudgetBreakdown";
import { useEffect } from "react";

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
  items: ChecklistItemPremium[],
): { label: string; items: ChecklistItemPremium[] }[] {
  const sorted = [...items].sort((a, b) => {
    const da = a.deadline_date ? new Date(a.deadline_date).getTime() : Infinity;
    const db = b.deadline_date ? new Date(b.deadline_date).getTime() : Infinity;
    return da - db;
  });

  const groups: { label: string; items: ChecklistItemPremium[] }[] = [];
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

type Step =
  | "loading"
  | "kota"
  | "jalur"
  | "budget-input"
  | "konsep-input"
  | "hasil";

type ResultTab =
  | "budget"
  | "checklist"
  | "timeline"
  | "vendor"
  | "tamu"
  | "seating";

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

const GUEST_KATEGORI_OPTIONS: { value: GuestKategori; label: string }[] = [
  { value: "keluarga_pria", label: "Keluarga Pria" },
  { value: "keluarga_wanita", label: "Keluarga Wanita" },
  { value: "teman", label: "Teman" },
  { value: "kolega", label: "Kolega" },
  { value: "lain", label: "Lain-lain" },
];

const GUEST_STATUS_LABEL: Record<
  GuestStatusRsvp,
  { label: string; className: string }
> = {
  belum_diundang: {
    label: "Belum Diundang",
    className: "bg-gray-100 text-gray-600",
  },
  diundang: { label: "Diundang", className: "bg-amber-100 text-amber-800" },
  menunggu_konfirmasi: {
    label: "Menunggu Konfirmasi",
    className: "bg-sky-100 text-sky-800",
  },
  hadir: { label: "Hadir", className: "bg-emerald-100 text-emerald-800" },
  tidak_hadir: { label: "Tidak Hadir", className: "bg-rose-100 text-rose-800" },
};

const GUEST_STATUS_OPTIONS: { value: GuestStatusRsvp; label: string }[] = [
  { value: "belum_diundang", label: "Belum Diundang" },
  { value: "diundang", label: "Diundang" },
  { value: "menunggu_konfirmasi", label: "Menunggu Konfirmasi" },
  { value: "hadir", label: "Hadir" },
  { value: "tidak_hadir", label: "Tidak Hadir" },
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

  // --- state Timeline Premium ---
  const [weddingDateInput, setWeddingDateInput] = useState("");
  const [weddingDateSaved, setWeddingDateSaved] = useState<string | null>(null);
  const [deadlineInputByItem, setDeadlineInputByItem] = useState<
    Record<number, string>
  >({});
  const [catatanInputByItem, setCatatanInputByItem] = useState<
    Record<number, string>
  >({});

  // --- state Checklist Vendor ---
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [vendorLoaded, setVendorLoaded] = useState(false);
  const [showVendorForm, setShowVendorForm] = useState(false);
  const [vendorFormNama, setVendorFormNama] = useState("");
  const [vendorFormKategori, setVendorFormKategori] = useState("");
  const [vendorFormKontak, setVendorFormKontak] = useState("");
  const [vendorFormChecklistItemId, setVendorFormChecklistItemId] =
    useState("");
  const [vendorFormError, setVendorFormError] = useState<string | null>(null);

  // --- state Guest List Manager ---
  const [guests, setGuests] = useState<Guest[]>([]);
  const [guestSummary, setGuestSummary] = useState<GuestSummary | null>(null);
  const [guestLoaded, setGuestLoaded] = useState(false);
  const [showGuestForm, setShowGuestForm] = useState(false);
  const [guestFormNama, setGuestFormNama] = useState("");
  const [guestFormKategori, setGuestFormKategori] = useState<
    GuestKategori | ""
  >("");
  const [guestFormJumlah, setGuestFormJumlah] = useState("1");
  const [guestFormNomorHp, setGuestFormNomorHp] = useState("");
  const [guestFormError, setGuestFormError] = useState<string | null>(null);
  const [guestFilterStatus, setGuestFilterStatus] = useState<
    GuestStatusRsvp | "semua"
  >("semua");

  // --- state Seating Chart ---
  const [tables, setTables] = useState<SeatingTable[]>([]);
  const [unassignedGuests, setUnassignedGuests] = useState<UnassignedGuest[]>(
    [],
  );
  const [seatingLoaded, setSeatingLoaded] = useState(false);
  const [showTableForm, setShowTableForm] = useState(false);
  const [tableFormNama, setTableFormNama] = useState("");
  const [tableFormKapasitas, setTableFormKapasitas] = useState("8");
  const [seatingError, setSeatingError] = useState<string | null>(null);
  const [assignTableByGuest, setAssignTableByGuest] = useState<
    Record<number, string>
  >({});
  const kursiInputRefs = useRef<Record<number, HTMLInputElement | null>>({});

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

  const timelineMutation = useMutation<TimelinePremiumResponse, Error, string>({
    mutationFn: (weddingDateStr) =>
      setWeddingDatePremium({
        session_id: sessionId as string,
        wedding_date: weddingDateStr,
      }),
    onSuccess: (res) => {
      setChecklistItems(res.items);
      setWeddingDateSaved(res.wedding_date);
    },
  });

  const resetDeadlineMutation = useMutation<
    ChecklistItemPremium,
    Error,
    number
  >({
    mutationFn: (itemId) => resetDeadlineToRecommended(itemId),
    onSuccess: (updatedItem) => {
      setChecklistItems((prev) =>
        prev.map((item) => (item.id === updatedItem.id ? updatedItem : item)),
      );
      setDeadlineInputByItem((prev) => {
        const next = { ...prev };
        delete next[updatedItem.id];
        return next;
      });
    },
  });

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
    {
      nama_vendor: string;
      kategori: string;
      kontak_wa: string;
      checklist_item_id: string;
    }
  >({
    mutationFn: (form) =>
      addVendor({
        session_id: sessionId as string,
        nama_vendor: form.nama_vendor,
        kategori: form.kategori || null,
        kontak_wa: form.kontak_wa || null,
        checklist_item_id: form.checklist_item_id
          ? Number(form.checklist_item_id)
          : null,
      }),
    onSuccess: (newVendor) => {
      setVendors((prev) => [...prev, newVendor]);
      setShowVendorForm(false);
      setVendorFormNama("");
      setVendorFormKategori("");
      setVendorFormKontak("");
      setVendorFormChecklistItemId("");
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
    },
  });

  const loadGuestMutation = useMutation<[Guest[], GuestSummary], Error, void>({
    mutationFn: async () => {
      const [list, summary] = await Promise.all([
        listGuest(sessionId as string),
        getGuestSummary(sessionId as string),
      ]);
      return [list, summary];
    },
    onSuccess: ([list, summary]) => {
      setGuests(list);
      setGuestSummary(summary);
      setGuestLoaded(true);
    },
  });

  async function refreshGuestSummary() {
    const summary = await getGuestSummary(sessionId as string);
    setGuestSummary(summary);
  }

  const addGuestMutation = useMutation<
    Guest,
    Error,
    {
      nama_tamu: string;
      kategori: GuestKategori | "";
      jumlah_orang: string;
      nomor_hp: string;
    }
  >({
    mutationFn: (form) =>
      addGuest({
        session_id: sessionId as string,
        nama_tamu: form.nama_tamu,
        kategori: form.kategori || null,
        jumlah_orang: Number(form.jumlah_orang) || 1,
        nomor_hp: form.nomor_hp || null,
      }),
    onSuccess: (newGuest) => {
      setGuests((prev) => [...prev, newGuest]);
      setShowGuestForm(false);
      setGuestFormNama("");
      setGuestFormKategori("");
      setGuestFormJumlah("1");
      setGuestFormNomorHp("");
      setGuestFormError(null);
      refreshGuestSummary();
    },
  });

  const updateGuestMutation = useMutation<
    Guest,
    Error,
    { guestId: number; payload: Parameters<typeof updateGuest>[1] }
  >({
    mutationFn: ({ guestId, payload }) => updateGuest(guestId, payload),
    onSuccess: (updatedGuest) => {
      setGuests((prev) =>
        prev.map((g) => (g.id === updatedGuest.id ? updatedGuest : g)),
      );
      refreshGuestSummary();
    },
  });

  const deleteGuestMutation = useMutation<void, Error, number>({
    mutationFn: (guestId) => deleteGuest(guestId),
    onSuccess: (_data, guestId) => {
      setGuests((prev) => prev.filter((g) => g.id !== guestId));
      refreshGuestSummary();
    },
  });

  async function refreshSeating() {
    const [tableList, unassignedList] = await Promise.all([
      listTables(sessionId as string),
      listUnassignedGuests(sessionId as string),
    ]);
    setTables(tableList);
    setUnassignedGuests(unassignedList);
  }

  const loadSeatingMutation = useMutation<void, Error, void>({
    mutationFn: refreshSeating,
    onSuccess: () => setSeatingLoaded(true),
  });

  const addTableMutation = useMutation<
    SeatingTable,
    Error,
    { nama_meja: string; kapasitas: string }
  >({
    mutationFn: (form) =>
      addTable({
        session_id: sessionId as string,
        nama_meja: form.nama_meja,
        kapasitas: Number(form.kapasitas) || 8,
      }),
    onSuccess: (newTable) => {
      setTables((prev) => [...prev, newTable]);
      setShowTableForm(false);
      setTableFormNama("");
      setTableFormKapasitas("8");
      setSeatingError(null);
    },
    onError: (err) => setSeatingError(err.message),
  });

  const updateTableMutation = useMutation<
    SeatingTable,
    Error,
    { tableId: number; payload: Parameters<typeof updateTable>[1] }
  >({
    mutationFn: ({ tableId, payload }) => updateTable(tableId, payload),
    onSuccess: (updatedTable) => {
      setTables((prev) =>
        prev.map((t) => (t.id === updatedTable.id ? updatedTable : t)),
      );
      setSeatingError(null);
    },
    onError: (err) => setSeatingError(err.message),
  });

  const deleteTableMutation = useMutation<void, Error, number>({
    mutationFn: (tableId) => deleteTable(tableId),
    onSuccess: () => {
      refreshSeating();
    },
  });

  const assignGuestMutation = useMutation<
    SeatingTable,
    Error,
    { table_id: number; guest_id: number; jumlah_kursi?: number }
  >({
    mutationFn: (payload) =>
      assignGuest({ session_id: sessionId as string, ...payload }),
    onSuccess: () => {
      refreshSeating();
      setSeatingError(null);
    },
    onError: (err) => setSeatingError(err.message),
  });

  const unassignGuestMutation = useMutation<void, Error, number>({
    mutationFn: (assignmentId) => unassignGuest(assignmentId),
    onSuccess: () => {
      refreshSeating();
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
    setWeddingDateInput("");
    setWeddingDateSaved(null);
    setDeadlineInputByItem({});
    setCatatanInputByItem({});
    setVendors([]);
    setVendorLoaded(false);
    setShowVendorForm(false);
    setVendorFormNama("");
    setVendorFormKategori("");
    setVendorFormKontak("");
    setVendorFormChecklistItemId("");
    setVendorFormError(null);
    setGuests([]);
    setGuestSummary(null);
    setGuestLoaded(false);
    setShowGuestForm(false);
    setGuestFormNama("");
    setGuestFormKategori("");
    setGuestFormJumlah("1");
    setGuestFormNomorHp("");
    setGuestFormError(null);
    setGuestFilterStatus("semua");
    setTables([]);
    setUnassignedGuests([]);
    setSeatingLoaded(false);
    setShowTableForm(false);
    setTableFormNama("");
    setTableFormKapasitas("8");
    setSeatingError(null);
    setAssignTableByGuest({});
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
            <button
              onClick={() =>
                checklistItems.length > 0 && setResultTab("timeline")
              }
              disabled={checklistItems.length === 0}
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
                setResultTab("tamu");
                if (!guestLoaded) loadGuestMutation.mutate();
              }}
              className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
                resultTab === "tamu"
                  ? "border-rose-700 text-rose-700"
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              Tamu
            </button>
            <button
              onClick={() => {
                setResultTab("seating");
                if (!seatingLoaded) loadSeatingMutation.mutate();
              }}
              className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
                resultTab === "seating"
                  ? "border-rose-700 text-rose-700"
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              Seating
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
                    fix, dihitung mundur dari tanggal ini — item prioritas wajib
                    dimajukan, opsional boleh lebih santai.
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
                            className="py-3 border-b border-gray-100 last:border-0"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span
                                  className={`text-sm ${item.status === "selesai" ? "line-through text-gray-400" : "text-gray-800"}`}
                                >
                                  {item.item_name}
                                </span>
                                <span
                                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${PRIORITAS_LABEL[item.prioritas].className}`}
                                >
                                  {PRIORITAS_LABEL[item.prioritas].label}
                                </span>
                                {item.deadline_is_custom && (
                                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-sky-100 text-sky-800">
                                    Custom
                                  </span>
                                )}
                              </div>
                              <span className="text-xs text-gray-400 whitespace-nowrap ml-4">
                                {item.deadline_date
                                  ? formatTanggal(item.deadline_date)
                                  : "—"}
                              </span>
                            </div>

                            {item.deadline_is_custom &&
                              item.deadline_recommended && (
                                <p className="text-[11px] text-gray-400 mt-0.5">
                                  Rekomendasi sistem:{" "}
                                  {formatTanggal(item.deadline_recommended)}
                                </p>
                              )}

                            <div className="flex flex-wrap items-center gap-2 mt-2 ml-0">
                              <input
                                type="date"
                                value={
                                  deadlineInputByItem[item.id] ??
                                  (item.deadline_date
                                    ? item.deadline_date.slice(0, 10)
                                    : "")
                                }
                                onChange={(e) =>
                                  setDeadlineInputByItem((prev) => ({
                                    ...prev,
                                    [item.id]: e.target.value,
                                  }))
                                }
                                className="border border-gray-300 rounded-md px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-rose-300"
                              />
                              <button
                                disabled={
                                  !deadlineInputByItem[item.id] ||
                                  updateItemMutation.isPending
                                }
                                onClick={() =>
                                  updateItemMutation.mutate({
                                    itemId: item.id,
                                    payload: {
                                      deadline_date:
                                        deadlineInputByItem[item.id],
                                    },
                                  })
                                }
                                className="text-xs bg-white border border-rose-700 text-rose-700 px-2.5 py-1 rounded-md hover:bg-rose-50 disabled:opacity-40"
                              >
                                Ubah Tanggal
                              </button>
                              {item.deadline_is_custom && (
                                <button
                                  disabled={resetDeadlineMutation.isPending}
                                  onClick={() =>
                                    resetDeadlineMutation.mutate(item.id)
                                  }
                                  className="text-xs text-gray-400 hover:text-rose-700 disabled:opacity-40"
                                >
                                  Reset ke rekomendasi
                                </button>
                              )}
                            </div>

                            <div className="flex gap-2 mt-2">
                              <input
                                type="text"
                                value={
                                  catatanInputByItem[item.id] ??
                                  item.catatan ??
                                  ""
                                }
                                onChange={(e) =>
                                  setCatatanInputByItem((prev) => ({
                                    ...prev,
                                    [item.id]: e.target.value,
                                  }))
                                }
                                placeholder="Tambah catatan untuk item ini..."
                                className="flex-1 border border-gray-300 rounded-md px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-rose-300"
                              />
                              <button
                                disabled={
                                  catatanInputByItem[item.id] === undefined ||
                                  catatanInputByItem[item.id] ===
                                    (item.catatan ?? "") ||
                                  updateItemMutation.isPending
                                }
                                onClick={() =>
                                  updateItemMutation.mutate({
                                    itemId: item.id,
                                    payload: {
                                      catatan: catatanInputByItem[item.id],
                                    },
                                  })
                                }
                                className="text-xs bg-white border border-rose-700 text-rose-700 px-2.5 py-1 rounded-md hover:bg-rose-50 disabled:opacity-40 shrink-0"
                              >
                                Simpan
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

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
                      Vendor
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
                        placeholder="Nama vendor (mis. Gedung Anggun Nusantara)"
                        value={vendorFormNama}
                        onChange={(e) => setVendorFormNama(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                      />
                      <div className="flex gap-3 flex-wrap">
                        <select
                          value={vendorFormKategori}
                          onChange={(e) =>
                            setVendorFormKategori(e.target.value)
                          }
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
                        <select
                          value={vendorFormChecklistItemId}
                          onChange={(e) =>
                            setVendorFormChecklistItemId(e.target.value)
                          }
                          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                        >
                          <option value="">
                            Hubungkan ke item checklist (opsional)
                          </option>
                          {checklistItems.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.item_name}
                            </option>
                          ))}
                        </select>
                      </div>
                      {vendorFormError && (
                        <p className="text-xs text-red-600">
                          {vendorFormError}
                        </p>
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
                            checklist_item_id: vendorFormChecklistItemId,
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
                      {vendors.map((v) => {
                        const linkedItem = checklistItems.find(
                          (i) => i.id === v.checklist_item_id,
                        );
                        return (
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
                                  {linkedItem
                                    ? ` · terhubung ke "${linkedItem.item_name}"`
                                    : ""}
                                </p>
                              </div>
                              <button
                                onClick={() =>
                                  deleteVendorMutation.mutate(v.id)
                                }
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

                              {(v.status_kontrak === "dp" ||
                                v.status_kontrak === "lunas") && (
                                <>
                                  <input
                                    type="number"
                                    placeholder="Nominal DP"
                                    defaultValue={v.nominal_dp ?? ""}
                                    onBlur={(e) => {
                                      const val = e.target.value
                                        ? Number(e.target.value)
                                        : null;
                                      if (val !== v.nominal_dp) {
                                        updateVendorMutation.mutate({
                                          vendorId: v.id,
                                          payload: { nominal_dp: val },
                                        });
                                      }
                                    }}
                                    className="border border-gray-300 rounded-md px-2 py-1 text-xs w-28 focus:outline-none focus:ring-2 focus:ring-rose-300"
                                  />
                                  <input
                                    type="date"
                                    defaultValue={
                                      v.tanggal_dp
                                        ? v.tanggal_dp.slice(0, 10)
                                        : ""
                                    }
                                    onBlur={(e) => {
                                      if (
                                        e.target.value &&
                                        e.target.value !==
                                          v.tanggal_dp?.slice(0, 10)
                                      ) {
                                        updateVendorMutation.mutate({
                                          vendorId: v.id,
                                          payload: {
                                            tanggal_dp: e.target.value,
                                          },
                                        });
                                      }
                                    }}
                                    className="border border-gray-300 rounded-md px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-rose-300"
                                  />
                                </>
                              )}
                            </div>

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
                        );
                      })}
                    </ul>
                  )}
                </div>
              )}
            </div>
          )}

          {resultTab === "tamu" && (
            <div>
              {loadGuestMutation.isPending && !guestLoaded ? (
                <p className="text-sm text-gray-400 py-10 text-center">
                  Memuat daftar tamu...
                </p>
              ) : (
                <div>
                  {guestSummary && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                      <div className="bg-gray-50 rounded-md p-3">
                        <p className="text-xs text-gray-400">Total Undangan</p>
                        <p className="text-lg font-semibold text-gray-800">
                          {guestSummary.total_undangan}
                        </p>
                      </div>
                      <div className="bg-gray-50 rounded-md p-3">
                        <p className="text-xs text-gray-400">Total Orang</p>
                        <p className="text-lg font-semibold text-gray-800">
                          {guestSummary.total_orang}
                        </p>
                      </div>
                      <div className="bg-emerald-50 rounded-md p-3">
                        <p className="text-xs text-emerald-700">
                          Konfirmasi Hadir
                        </p>
                        <p className="text-lg font-semibold text-emerald-800">
                          {guestSummary.by_status["hadir"] ?? 0}
                        </p>
                      </div>
                      <div className="bg-amber-50 rounded-md p-3">
                        <p className="text-xs text-amber-700">Belum Respon</p>
                        <p className="text-lg font-semibold text-amber-800">
                          {(guestSummary.by_status["belum_diundang"] ?? 0) +
                            (guestSummary.by_status["diundang"] ?? 0) +
                            (guestSummary.by_status["menunggu_konfirmasi"] ??
                              0)}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                    <h2 className="text-lg font-semibold text-gray-800">
                      Daftar Tamu
                    </h2>
                    <div className="flex items-center gap-2">
                      <select
                        value={guestFilterStatus}
                        onChange={(e) =>
                          setGuestFilterStatus(
                            e.target.value as GuestStatusRsvp | "semua",
                          )
                        }
                        className="border border-gray-300 rounded-md px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-rose-300"
                      >
                        <option value="semua">Semua Status</option>
                        {GUEST_STATUS_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => setShowGuestForm((prev) => !prev)}
                        className="text-sm bg-rose-700 text-white px-4 py-1.5 rounded-md hover:bg-rose-800 transition-colors"
                      >
                        {showGuestForm ? "Batal" : "+ Tambah Tamu"}
                      </button>
                    </div>
                  </div>

                  {showGuestForm && (
                    <div className="bg-gray-50 rounded-md p-4 mb-4 space-y-3">
                      <input
                        type="text"
                        placeholder="Nama tamu / keluarga (mis. Keluarga Budi)"
                        value={guestFormNama}
                        onChange={(e) => setGuestFormNama(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                      />
                      <div className="flex gap-3 flex-wrap">
                        <select
                          value={guestFormKategori}
                          onChange={(e) =>
                            setGuestFormKategori(
                              e.target.value as GuestKategori | "",
                            )
                          }
                          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                        >
                          <option value="">Kategori (opsional)</option>
                          {GUEST_KATEGORI_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                        <input
                          type="number"
                          min={1}
                          placeholder="Jumlah orang"
                          value={guestFormJumlah}
                          onChange={(e) => setGuestFormJumlah(e.target.value)}
                          className="w-32 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                        />
                        <input
                          type="text"
                          placeholder="No. WhatsApp (opsional)"
                          value={guestFormNomorHp}
                          onChange={(e) => setGuestFormNomorHp(e.target.value)}
                          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                        />
                      </div>
                      {guestFormError && (
                        <p className="text-xs text-red-600">{guestFormError}</p>
                      )}
                      <button
                        disabled={addGuestMutation.isPending}
                        onClick={() => {
                          if (!guestFormNama.trim()) {
                            setGuestFormError("Nama tamu wajib diisi.");
                            return;
                          }
                          addGuestMutation.mutate({
                            nama_tamu: guestFormNama.trim(),
                            kategori: guestFormKategori,
                            jumlah_orang: guestFormJumlah,
                            nomor_hp: guestFormNomorHp,
                          });
                        }}
                        className="bg-rose-700 text-white px-4 py-2 rounded-md text-sm hover:bg-rose-800 disabled:opacity-40"
                      >
                        {addGuestMutation.isPending
                          ? "Menyimpan..."
                          : "Simpan Tamu"}
                      </button>
                    </div>
                  )}

                  {(() => {
                    const filteredGuests =
                      guestFilterStatus === "semua"
                        ? guests
                        : guests.filter(
                            (g) => g.status_rsvp === guestFilterStatus,
                          );

                    if (filteredGuests.length === 0) {
                      return (
                        <p className="text-sm text-gray-400 py-10 text-center">
                          {guests.length === 0
                            ? 'Belum ada tamu. Klik "+ Tambah Tamu" untuk mulai.'
                            : "Tidak ada tamu dengan status ini."}
                        </p>
                      );
                    }

                    return (
                      <ul className="space-y-3">
                        {filteredGuests.map((g) => (
                          <li
                            key={g.id}
                            className="border border-gray-100 rounded-md p-3"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-gray-800">
                                  {g.nama_tamu}{" "}
                                  <span className="text-xs text-gray-400 font-normal">
                                    ({g.jumlah_orang} orang)
                                  </span>
                                </p>
                                <p className="text-xs text-gray-400">
                                  {g.kategori
                                    ? GUEST_KATEGORI_OPTIONS.find(
                                        (o) => o.value === g.kategori,
                                      )?.label
                                    : "Tanpa kategori"}
                                  {g.nomor_hp ? ` · ${g.nomor_hp}` : ""}
                                </p>
                              </div>
                              <button
                                onClick={() => deleteGuestMutation.mutate(g.id)}
                                className="text-xs text-gray-400 hover:text-red-600 shrink-0 ml-3"
                              >
                                Hapus
                              </button>
                            </div>

                            <div className="flex items-center gap-2 mt-2 flex-wrap">
                              <span
                                className={`text-[10px] px-1.5 py-0.5 rounded-full ${GUEST_STATUS_LABEL[g.status_rsvp].className}`}
                              >
                                {GUEST_STATUS_LABEL[g.status_rsvp].label}
                              </span>
                              <select
                                value={g.status_rsvp}
                                onChange={(e) =>
                                  updateGuestMutation.mutate({
                                    guestId: g.id,
                                    payload: {
                                      status_rsvp: e.target
                                        .value as GuestStatusRsvp,
                                    },
                                  })
                                }
                                className="border border-gray-300 rounded-md px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-rose-300"
                              >
                                {GUEST_STATUS_OPTIONS.map((opt) => (
                                  <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                  </option>
                                ))}
                              </select>
                              <input
                                type="number"
                                min={1}
                                defaultValue={g.jumlah_orang}
                                onBlur={(e) => {
                                  const val = Number(e.target.value) || 1;
                                  if (val !== g.jumlah_orang) {
                                    updateGuestMutation.mutate({
                                      guestId: g.id,
                                      payload: { jumlah_orang: val },
                                    });
                                  }
                                }}
                                className="border border-gray-300 rounded-md px-2 py-1 text-xs w-16 focus:outline-none focus:ring-2 focus:ring-rose-300"
                                title="Jumlah orang"
                              />
                            </div>

                            <input
                              type="text"
                              placeholder="Catatan (mis. alergi makanan, kursi roda)..."
                              defaultValue={g.catatan ?? ""}
                              onBlur={(e) => {
                                if (e.target.value !== (g.catatan ?? "")) {
                                  updateGuestMutation.mutate({
                                    guestId: g.id,
                                    payload: { catatan: e.target.value },
                                  });
                                }
                              }}
                              className="w-full border border-gray-300 rounded-md px-2 py-1 text-xs mt-2 focus:outline-none focus:ring-2 focus:ring-rose-300"
                            />
                          </li>
                        ))}
                      </ul>
                    );
                  })()}
                </div>
              )}
            </div>
          )}

          {resultTab === "seating" && (
            <div>
              {loadSeatingMutation.isPending && !seatingLoaded ? (
                <p className="text-sm text-gray-400 py-10 text-center">
                  Memuat seating chart...
                </p>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">
                      Seating Chart
                    </h2>
                    <button
                      onClick={() => setShowTableForm((prev) => !prev)}
                      className="text-sm bg-rose-700 text-white px-4 py-1.5 rounded-md hover:bg-rose-800 transition-colors"
                    >
                      {showTableForm ? "Batal" : "+ Tambah Meja"}
                    </button>
                  </div>

                  {seatingError && (
                    <p className="text-xs text-red-600 bg-red-50 rounded-md px-3 py-2 mb-4">
                      ⚠️ {seatingError}
                    </p>
                  )}

                  {showTableForm && (
                    <div className="bg-gray-50 rounded-md p-4 mb-4 flex gap-3 flex-wrap items-end">
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">
                          Nama meja
                        </label>
                        <input
                          type="text"
                          placeholder="mis. Meja VIP 1"
                          value={tableFormNama}
                          onChange={(e) => setTableFormNama(e.target.value)}
                          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">
                          Kapasitas
                        </label>
                        <input
                          type="number"
                          min={1}
                          value={tableFormKapasitas}
                          onChange={(e) =>
                            setTableFormKapasitas(e.target.value)
                          }
                          className="w-24 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                        />
                      </div>
                      <button
                        disabled={
                          !tableFormNama.trim() || addTableMutation.isPending
                        }
                        onClick={() =>
                          addTableMutation.mutate({
                            nama_meja: tableFormNama.trim(),
                            kapasitas: tableFormKapasitas,
                          })
                        }
                        className="bg-rose-700 text-white px-4 py-2 rounded-md text-sm hover:bg-rose-800 disabled:opacity-40"
                      >
                        {addTableMutation.isPending
                          ? "Menyimpan..."
                          : "Simpan Meja"}
                      </button>
                    </div>
                  )}

                  {/* Tamu belum ditempatkan */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">
                      Belum Ditempatkan ({unassignedGuests.length})
                    </h3>
                    {unassignedGuests.length === 0 ? (
                      <p className="text-xs text-gray-400">
                        {tables.length === 0
                          ? "Tambah meja dulu, baru tempatkan tamu di sini."
                          : "Semua tamu sudah ditempatkan 🎉"}
                      </p>
                    ) : (
                      <ul className="space-y-2">
                        {unassignedGuests.map((u) => (
                          <li
                            key={u.guest_id}
                            className="flex items-center justify-between gap-2 border border-gray-100 rounded-md p-2 flex-wrap"
                          >
                            <span className="text-sm text-gray-800">
                              {u.nama_tamu}{" "}
                              <span className="text-xs text-gray-400">
                                ({u.sisa_kursi} kursi belum ditempatkan)
                              </span>
                            </span>
                            <div className="flex items-center gap-2">
                              <select
                                value={assignTableByGuest[u.guest_id] ?? ""}
                                onChange={(e) =>
                                  setAssignTableByGuest((prev) => ({
                                    ...prev,
                                    [u.guest_id]: e.target.value,
                                  }))
                                }
                                className="border border-gray-300 rounded-md px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-rose-300"
                              >
                                <option value="">Pilih meja...</option>
                                {tables.map((t) => (
                                  <option key={t.id} value={t.id}>
                                    {t.nama_meja} ({t.kursi_terpakai}/
                                    {t.kapasitas})
                                  </option>
                                ))}
                              </select>
                              <input
                                ref={(el) => {
                                  kursiInputRefs.current[u.guest_id] = el;
                                }}
                                type="number"
                                min={1}
                                max={u.sisa_kursi}
                                defaultValue={u.sisa_kursi}
                                key={u.sisa_kursi}
                                className="w-16 border border-gray-300 rounded-md px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-rose-300"
                                title="Jumlah kursi yang ditempatkan"
                              />
                              <button
                                disabled={
                                  !assignTableByGuest[u.guest_id] ||
                                  assignGuestMutation.isPending
                                }
                                onClick={() => {
                                  const tableId = Number(
                                    assignTableByGuest[u.guest_id],
                                  );
                                  const kursiVal = Number(
                                    kursiInputRefs.current[u.guest_id]?.value ??
                                      u.sisa_kursi,
                                  );
                                  assignGuestMutation.mutate({
                                    table_id: tableId,
                                    guest_id: u.guest_id,
                                    jumlah_kursi: kursiVal,
                                  });
                                }}
                                className="text-xs bg-white border border-rose-700 text-rose-700 px-2.5 py-1 rounded-md hover:bg-rose-50 disabled:opacity-40"
                              >
                                Tempatkan
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Daftar meja */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">
                      Meja ({tables.length})
                    </h3>
                    {tables.length === 0 ? (
                      <p className="text-xs text-gray-400">
                        Belum ada meja. Klik "+ Tambah Meja" untuk mulai.
                      </p>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {tables.map((t) => {
                          const penuh = t.kursi_terpakai >= t.kapasitas;
                          return (
                            <div
                              key={t.id}
                              className="border border-gray-100 rounded-md p-3"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <input
                                  type="text"
                                  defaultValue={t.nama_meja}
                                  onBlur={(e) => {
                                    if (e.target.value !== t.nama_meja) {
                                      updateTableMutation.mutate({
                                        tableId: t.id,
                                        payload: {
                                          nama_meja: e.target.value,
                                        },
                                      });
                                    }
                                  }}
                                  className="text-sm font-medium text-gray-800 border-none focus:outline-none focus:ring-1 focus:ring-rose-300 rounded px-1 -ml-1 bg-transparent"
                                />
                                <button
                                  onClick={() =>
                                    deleteTableMutation.mutate(t.id)
                                  }
                                  className="text-xs text-gray-400 hover:text-red-600 shrink-0 ml-2"
                                >
                                  Hapus Meja
                                </button>
                              </div>

                              <div className="flex items-center gap-2 mb-2">
                                <span
                                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                                    penuh
                                      ? "bg-emerald-100 text-emerald-800"
                                      : "bg-gray-100 text-gray-600"
                                  }`}
                                >
                                  {t.kursi_terpakai} / {t.kapasitas} kursi
                                </span>
                                <input
                                  type="number"
                                  min={1}
                                  defaultValue={t.kapasitas}
                                  onBlur={(e) => {
                                    const val = Number(e.target.value);
                                    if (val && val !== t.kapasitas) {
                                      updateTableMutation.mutate({
                                        tableId: t.id,
                                        payload: { kapasitas: val },
                                      });
                                    }
                                  }}
                                  className="w-16 border border-gray-300 rounded-md px-2 py-0.5 text-xs focus:outline-none focus:ring-2 focus:ring-rose-300"
                                  title="Ubah kapasitas"
                                />
                              </div>

                              {t.assignments.length === 0 ? (
                                <p className="text-xs text-gray-400">
                                  Belum ada tamu di meja ini.
                                </p>
                              ) : (
                                <ul className="space-y-1">
                                  {t.assignments.map((a) => (
                                    <li
                                      key={a.id}
                                      className="flex items-center justify-between text-xs bg-gray-50 rounded px-2 py-1"
                                    >
                                      <span className="text-gray-700">
                                        {a.guest_nama}{" "}
                                        <span className="text-gray-400">
                                          ({a.jumlah_kursi} kursi)
                                        </span>
                                      </span>
                                      <button
                                        onClick={() =>
                                          unassignGuestMutation.mutate(a.id)
                                        }
                                        className="text-gray-400 hover:text-red-600 ml-2"
                                        title="Keluarkan dari meja"
                                      >
                                        ×
                                      </button>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default WeddingPlannerTrialPremium;
