// app/admin/messes/columns.tsx

"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

export type Mess = {
    _id: string;
    name: string;
    city: string;
    foodType: string;
    monthlyPrice: number;
    rating: number;
    isVerified: boolean;
    images: string[];
};

export const columns: ColumnDef<Mess>[] = [
    {
        accessorKey: "images",
        header: "Image",
        cell: ({ row }) => (
            <Image
                src={row.original.images[0]|| "/image_placeholder.jpg"}
                alt={row.original.name}
                width={60}
                height={30}
                className="rounded-md w-12 h-8 object-cover overflow-hidden"
            />
        ),
    },

    {
        accessorKey: "name",
        header: "Mess",
    },

    {
        accessorKey: "city",
        header: "City",
    },

    {
        accessorKey: "foodType",
        header: "Food",
    },

    {
        accessorKey: "monthlyPrice",
        header: "Price",
        cell: ({ row }) => (
            <>₹{row.original.monthlyPrice}</>
        ),
    },

    {
        accessorKey: "rating",
        header: "Rating",
        cell: ({ row }) => (
            <>⭐ {row.original.rating}</>
        ),
    },

    {
        accessorKey: "isVerified",
        header: "Status",
        cell: ({ row }) =>
            row.original.isVerified ? (
                <span className="text-green-600">Verified</span>
            ) : (
                <span className="text-orange-600">Pending</span>
            ),
    },

    {
        id: "actions",
        cell: ({ row }) => (
            <DropdownMenu>

                <DropdownMenuTrigger render={<Button
                    variant="ghost"
                    size="icon"
                >
                    <MoreHorizontal />
                </Button>}>

                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">

                    <DropdownMenuItem render={<Link href={`/dashboard/messes/${row.original._id}`}>
                        View
                    </Link>}>

                    </DropdownMenuItem>

                    <DropdownMenuItem render={<Link href={`/dashboard/messes/${row.original._id}/edit`}>
                        Edit
                    </Link>}>

                    </DropdownMenuItem>

                    <DropdownMenuItem className="text-red-600">
                        Delete
                    </DropdownMenuItem>

                </DropdownMenuContent>

            </DropdownMenu>
        ),
    },
];