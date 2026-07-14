"use client"

import { Phone, MapPin, SquareDot, Star, Clock, Utensils, Share2, Heart } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Mess } from "@/types/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type MessCardProps = { mess: Mess };

const INFO_ROWS = (mess: Mess) => [
  {
    Icon: Clock,
    label: "Operating hours",
    value: mess.operatingHours ?? "7:00 AM – 10:00 PM",
  },
  {
    Icon: Phone,
    label: "Contact",
    value: mess.phone ?? "+91 98765 43210",
  },
  {
    Icon: MapPin,
    label: "Address",
    value: `${mess.address}, near Clock Tower, ${mess.city}`,
  },
  {
    Icon: Utensils,
    label: "Specialty",
    value: mess.specialty ?? "North Indian Thali",
  },
];

export default function MessDetailCard({ mess }: MessCardProps) {
  const [saved, setSaved] = useState(false);
  const isVeg = mess.foodType !== "Non-Veg";

  return (
    <div className="w-full h-fit flex flex-col gap-0 rounded-2xl border bg-card overflow-hidden">

      {/* ── Top strip: name + badges + actions ── */}
      <div className="flex items-start justify-between gap-3 px-5 pt-5 pb-4">
        <div className="flex flex-col gap-1.5 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl font-bold leading-tight">{mess.name}</h1>
            <Badge
              variant="outline"
              className={cn(
                "text-[11px] font-medium px-2 py-0.5",
                mess.isActive
                  ? "text-green-600 border-green-500/30 bg-green-500/10"
                  : "text-red-500 border-red-500/30 bg-red-500/10"
              )}
            >
              {mess.isActive ? "Open Now" : "Closed"}
            </Badge>
          </div>

          {/* Address */}
          <p className="text-xs text-muted-foreground flex items-start gap-1 leading-relaxed">
            <MapPin size={12} className="stroke-yellow-500 mt-0.5 shrink-0" />
            {mess.address}, {mess.city}, {mess.state}
            <span className="text-primary font-medium whitespace-nowrap">· 0.3 km</span>
          </p>

          {/* Food type + Rating row */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <SquareDot
                size={12}
                className={isVeg ? "stroke-green-500" : "stroke-red-500"}
              />
              {mess.foodType}
            </span>

            <Separator orientation="vertical" className="h-3" />

            <span className="flex items-center gap-1 text-xs">
              <Star size={12} fill="orange" className="stroke-0" />
              <span className="font-semibold">{mess.rating}</span>
              <span className="text-muted-foreground">
                ({mess.totalReviews?.toLocaleString()} reviews)
              </span>
            </span>
          </div>
        </div>

        {/* Save + Share */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => setSaved((v) => !v)}
            aria-label={saved ? "Unsave" : "Save"}
            className="p-2 rounded-xl border border-border hover:bg-muted transition-colors"
          >
            <Heart
              size={15}
              className={saved ? "fill-red-500 stroke-red-500" : "stroke-muted-foreground"}
            />
          </button>
          <button
            aria-label="Share"
            className="p-2 rounded-xl border border-border hover:bg-muted transition-colors"
          >
            <Share2 size={15} className="stroke-muted-foreground" />
          </button>
        </div>
      </div>

      <Separator />

      {/* ── CTA buttons ── */}
      <div className="flex gap-2.5 px-5 py-4">
        <Button className="flex-1 h-10 font-medium">
          Subscribe now
        </Button>
        <Button
          variant="outline"
          className="gap-2 h-10 px-5"
          onClick={() => window.location.href = `tel:${mess.phone ?? "+919876543210"}`}
        >
          <Phone size={14} />
          Call
        </Button>
      </div>

      <Separator />

      {/* ── Info rows ── */}
      <div className="flex flex-col px-5 py-4 gap-0">
        {INFO_ROWS(mess).map((row, i) => (
          <div key={row.label}>
            <div className="flex items-start gap-3 py-3">
              {/* Icon box */}
              <div className="w-8 h-8 rounded-lg border bg-muted flex items-center justify-center shrink-0 mt-0.5">
                <row.Icon size={14} className="text-muted-foreground" />
              </div>
              <div className="flex flex-col gap-0.5 min-w-0">
                <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wide">
                  {row.label}
                </p>
                <p className="text-sm text-foreground">{row.value}</p>
              </div>
            </div>
            {i < INFO_ROWS(mess).length - 1 && (
              <Separator className="ml-11" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}