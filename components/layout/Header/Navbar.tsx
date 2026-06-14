import React from "react";
import Image from "next/image";
import Link from "next/link";

import { ModeToggle } from "@/components/ui/darkMode";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { MapPin, Search } from "lucide-react";

const navLinks = [
    { label: "Home", href: "/" },
    { label: "Browse Messes", href: "/messes" },
    { label: "Packages", href: "/packages" },
    { label: "For Owners", href: "/owners" },
    { label: "About", href: "/about" },
];

const Navbar = () => {
    return (
        <nav className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                <div className="flex flex-col gap-4 py-4">
                    {/* Top Row */}
                    <div className="flex items-center justify-between gap-6">                        {/* Logo */}
                        <Link href="/" className="flex items-center shrink-0">
                            <Image
                                src="/logosmall.svg"
                                alt="Logo"
                                width={40}
                                height={40}
                                className="mr-2"
                            />

                            <h1 className="text-xl md:text-2xl font-semibold">
                                MessLoc
                            </h1>
                        </Link>
                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        {/* Desktop Actions */}
                        <div className="hidden lg:flex items-center gap-3 ml-auto">                            <Button
                            size="lg"
                            variant="ghost"
                            className=" border hover:border-primary/10 flex flex-col items-start h-auto py-2"
                        >
                            <div className="flex text-primary items-center gap-1 text-sm">
                                <MapPin size={16} />
                                <span >Add Your Location</span>
                            </div>

                            <span className="text-xs text-muted-foreground">
                                See messes near you
                            </span>
                        </Button>

                            <ModeToggle />

                            <Link
                                href="/login"
                                className="text-sm border rounded-md px-4 py-2 hover:bg-muted transition"
                            >
                                Login
                            </Link>

                            <Button>Signup</Button>
                        </div>

                        {/* Mobile Actions */}
                        <div className="flex md:hidden items-center gap-2">
                            <ModeToggle />

                            <Link
                                href="/login"
                                className="text-sm border border-primary rounded-md px-3 py-2"
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="text-sm bg-primary  rounded-md px-3 py-2"
                            >
                                Sign Up
                            </Link>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="flex flex-col md:flex-row gap-3">
                        <div className="relative flex-1">
                            <Input
                                type="search"
                                placeholder="Search for messes..."
                                className="pr-10 h-11"
                            />

                            <Search
                                size={18}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                            />

                        </div>
                        {/* Mobile Navigation */}
                        <div className="flex lg:hidden gap-4 mx-auto overflow-x-auto pb-1 scrollbar-hide">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="whitespace-nowrap text-sm text-muted-foreground hover:text-primary"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        {/* Mobile Location Button */}
                        <Button
                            variant="secondary"
                            className="md:hidden w-full text-primary flex items-center gap-2"
                        >
                            <MapPin size={16} />
                            Add Your Location
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;