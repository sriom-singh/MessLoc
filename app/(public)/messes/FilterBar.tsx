"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown, SlidersHorizontal, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

// ── Types ─────────────────────────────────────────────────────────────────────

type FoodType  = "veg" | "non_veg" | "both";
type MealType  = "breakfast" | "lunch" | "dinner";
type RatingOpt = 4.5 | 4 | 3.5 | 0;

interface FilterState {
  sort:       string;
  price:      [number, number];
  foodTypes:  FoodType[];
  meals:      MealType[];
  rating:     RatingOpt;
  openNow:    boolean;
}

const DEFAULT: FilterState = {
  sort:      "relevant",
  price:     [500, 5000],
  foodTypes: [],
  meals:     [],
  rating:    0,
  openNow:   false,
};

// ── Collapsible section wrapper ───────────────────────────────────────────────

function Section({
  title,
  defaultOpen = true,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-white/5 pb-5">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-1"
      >
        <span className="text-[13px] font-semibold uppercase tracking-widest text-orange-500">
          {title}
        </span>
        <ChevronDown
          size={15}
          className={cn(
            "text-stone-500 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>
      {open && <div className="mt-4">{children}</div>}
    </div>
  );
}

// ── Pill toggle button ────────────────────────────────────────────────────────

function Pill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3.5 py-1.5 text-[12px] font-medium transition-all duration-150",
        active
          ? "border-orange-500 bg-orange-500 text-white"
          : "border-white/10 bg-white/5 text-stone-400 hover:border-orange-500/50 hover:text-stone-200"
      )}
    >
      {label}
    </button>
  );
}

// ── Checkbox row ──────────────────────────────────────────────────────────────

function CheckRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 py-1.5 group">
      <Checkbox
        checked={checked}
        onCheckedChange={onChange}
        className="border-white/20 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
      />
      <span
        className={cn(
          "text-[13px] transition-colors group-hover:text-stone-100",
          checked ? "text-stone-100 font-medium" : "text-stone-400"
        )}
      >
        {label}
      </span>
    </label>
  );
}

// ── Active filter chip ────────────────────────────────────────────────────────

function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/15 border border-orange-500/30 px-2.5 py-1 text-[11px] font-medium text-orange-400">
      {label}
      <button
        type="button"
        onClick={onRemove}
        className="hover:text-orange-200 transition-colors"
        aria-label={`Remove ${label}`}
      >
        ✕
      </button>
    </span>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function FilterSidebar() {
  const [f, setF] = useState<FilterState>(DEFAULT);

  // ── Helpers ──────────────────────────────────────────────────────────────

  function toggleFood(v: FoodType) {
    setF((s) => ({
      ...s,
      foodTypes: s.foodTypes.includes(v)
        ? s.foodTypes.filter((x) => x !== v)
        : [...s.foodTypes, v],
    }));
  }

  function toggleMeal(v: MealType) {
    setF((s) => ({
      ...s,
      meals: s.meals.includes(v)
        ? s.meals.filter((x) => x !== v)
        : [...s.meals, v],
    }));
  }

  function reset() {
    setF(DEFAULT);
  }

  // Count active filters (excluding sort)
  const activeCount =
    (f.price[0] !== 500 || f.price[1] !== 5000 ? 1 : 0) +
    f.foodTypes.length +
    f.meals.length +
    (f.rating > 0 ? 1 : 0) +
    (f.openNow ? 1 : 0);

  // Build chips for active filter display
  const chips: { label: string; clear: () => void }[] = [
    ...f.foodTypes.map((v) => ({
      label: v === "veg" ? "Veg" : v === "non_veg" ? "Non-Veg" : "Both",
      clear: () => toggleFood(v),
    })),
    ...f.meals.map((v) => ({
      label: v.charAt(0).toUpperCase() + v.slice(1),
      clear: () => toggleMeal(v),
    })),
    ...(f.rating > 0
      ? [{ label: `${f.rating}★ & up`, clear: () => setF((s) => ({ ...s, rating: 0 })) }]
      : []),
    ...(f.openNow
      ? [{ label: "Open now", clear: () => setF((s) => ({ ...s, openNow: false })) }]
      : []),
    ...(f.price[0] !== 500 || f.price[1] !== 5000
      ? [{ label: `₹${f.price[0].toLocaleString()}–₹${f.price[1].toLocaleString()}`, clear: () => setF((s) => ({ ...s, price: [500, 5000] })) }]
      : []),
  ];

  return (
    <aside className="flex max-w-80 shrink-0 flex-col gap-0 rounded-2xl border border-white/8 bg-[#1a1612] overflow-hidden">

      {/* ── Header ── */}
      <div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={15} className="text-orange-500" />
          <span className="text-[14px] font-semibold text-stone-100">Filters</span>
          {activeCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white">
              {activeCount}
            </span>
          )}
        </div>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={reset}
            className="flex items-center gap-1 text-[12px] text-stone-500 hover:text-orange-500 transition-colors"
          >
            <RotateCcw size={12} />
            Reset
          </button>
        )}
      </div>

      {/* ── Active filter chips ── */}
      {chips.length > 0 && (
        <div className="flex flex-wrap gap-1.5 border-b border-white/8 px-5 py-3">
          {chips.map((c) => (
            <Chip key={c.label} label={c.label} onRemove={c.clear} />
          ))}
        </div>
      )}

      <div className="flex flex-col gap-5 overflow-y-auto px-5 py-5">

        {/* ── Sort ── */}
        <Section title="Sort By">
          <Select
            value={f.sort}
            // onValueChange={(v) => setF((s) => ({ ...s, sort: v }))}
          >
            <SelectTrigger className="h-10 w-full border-white/10 bg-white/5 text-[13px] text-stone-300 focus:ring-orange-500">
              <SelectValue placeholder="Most relevant" />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1612] border-white/10">
              {[
                { value: "relevant",    label: "Most relevant"       },
                { value: "rating_desc", label: "Rating: High to low" },
                { value: "price_asc",   label: "Price: Low to high"  },
                { value: "price_desc",  label: "Price: High to low"  },
                { value: "nearest",     label: "Nearest first"       },
              ].map((opt) => (
                <SelectItem
                  key={opt.value}
                  value={opt.value}
                  className="text-[13px] text-stone-300 focus:bg-orange-500/20 focus:text-orange-400"
                >
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Section>

        {/* ── Price range ── */}
        <Section title="Price / Month">
          <div className="space-y-4">
            <Slider
              min={500}
              max={5000}
              step={100}
              value={f.price}
              onValueChange={(v) => setF((s) => ({ ...s, price: v as [number, number] }))}
              className="[&_[role=slider]]:border-orange-500 [&_[role=slider]]:bg-orange-500 [&_.range]:bg-orange-500"
            />
            <div className="flex items-center justify-between">
              <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-[12px] text-stone-300">
                ₹{f.price[0].toLocaleString()}
              </span>
              <span className="text-[11px] text-stone-600">to</span>
              <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-[12px] text-stone-300">
                ₹{f.price[1].toLocaleString()}
              </span>
            </div>
            {/* Quick presets */}
            <div className="flex flex-wrap gap-2">
              {[
                { label: "< ₹1k",  v: [500,  1000] as [number, number] },
                { label: "₹1–2k",  v: [1000, 2000] as [number, number] },
                { label: "₹2–3k",  v: [2000, 3000] as [number, number] },
                { label: "₹3k+",   v: [3000, 5000] as [number, number] },
              ].map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => setF((s) => ({ ...s, price: p.v }))}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-stone-400 transition-colors hover:border-orange-500/50 hover:text-orange-400"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </Section>

        {/* ── Food type ── */}
        <Section title="Food Type">
          <div className="flex flex-wrap gap-2">
            {[
              { v: "veg" as FoodType,     label: "🟢 Veg"     },
              { v: "non_veg" as FoodType, label: "🔴 Non-Veg" },
              { v: "both" as FoodType,    label: "🍽️ Both"    },
            ].map(({ v, label }) => (
              <Pill
                key={v}
                label={label}
                active={f.foodTypes.includes(v)}
                onClick={() => toggleFood(v)}
              />
            ))}
          </div>
        </Section>

        {/* ── Meals offered ── */}
        <Section title="Meals Offered">
          <div className="grid grid-cols-3 gap-2">
            {[
              { v: "breakfast" as MealType, icon: "☕", label: "Breakfast" },
              { v: "lunch"     as MealType, icon: "🍛", label: "Lunch"     },
              { v: "dinner"    as MealType, icon: "🍲", label: "Dinner"    },
            ].map(({ v, icon, label }) => {
              const active = f.meals.includes(v);
              return (
                <button
                  key={v}
                  type="button"
                  onClick={() => toggleMeal(v)}
                  className={cn(
                    "flex flex-col items-center gap-1.5 rounded-xl border py-3 text-center text-[11px] font-medium transition-all duration-150",
                    active
                      ? "border-orange-500 bg-orange-500/15 text-orange-400"
                      : "border-white/10 bg-white/5 text-stone-400 hover:border-orange-500/40"
                  )}
                >
                  <span className="text-[18px]">{icon}</span>
                  {label}
                </button>
              );
            })}
          </div>
        </Section>

        {/* ── Rating ── */}
        <Section title="Min Rating">
          <div className="space-y-1">
            {([4.5, 4, 3.5, 0] as RatingOpt[]).map((r) => {
              const active = f.rating === r;
              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => setF((s) => ({ ...s, rating: r }))}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[13px] transition-colors",
                    active
                      ? "bg-orange-500/15 text-orange-400"
                      : "text-stone-400 hover:bg-white/5 hover:text-stone-200"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                      active ? "border-orange-500 bg-orange-500" : "border-stone-600"
                    )}
                  >
                    {active && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                  </span>
                  {r === 0 ? "Any rating" : (
                    <span className="flex items-center gap-1">
                      {"★".repeat(Math.floor(r))}
                      {r % 1 ? "½" : ""}
                      <span className="ml-1 text-[12px]">{r}+ stars</span>
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </Section>

        {/* ── Open now toggle ── */}
        <Section title="Availability" defaultOpen={false}>
          <CheckRow
            label="Open now"
            checked={f.openNow}
            onChange={() => setF((s) => ({ ...s, openNow: !s.openNow }))}
          />
        </Section>

      </div>

      {/* ── Apply button ── */}
      <div className="border-t border-white/8 px-5 py-4">
        <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium h-10 rounded-xl text-[14px]">
          Apply filters
          {activeCount > 0 && (
            <span className="ml-1.5 text-orange-200">({activeCount})</span>
          )}
        </Button>
      </div>
    </aside>
  );
}