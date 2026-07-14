"use client"

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Coffee, Sun, Moon, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// ── Types ─────────────────────────────────────────────────────────────────────

interface DayMenu {
  breakfast: string;
  lunch: string;
  dinner: string;
}

interface MenuSectionProps {
  menu?: Record<string, DayMenu>;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"] as const;
type Day = typeof DAYS[number];

const DAY_SHORT: Record<Day, string> = {
  Monday: "Mon", Tuesday: "Tue", Wednesday: "Wed",
  Thursday: "Thu", Friday: "Fri", Saturday: "Sat", Sunday: "Sun",
};

const SAMPLE_MENU: Record<Day, DayMenu> = {
  Monday:    { breakfast: "Poha, Tea",              lunch: "Rajma, Rice, Roti, Salad",       dinner: "Paneer Butter Masala, Roti, Dal" },
  Tuesday:   { breakfast: "Aloo Paratha, Curd",     lunch: "Chole, Rice, Roti, Salad",       dinner: "Mix Veg, Roti, Dal"              },
  Wednesday: { breakfast: "Idli Sambhar",           lunch: "Dal Makhani, Rice, Roti",        dinner: "Kadhi Pakora, Rice, Roti"        },
  Thursday:  { breakfast: "Bread Omelette, Tea",    lunch: "Rajma, Rice, Roti, Salad",       dinner: "Paneer Bhurji, Roti, Dal"        },
  Friday:    { breakfast: "Poha, Tea",              lunch: "Kadhi Chawal, Roti",             dinner: "Shahi Paneer, Roti, Dal"         },
  Saturday:  { breakfast: "Sandwich, Tea",          lunch: "Chole Bhature",                  dinner: "Veg Pulao, Raita"               },
  Sunday:    { breakfast: "Chole Puri",             lunch: "Special Thali (Paneer + Sweet)", dinner: "Light Khichdi, Curd"            },
};

const MEALS = [
  {
    key: "breakfast" as const,
    label: "Breakfast",
    time: "7:00 – 10:00 AM",
    Icon: Coffee,
    bg: "bg-amber-500/10 border-amber-500/20",
    iconColor: "text-amber-500",
    badgeColor: "bg-amber-500/10 text-amber-700 border-amber-500/20",
  },
  {
    key: "lunch" as const,
    label: "Lunch",
    time: "12:00 – 3:00 PM",
    Icon: Sun,
    bg: "bg-orange-500/10 border-orange-500/20",
    iconColor: "text-orange-500",
    badgeColor: "bg-orange-500/10 text-orange-700 border-orange-500/20",
  },
  {
    key: "dinner" as const,
    label: "Dinner",
    time: "7:00 – 10:00 PM",
    Icon: Moon,
    bg: "bg-indigo-500/10 border-indigo-500/20",
    iconColor: "text-indigo-400",
    badgeColor: "bg-indigo-500/10 text-indigo-700 border-indigo-500/20",
  },
] as const;

// ── Today detection ───────────────────────────────────────────────────────────

function getTodayName(): Day {
  const names: Day[] = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  return names[new Date().getDay()];
}

// ── Meal items parser (splits by comma into chips) ────────────────────────────

function MealItems({ value }: { value: string }) {
  const items = value.split(",").map((s) => s.trim()).filter(Boolean);
  return (
    <div className="flex flex-wrap gap-1.5 mt-3">
      {items.map((item) => (
        <span
          key={item}
          className="text-[12px] px-2.5 py-1 rounded-full bg-muted border border-border text-foreground"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

// ── Meal card ─────────────────────────────────────────────────────────────────

function MealCard({
  meal,
  value,
}: {
  meal: (typeof MEALS)[number];
  value: string;
}) {
  const { label, time, Icon, bg, iconColor, badgeColor } = meal;
  return (
    <div className={cn("rounded-2xl border p-5 flex flex-col gap-2", bg)}>
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center bg-background/60", iconColor)}>
            <Icon size={16} />
          </div>
          <span className="text-sm font-semibold">{label}</span>
        </div>
        <Badge variant="outline" className={cn("text-[10px] font-normal whitespace-nowrap", badgeColor)}>
          {time}
        </Badge>
      </div>

      <Separator className="opacity-30" />

      {/* Items as chips */}
      <MealItems value={value} />
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function MenuSection({ menu = SAMPLE_MENU }: MenuSectionProps) {
  const today = getTodayName();
  const [activeDay, setActiveDay] = useState<Day>(today);

  return (
    <section className="w-full py-10" aria-label="Weekly menu">

      {/* Header */}
      <div className="flex flex-col items-center text-center mb-8">
        <h2 className="text-2xl font-bold">Weekly Menu</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Tap a day to see what&apos;s being served
        </p>
      </div>

      {/* Day selector — scrollable on mobile */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
        {DAYS.map((day) => {
          const isToday   = day === today;
          const isActive  = day === activeDay;
          return (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={cn(
                "relative flex flex-col items-center shrink-0 rounded-xl border px-3.5 py-2.5 text-center transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isActive
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-card border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
              )}
              aria-pressed={isActive}
            >
              {/* Today dot */}
              {isToday && (
                <span className={cn(
                  "absolute -top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full",
                  isActive ? "bg-primary-foreground" : "bg-primary"
                )} />
              )}
              <span className="text-[11px] font-medium leading-none">{DAY_SHORT[day]}</span>
              {isToday && (
                <span className={cn(
                  "text-[9px] mt-0.5 font-medium",
                  isActive ? "text-primary-foreground/70" : "text-primary"
                )}>
                  Today
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Active day label */}
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-sm font-semibold">
          {activeDay}
          {activeDay === today && (
            <Badge variant="outline" className="ml-2 text-[10px] font-medium text-primary border-primary/30 bg-primary/5">
              Today
            </Badge>
          )}
        </h3>
        <Separator className="flex-1" />
      </div>

      {/* Meal cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {MEALS.map((meal) => (
          <MealCard
            key={meal.key}
            meal={meal}
            value={menu[activeDay]?.[meal.key] ?? "Not available"}
          />
        ))}
      </div>

      {/* Disclaimer */}
      <div className="flex items-center gap-1.5 mt-4 justify-center">
        <Info size={12} className="text-muted-foreground shrink-0" />
        <p className="text-xs text-muted-foreground">
          Item availability may vary slightly by week
        </p>
      </div>
    </section>
  );
}