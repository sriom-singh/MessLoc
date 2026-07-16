"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/providers/authProvider";
import {
    Avatar,
    AvatarBadge,
    AvatarFallback,
    AvatarGroup,
    AvatarGroupCount,
    AvatarImage,
} from "@/components/ui/avatar"
import { ModeToggle } from "@/components/ui/darkMode";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { LogOut, MapPin, Menu, Search, X } from "lucide-react";
import { getCurrentLocation } from "@/services/getLocation";

const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Browse Messes", href: "/messes" },
    { label: "Packages", href: "/packages" },
    { label: "For Owners", href: "/owners" },
];

interface Address {
    road: string,
    hamlet: string,
    city: string,
    county: string,
    state_district: string,
    state: string,
    "ISO3166-2-lvl4": string,
    postcode: string,
    country: string,
}

interface Location{
    name:string
    display_name:string
    address:Address
}

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { user, loading, isAuthenticated, logout } = useAuth();
    const [location, setLocation] = useState<Location | null>(null);

    async function handleLocation() {
        try {
            const loc = await getCurrentLocation();

            if (!loc) return;

            const res = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${loc[0]}&lon=${loc[1]}`
            );

            if (!res.ok) {
                throw new Error("Failed to fetch location");
            }

            const data = await res.json();

            console.log(data);

            setLocation(data);
        } catch (error) {
            console.error(error);
        }
    }
    
    useEffect(() => {
        let isMounted = true;

        const loadLocation = async () => {
            try {
                const loc = await getCurrentLocation();

                if (!loc || !isMounted) return;

                const res = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${loc[0]}&lon=${loc[1]}`
                );

                if (!res.ok) {
                    throw new Error("Failed to fetch location");
                }

                const data = await res.json();

                console.log(data);

                if (isMounted) {
                    setLocation(data);
                }
            } catch (error) {
                console.error(error);
            }
        };

        void loadLocation();

        return () => {
            isMounted = false;
        };
    }, []);
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
                                onClick={() => handleLocation()}
                                className="border hover:border-primary/10 flex flex-col items-start h-auto py-2"
                            >
                                <div className="flex text-primary justify-start items-center gap-1 text-sm">
                                    <MapPin size={14} />
                                    <span className="truncate max-w-36">{!location?"Add Your Location":"Near "+location?.name+" Road"}</span>
                                </div>

                                <span className="text-xs text-start text-muted-foreground  truncate w-44">
                                    {!location?"See messes near you":location?.address.postcode+", "+location.address.road+", "+location.address.city}
                                </span>
                            </Button>

                            <ModeToggle />
                            {isAuthenticated ? <ProfileDialog logout={logout} /> :
                                <>
                                    <Link
                                        href="/login"
                                        className="text-sm border rounded-md px-4 py-2 hover:bg-muted transition whitespace-nowrap"
                                    >
                                        Login
                                    </Link>

                                    <Button>
                                        <Link href="/register">Signup</Link>
                                    </Button>
                                </>
                            }
                        </div>

                        {/* Mobile / Tablet Actions */}
                        <div className="flex lg:hidden items-center gap-2 shrink-0">
                            <ModeToggle />

                            {!isAuthenticated && <Link
                                href="/login"
                                className="hidden sm:inline-block text-xs border border-primary rounded-md px-3 py-2 whitespace-nowrap"
                            >
                                Login
                            </Link>}
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

const ProfileAvatar = ({ image }: { image: string }) => {

    return (
        <div className="flex flex-row flex-wrap items-center gap-6 md:gap-12">
            <Avatar>
                <AvatarImage
                    src={image || "https://github.com/shadcn.png"}
                    alt="@shadcn"
                    className="grayscale"
                />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </div>
    )
}

const ProfileDialog = ({ logout }: { logout: () => void }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <ProfileAvatar image="" />
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                <DropdownMenuGroup>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuItem>
                        <Link href={'/profile'}>Profile</Link></DropdownMenuItem>
                    <DropdownMenuItem>Subscriptions</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => logout()} className={"bg-red-500 hover:bg-red-800"}>
                        <LogOut /> Logout
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default Navbar;