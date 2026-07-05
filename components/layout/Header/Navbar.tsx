"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { ModeToggle } from "@/components/ui/darkMode";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { MapPin, Menu, Search, X } from "lucide-react";

const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Browse Messes", href: "/messes" },
    { label: "Packages", href: "/packages" },
    { label: "For Owners", href: "/owners" },
];

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                <div className="flex flex-col gap-4 py-4">
                    {/* Top Row */}
                    <div className="flex items-center justify-between gap-4 md:gap-6">
                        {/* Logo */}
                        <Link href="/" className="flex items-center shrink-0">
                            <Image
                                src="/logosmall.svg"
                                alt="Logo"
                                width={40}
                                height={40}
                                className="mr-2 w-8 h-8 md:w-10 md:h-10"
                            />

                            <h1 className="text-lg md:text-2xl font-semibold whitespace-nowrap">
                                MessLoc
                            </h1>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary whitespace-nowrap"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        {/* Desktop Actions */}
                        <div className="hidden lg:flex items-center gap-3 ml-auto">
                            <Button
                                size="lg"
                                variant="ghost"
                                className="border hover:border-primary/10 flex flex-col items-start h-auto py-2"
                            >
                                <div className="flex text-primary items-center gap-1 text-sm">
                                    <MapPin size={16} />
                                    <span>Add Your Location</span>
                                </div>

                                <span className="text-xs text-muted-foreground">
                                    See messes near you
                                </span>
                            </Button>

                            <ModeToggle />

                            <Link
                                href="/login"
                                className="text-sm border rounded-md px-4 py-2 hover:bg-muted transition whitespace-nowrap"
                            >
                                Login
                            </Link>

                            <Button>
                                <Link href="/register">Signup</Link>
                            </Button>
                        </div>

                        {/* Mobile / Tablet Actions */}
                        <div className="flex lg:hidden items-center gap-2 shrink-0">
                            <ModeToggle />

                            <Link
                                href="/login"
                                className="hidden sm:inline-block text-xs border border-primary rounded-md px-3 py-2 whitespace-nowrap"
                            >
                                Login
                            </Link>
                            <Link
                                href="/signup"
                                className="hidden sm:inline-block text-xs bg-primary text-primary-foreground rounded-md px-3 py-2 whitespace-nowrap"
                            >
                                Sign Up
                            </Link>

                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen((prev) => !prev)}
                                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                                aria-expanded={mobileMenuOpen}
                                className="p-2 rounded-md border hover:bg-muted transition shrink-0"
                            >
                                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Search Bar — always visible, full width on every breakpoint */}
                    <div className="relative w-full">
                        <Input
                            type="search"
                            placeholder="Search for messes..."
                            className="pr-10 h-11"
                        />
                        <Search
                            size={18}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                        />
                    </div>

                    {/* Mobile "Add location" button — shown below search on small screens only */}
                    <Button
                        variant="secondary"
                        className="md:hidden w-full text-primary flex items-center justify-center gap-2"
                    >
                        <MapPin size={16} />
                        Add Your Location
                    </Button>
                </div>

                {/* Mobile Navigation Drawer — only rendered/shown when toggled open */}
                {mobileMenuOpen && (
                    <div className="lg:hidden flex flex-col w-full pb-6 gap-1 border-t pt-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-sm text-muted-foreground hover:text-primary hover:bg-muted rounded-md px-3 py-2.5 transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}

                        <div className="flex sm:hidden items-center gap-2 mt-2 px-3">
                            <Link
                                href="/login"
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex-1 text-center text-sm border border-primary rounded-md px-4 py-2"
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex-1 text-center text-sm bg-primary text-primary-foreground rounded-md px-4 py-2"
                            >
                                Sign Up
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;