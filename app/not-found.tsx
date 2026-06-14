// src/app/not-found.tsx

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
            <h1 className="text-8xl font-bold text-primary">404</h1>

            <h2 className="mt-4 text-2xl font-semibold">
                Page Not Found
            </h2>

            <p className="mt-2 text-muted-foreground max-w-md">
                The page you're looking for doesn't exist or may have been moved.
            </p>

            <Link
                href="/"
                className="inline-flex mt-4 items-center rounded-md bg-primary px-4 py-2 text-primary-foreground text-sm"
            >
                Back to Home
            </Link>
        </div>
    );
}