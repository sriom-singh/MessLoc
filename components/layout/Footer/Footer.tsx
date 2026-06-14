"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";

const NAV_COLS = [
  {
    title: "Explore",
    links: [
      "Browse messes",
      "Meal packages",
      "Today's deals",
      "Veg messes",
      "Non-veg messes",
      "Top rated",
    ],
  },
  {
    title: "For owners",
    links: [
      "List your mess",
      "Manage menu",
      "View subscribers",
      "Analytics",
      "Pricing plans",
    ],
  },
  {
    title: "Company",
    links: ["About us", "Blog", "Careers", "Contact", "Help center"],
  },
];

const LEGAL = ["Privacy policy", "Terms of use", "Cookie policy", "Sitemap"];

function SocialIcon({ label, path }:any) {
  return (
    <a
      href="#"
      aria-label={label}
      className="w-9 h-9 rounded-lg border border-orange-500/25 flex items-center justify-center text-stone-400 hover:border-orange-500 hover:text-orange-500 transition-colors duration-150"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d={path} />
      </svg>
    </a>
  );
}

const SOCIALS = [
  {
    label: "Instagram",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  },
  {
    label: "Twitter / X",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z",
  },
  {
    label: "LinkedIn",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    label: "YouTube",
    path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
];

const APP_STORES = [
  {
    label: "App Store",
    sub: "Download on the",
    path: "M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z",
  },
  {
    label: "Google Play",
    sub: "Get it on",
    path: "M3.18 23.76c.27.15.6.2.96.1l13.2-7.62-2.82-2.82-11.34 10.34zM.54 1.32C.2 1.64 0 2.14 0 2.8v18.4c0 .66.2 1.16.54 1.48l.08.08 10.3-10.3v-.24L.62 1.24l-.08.08zM20.7 10.4l-2.94-1.7-3.16 3.16 3.16 3.16 2.96-1.7c.84-.48.84-1.26-.02-1.92zM3.18.24l13.2 7.62-2.82 2.82L2.22.34l.96-.1z",
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe() {

  }

  return (
    <footer className=" rounded-2xl  px-24 overflow-hidden w-full">

      {/* ── Main grid ── */}
      <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-8  pt-12 pb-8">

        {/* Brand column */}
        <div className="flex flex-col">
          {/* Logo */}
               <div className="flex items-center">
                    <Image src="/logosmall.svg" alt="Logo" width={40} height={40} className="mr-2" />
                    <h1 className={" text-2xl leading-5.5 flex flex-col gap-0"}>MessLoc</h1>
                </div>

          <p className="mt-3 text-[13px] text-stone-400 leading-relaxed max-w-[220px]">
            Discover, compare, and subscribe to mess services near you. Trusted
            by students and professionals across India.
          </p>

          {/* Location badge */}
          <span className="mt-3 w-fit inline-flex items-center gap-1.5 bg-primary/5 border border-orange-500/20 rounded-full px-3 py-1 text-[11px] text-primary/80 font-mono">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Dehradun · Roorkee · Haridwar
          </span>

          {/* Socials */}
          <div className="flex gap-2.5 mt-5">
            {SOCIALS.map((s) => (
              <SocialIcon key={s.label} {...s} />
            ))}
          </div>
        </div>

        {/* Nav columns */}
        {NAV_COLS.map((col) => (
          <div key={col.title}>
            <h4 className="text-[11px] font-medium tracking-[1.5px] uppercase text-primary/80 mb-3.5">
              {col.title}
            </h4>
            <ul className="flex flex-col gap-2.5">
              {col.links.map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-[13px] dark:text-stone-300  hover:underline transition-colors duration-150"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>


      {/* ── Mid row: app stores + newsletter ── */}
      {/* <div className="grid grid-cols-2 justify-center gap-8 px-10 py-6"> */}

        {/* App stores */}
        {/* <div>
          <h4 className="text-[11px] font-medium tracking-[1.5px] uppercase text-orange-500 mb-3">
            Get the app
          </h4>
          <div className="flex gap-3 flex-wrap">
            {APP_STORES.map((app) => (
              <a
                key={app.label}
                href="#"
                className="flex items-center gap-2 px-3.5 py-2 border border-orange-500/25 rounded-lg hover:border-orange-500 transition-colors duration-150 no-underline"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#F97316" aria-hidden="true">
                  <path d={app.path} />
                </svg>
                <div>
                  <p className="text-[10px] text-stone-400 leading-none">{app.sub}</p>
                  <strong className="text-[13px] font-medium text-stone-50 block mt-0.5">
                    {app.label}
                  </strong>
                </div>
              </a>
            ))}
          </div>
        </div> */}

      {/* </div> */}

      <Separator className="bg-orange-500/12 " />

      {/* ── Bottom bar ── */}
      <div className="flex items-center justify-between w-full  flex-wrap gap-3 py-4">
        <p className="text-[12px] text-stone-600 font-mono">
          © 2026 MessLoc · Made with{" "}
          <span className="text-orange-500" aria-label="love">♥</span>{" "}
          in Dehradun
        </p>
        <div className="flex gap-5 flex-wrap">
          {LEGAL.map((l) => (
            <a
              key={l}
              href="#"
              className="text-[12px] text-stone-600 hover:text-orange-500 transition-colors duration-150"
            >
              {l}
            </a>
          ))}
        </div>
      </div>

    </footer>
  );
}
