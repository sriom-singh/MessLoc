import React from "react";
import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { MessService } from "@/services/mess_service";
import { Mess } from "@/types/types";

import MessDetailCard from "./MessDetailCard";
import MenuSection from "./MenuSection";
import ReviewsSection from "./ReviewSection";
import PlansSection from "./PlanSection";
import Link from "next/link";

type PageProps = { params: Promise<{ id: string }> };

export default async function MessDetailPage({ params }: PageProps) {
    const { id } = await params;
    const { data }: { data: Mess } = await MessService.getById(id);

    const images = data.images?.length ? data.images : ["/image_placeholder.jpg"];

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">

                {/* ── Breadcrumb ── */}
                <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6">
                    <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
                    <span>/</span>
                    <a href="/messes" className="hover:text-foreground transition-colors">Browse Messes</a>
                    <span>/</span>
                    <span className="text-foreground font-medium truncate">{data.name}</span>
                </nav>

                {/* ══════════════════════════════════════
                    SECTION 1 — Carousel + Detail card
                    ══════════════════════════════════════ */}
                <div className="flex flex-col lg:flex-row gap-6 items-start">

                    {/* Left: image carousel — 55% on desktop */}
                    <div className="w-full lg:w-[55%] shrink-0">
                        <Carousel
                            className="w-full rounded-2xl overflow-hidden"
                            opts={{ loop: true }}
                        >
                            <CarouselContent>
                                {images.map((src, i) => (
                                    <CarouselItem key={i}>
                                        <div className="relative w-full aspect-4/3 bg-muted">
                                            <Image
                                                src={src}
                                                fill
                                                sizes="(max-width: 768px) 100vw, 55vw"
                                                className="object-cover"
                                                alt={`${data.name} — photo ${i + 1}`}
                                                priority={i === 0}
                                            />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="left-3 bg-background/80 backdrop-blur-sm" />
                            <CarouselNext className="right-3 bg-background/80 backdrop-blur-sm" />
                        </Carousel>

                        {/* Thumbnail dots for multi-image */}
                        {images.length > 1 && (
                            <div className="flex justify-center gap-1.5 mt-3">
                                {images.map((_, i) => (
                                    <span
                                        key={i}
                                        className={cn(
                                            "h-1.5 rounded-full bg-muted-foreground/40 transition-all",
                                            i === 0 ? "w-4 bg-primary" : "w-1.5"
                                        )}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right: detail card — fills remaining space */}
                    <div className="w-full lg:flex-1">
                        <MessDetailCard mess={data} />
                    </div>
                </div>

                {/* ── About description ── */}
                {data.description && (
                    <p className="mt-8 text-sm text-muted-foreground leading-relaxed max-w-3xl">
                        {data.description}
                    </p>
                )}

                <Separator className="mt-10" />

                {/* ══════════════════════════════════════
                    SECTION 2 — Menu
                    ══════════════════════════════════════ */}
                <MenuSection />

                <Separator />

                {/* ══════════════════════════════════════
                    SECTION 3 — Reviews
                    ══════════════════════════════════════ */}
                <ReviewsSection
                    rating={data.rating}
                    totalReviews={data.totalReviews}
                />

                <Separator />

                {/* ══════════════════════════════════════
                      SECTION 4 — Plans
                    ══════════════════════════════════════ */}
                <PlansSection plans={data.plans} />

            </div>
        </div>
    );
}

// tiny helper used in page (no need to import cn at top level separately)
function cn(...classes: (string | boolean | undefined)[]) {
    return classes.filter(Boolean).join(" ");
}