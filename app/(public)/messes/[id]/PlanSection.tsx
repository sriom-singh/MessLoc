"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Check, Coffee, Sun, Utensils } from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────

interface Plan {
  _id: string;
  name: string;
  priceWeekly?: number;
  priceMonthly?: number;
  meals: string;
  popular?: boolean;
  isActive?: boolean;
}

interface PlansSectionProps {
  plans?: Plan[];
}

// ── Sample data ───────────────────────────────────────────────────────────────

const SAMPLE_PLANS: Plan[] = [
  {
    _id: "1",
    name: "Weekly",
    priceWeekly: 799,
    meals: "Lunch · Dinner",
    popular: false,
  },
  {
    _id: "2",
    name: "Monthly",
    priceMonthly: 2999,
    meals: "Lunch · Dinner",
    popular: true,
  },
  {
    _id: "3",
    name: "Full Day Monthly",
    priceMonthly: 3499,
    meals: "Breakfast · Lunch · Dinner",
    popular: false,
  },
];

// ── Meal icon helper ──────────────────────────────────────────────────────────

function MealIcons({ meals }: { meals: string }) {
  const lower = meals.toLowerCase();
  return (
    <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
      {lower.includes("breakfast") && (
        <span className="flex items-center gap-1">
          <Coffee size={11} /> Breakfast
        </span>
      )}
      {lower.includes("lunch") && (
        <span className="flex items-center gap-1">
          <Sun size={11} /> Lunch
        </span>
      )}
      {lower.includes("dinner") && (
        <span className="flex items-center gap-1">
          <Utensils size={11} /> Dinner
        </span>
      )}
    </div>
  );
}

// ── Per-plan savings label ────────────────────────────────────────────────────

function savings(plan: Plan): string | null {
  // Compare monthly cost vs weekly×4 to show a "save X%" label
  if (plan.priceWeekly) return null;
  if (plan.name === "Monthly")          return "Save 6% vs weekly";
  if (plan.name === "Full Day Monthly") return "Best value";
  return null;
}

// ── Plan card ─────────────────────────────────────────────────────────────────

function PlanCard({
  plan,
  selected,
  onSelect,
}: {
  plan: Plan;
  selected: boolean;
  onSelect: () => void;
}) {
  const price  = plan.priceWeekly ?? plan.priceMonthly;
  const period = plan.priceWeekly ? "/ week" : "/ month";
  const perDay = plan.priceWeekly
    ? Math.round(plan.priceWeekly / 7)
    : Math.round((plan.priceMonthly ?? 0) / 30);
  const saving = savings(plan);

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        // Base
        "relative text-left w-full rounded-2xl border p-5 flex flex-col gap-3 transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring",
        // Selected vs idle
        selected
          ? "border-primary bg-primary/5 shadow-sm ring-1 ring-primary"
          : "border-border bg-card hover:border-primary/40 hover:bg-accent/50"
      )}
    >
      {/* Popular badge */}
      {plan.popular && (
        <Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-primary text-primary-foreground text-[10px] px-2.5 py-0.5 rounded-full shadow-sm">
          Most popular
        </Badge>
      )}

      {/* Top row: plan name + checkmark */}
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-semibold leading-tight">{plan.name}</p>
        <span
          className={cn(
            "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-150",
            selected
              ? "border-primary bg-primary"
              : "border-muted-foreground/30 bg-transparent"
          )}
        >
          {selected && <Check size={11} strokeWidth={3} className="text-primary-foreground" />}
        </span>
      </div>

      <Separator />

      {/* Pricing */}
      <div>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold tracking-tight">
            ₹{price?.toLocaleString()}
          </span>
          <span className="text-xs text-muted-foreground font-medium">{period}</span>
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">
          ≈ ₹{perDay}/day
        </p>
      </div>

      {/* Meal tags */}
      <MealIcons meals={plan.meals} />

      {/* Savings label */}
      {saving && (
        <p className="text-[11px] font-medium text-primary">{saving}</p>
      )}
    </button>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function PlansSection({ plans = SAMPLE_PLANS }: PlansSectionProps) {
  const defaultId = plans.find((p) => p.popular)?._id ?? plans[0]?._id ?? "";
  const [selected, setSelected] = useState(defaultId);

  const activePlan = plans.find((p) => p._id === selected);
  const price      = activePlan?.priceWeekly ?? activePlan?.priceMonthly;
  const period     = activePlan?.priceWeekly ? "week" : "month";

  return (
    <section className="w-full py-10" aria-label="Subscription plans">
      <div className="border rounded-2xl p-6 md:p-8 flex flex-col gap-6 bg-card">

        {/* Header */}
        <div className="text-center">
          <h2 className="text-xl font-bold">Choose a Plan</h2>
          <p className="text-sm text-muted-foreground mt-1">
            No commitment — cancel anytime
          </p>
        </div>

        {/* Plan cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-1">
          {plans.map((plan) => (
            <PlanCard
              key={plan._id}
              plan={plan}
              selected={selected === plan._id}
              onSelect={() => setSelected(plan._id)}
            />
          ))}
        </div>

        <Separator />

        {/* Summary row */}
        {activePlan && (
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Selected plan</p>
              <p className="text-sm font-medium">
                {activePlan.name}
                <span className="text-muted-foreground font-normal ml-1.5 text-xs">
                  · {activePlan.meals}
                </span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground mb-0.5">Total</p>
              <p className="text-lg font-bold">
                ₹{price?.toLocaleString()}
                <span className="text-xs font-normal text-muted-foreground ml-1">/ {period}</span>
              </p>
            </div>
          </div>
        )}

        {/* CTA */}
        <Button size="lg" className="w-full text-base font-medium h-12 rounded-xl">
          Subscribe now
        </Button>

        {/* Trust line */}
        <div className="flex items-center justify-center gap-4 flex-wrap">
          {["No hidden fees", "Cancel anytime", "Instant QR card"].map((t) => (
            <span key={t} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Check size={11} className="text-primary" />
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}