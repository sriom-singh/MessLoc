
export const dynamic = "force-dynamic";


// app/admin/messes/page.tsx
import { MessService } from "@/services/mess_service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import Link from "next/link";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function MessPage() {
  const messes = await MessService.getAll();

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Messes</h1>
          <p className="text-muted-foreground">
            Manage all registered messes.
          </p>
        </div>

        <Button >
          <Link className="flex items-center" href="/dashboard/messes/new">
          <Plus className="mr-2 h-4 w-4" />
          Add Mess
        </Link>
        </Button>


      </div>

      <div className="flex gap-3">
        <Input
          placeholder="Search mess..."
          className="max-w-sm"
        />
      </div>

      <DataTable
        columns={columns}
        data={messes.data}
      />
    </div>
  );
}