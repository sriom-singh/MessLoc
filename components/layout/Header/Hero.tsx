import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MoveRight, MapPin, Star, Users } from "lucide-react";

const Hero = () => {
  return (
    <header className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4 pb-8 sm:pb-10 md:pb-16">
      <div className="flex flex-col-reverse items-center gap-12 lg:flex-row lg:gap-20">
        
        {/* Content */}
        <div className="flex-1 text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border bg-primary/5 px-4 py-2 text-sm text-primary">
            <MapPin size={14} />
            Find trusted messes near you
          </span>

          <h1 className="mt-6 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Discover Affordable
            <span className="text-primary"> Nearby Mess Services </span>
            with MessLoc
          </h1>

          <p className="mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg lg:text-xl">
            Compare meal plans, pricing, reviews, and subscriptions from
            trusted mess providers. Designed for students and working
            professionals living away from home.
          </p>

          {/* CTA */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Button size="lg">
              <Link className="flex items-center gap-1" href="/messes">
                Explore Messes
                <MoveRight />
              </Link>
            </Button>

            <Button variant="outline" size="lg">
              <Link className="flex items-center gap-1" href="/owners/list">
                List Your Mess
                <MoveRight />
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-10 flex flex-wrap justify-center gap-6 lg:justify-start">
            <div className="flex items-center gap-2">
              <Users className="text-primary" size={18} />
              <div>
                <p className="font-semibold">1000+</p>
                <p className="text-xs text-muted-foreground">Students</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="text-primary" size={18} />
              <div>
                <p className="font-semibold">500+</p>
                <p className="text-xs text-muted-foreground">Messes</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Star className="text-primary" size={18} />
              <div>
                <p className="font-semibold">4.8/5</p>
                <p className="text-xs text-muted-foreground">
                  Average Rating
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="flex-1 flex justify-center">
          <div className="relative w-full max-w-md lg:max-w-xl">
            <Image
              src="/hero.png"
              alt="MessLoc Hero"
              width={700}
              height={700}
              priority
              className="h-auto w-full object-contain"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;