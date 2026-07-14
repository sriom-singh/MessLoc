"use client"

import { useState } from "react";
import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

// ── Types ─────────────────────────────────────────────────────────────────────

interface Review {
  _id: string;
  name: string;
  initials: string;
  role: string;
  rating: number;
  comment: string;
  images?: string[];
}

interface ReviewsSectionProps {
  rating?: number;
  totalReviews?: number;
  reviews?: Review[];
  images?: string[];
}

// ── Sample data (replace with real API data) ──────────────────────────────────

const SAMPLE_REVIEWS: Review[] = [
  { _id: "1", name: "Aarav Sharma",  initials: "AS", role: "MCA Student, Graphic Era University", rating: 5, comment: "I moved to Dehradun from Patna and had no idea where to eat. Found a great veg mess within 300 metres of my hostel in under 5 minutes. MessLoc literally solved my biggest problem in a new city." },
  { _id: "2", name: "Priya Negi",    initials: "PN", role: "Software Engineer, Infosys Dehradun",  rating: 5, comment: "Switched here after a bad experience elsewhere. The portion sizes are generous and they actually follow the menu they post. Clean kitchen too." },
  { _id: "3", name: "Rohit Verma",   initials: "RV", role: "B.Tech Student, DIT University",       rating: 4, comment: "Good value for money. Dinner is sometimes slightly delayed on weekends, but the food quality more than makes up for it." },
];

const RATING_BREAKDOWN = [
  { stars: 5, pct: 78 },
  { stars: 4, pct: 15 },
  { stars: 3, pct: 5  },
  { stars: 2, pct: 1  },
  { stars: 1, pct: 1  },
];

const INITIALS_COLORS: Record<string, string> = {
  AS: "bg-orange-500/20 text-orange-600",
  PN: "bg-blue-500/20 text-blue-600",
  RV: "bg-green-500/20 text-green-600",
  MJ: "bg-purple-500/20 text-purple-600",
};

// ── Sub-components ────────────────────────────────────────────────────────────

function StarRow({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          fill={i <= rating ? "orange" : "none"}
          className={i <= rating ? "stroke-orange-400" : "stroke-muted-foreground/30"}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const colorClass = INITIALS_COLORS[review.initials] ?? "bg-muted text-muted-foreground";
  return (
    <div className="border rounded-xl p-5 flex flex-col gap-4 h-full">
      {/* Review images */}
      {review.images?.length ? (
        <div className="grid grid-cols-4 gap-2">
          {review.images.map((img, i) => (
            <div key={i} className="aspect-square rounded-lg overflow-hidden bg-muted relative">
              <Image src={img} fill className="object-cover" alt={`Review image ${i + 1}`} />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-2">
          {["Image-1", "Image-2", "Image-3", "Image-4"].map((label) => (
            <div key={label} className="aspect-square rounded-lg bg-muted flex items-center justify-center">
              <span className="text-[10px] text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className={cn("w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0", colorClass)}>
          {review.initials}
        </div>
        <div>
          <p className="text-sm font-semibold">{review.name}</p>
          <p className="text-xs text-muted-foreground">{review.role}</p>
        </div>
      </div>

      {/* Comment */}
      <div className="relative">
        <p className="text-sm text-muted-foreground leading-relaxed">{review.comment}</p>
        <Quote size={20} className="absolute -bottom-2 right-0 text-muted-foreground/20" />
      </div>

      <StarRow rating={review.rating} />
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function ReviewsSection({
  rating = 4.5,
  totalReviews = 1364,
  reviews = SAMPLE_REVIEWS,
}: ReviewsSectionProps) {
  return (
    <section className="w-full py-10">
      <h2 className="text-2xl font-bold text-center mb-2">Rating and Reviews</h2>

      {/* Overall score */}
      <div className="flex flex-col items-center gap-1.5 mb-8">
        <div className="flex items-center gap-2">
          <StarRow rating={Math.round(rating)} size={16} />
          <span className="text-lg font-bold">{rating}</span>
          <Badge variant="outline" className="text-green-600 border-green-500/40 bg-green-500/10 text-xs">
            Very Good
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground">
          based on {totalReviews.toLocaleString()} ratings by Verified Subscribers
        </p>

        {/* Rating breakdown */}
        <div className="mt-4 w-full max-w-xs flex flex-col gap-1.5">
          {RATING_BREAKDOWN.map((r) => (
            <div key={r.stars} className="flex items-center gap-2.5">
              <span className="text-xs text-muted-foreground w-5 text-right">{r.stars}★</span>
              <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-orange-500 rounded-full"
                  style={{ width: `${r.pct}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground w-7">{r.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews carousel */}
      <Carousel className="w-full" opts={{ loop: true }}>
        <CarouselContent>
          {reviews.map((review) => (
            <CarouselItem key={review._id} className="md:basis-1/2 lg:basis-1/1">
              <ReviewCard review={review} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center gap-2 mt-4">
          <CarouselPrevious className="static translate-y-0" />
          <CarouselNext className="static translate-y-0" />
        </div>
      </Carousel>
    </section>
  );
}