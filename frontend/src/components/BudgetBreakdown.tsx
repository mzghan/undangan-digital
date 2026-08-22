import type { PriceItem, BudgetTier } from '../types/weddingTrial';

export function formatRupiah(value: number): string {
  return `Rp ${value.toLocaleString('id-ID')}`;
}

export const STATUS_BUDGET_LABEL: Record<string, { label: string; className: string }> = {
  terbatas: {
    label: 'Budget Terbatas',
    className: 'bg-amber-100 text-amber-800',
  },
  normal: {
    label: 'Budget Normal',
    className: 'bg-emerald-100 text-emerald-800',
  },
  leluasa: { label: 'Budget Leluasa', className: 'bg-sky-100 text-sky-800' },
};

export function PriceItemRow({ item }: { item: PriceItem }) {
  return (
    <li className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-gray-100 last:border-0 gap-1 sm:gap-4">
      {/* Sisi Kiri: Nama Item & Label */}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-800 font-medium">{item.item_name}</p>
        {item.bisa_diskip && <span className="text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full mt-0.5 inline-block">Bisa dilewati dulu</span>}
      </div>

      {/* Sisi Kanan: Harga Alokasi & Kisaran Pasar */}
      <div className="text-left sm:text-right shrink-0">
        <p className="text-sm font-semibold text-gray-800">{item.bisa_diskip ? '—' : formatRupiah(item.harga_alokasi)}</p>
        <p className="text-xs text-gray-400 break-words">
          Kisaran pasar: {formatRupiah(item.harga_estimasi_min)} – {formatRupiah(item.harga_estimasi_max)}
        </p>
      </div>
    </li>
  );
}

export function TierBreakdown({ tier }: { tier: BudgetTier }) {
  const semuaItem = [...tier.items_wajib, ...tier.items_penting, ...tier.items_opsional];
  const totalAlokasi = semuaItem.reduce((sum, item) => sum + item.harga_alokasi, 0);

  return (
    <div>
      <div className="flex items-center gap-3 mb-1">
        <h2 className="text-lg font-semibold text-gray-800">{formatRupiah(tier.budget_total)}</h2>
        <span className={`text-xs px-2 py-1 rounded-full ${STATUS_BUDGET_LABEL[tier.status_budget]?.className}`}>{STATUS_BUDGET_LABEL[tier.status_budget]?.label}</span>
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
        <p className="text-sm font-semibold text-rose-700">{formatRupiah(totalAlokasi)}</p>
      </div>
    </div>
  );
}
