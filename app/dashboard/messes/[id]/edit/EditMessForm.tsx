"use client";

import { useState } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Mess, Amenities } from "@/types/types";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { MessService } from "@/services/mess_service";

const MEAL_TYPES = ["Breakfast", "Lunch", "Dinner"] as const;

const AMENITIES = [
  "WiFi",
  "Parking",
  "RO Water",
  "Home Delivery",
  "AC",
  "CCTV",
  "Tiffin Service",
] as const;

type EditableMess = Mess & { mealType?: string[] };

export default function EditMessForm({ mess }: { mess: Mess }) {
  const router = useRouter();

  const [formData, setFormData] = useState<EditableMess>({ ...mess, mealType: [] });
  const [loading, setLoading] = useState(false);

  const updateField = <K extends keyof EditableMess>(field: K, value: EditableMess[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateLocation = (field: "latitude" | "longitude", value: number) => {
    setFormData((prev) => ({
      ...prev,
      location: { ...prev.location, [field]: value },
    }));
  };

  // mealType and amenities are both string arrays on the schema, so
  // checking a box adds the value and unchecking removes it.
  const toggleArrayValue = (
    field: "mealType" | "amenities",
    value: string,
    checked: boolean
  ) => {
    setFormData((prev) => {
      if (field === "mealType") {
        const current = prev.mealType ?? [];
        const next = checked
          ? [...current, value]
          : current.filter((v) => v !== value);
        return { ...prev, mealType: next };
      }

      const current = prev.amenities ?? [];
      const next = checked
        ? ([...current, value] as Mess["amenities"])
        : (current.filter((v) => v !== value) as Mess["amenities"]);
      return { ...prev, amenities: next };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await MessService.update(mess._id, formData);
      console.log("Updated mess:", data);
      toast.success("Mess updated successfully");

      router.push("/dashboard/messes");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update mess");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} method="PUT" className="mx-auto max-w-5xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <Separator />
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          <div>
            <Label className="mb-1 font-normal">Mess Name</Label>
            <Input
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
            />
          </div>

          <div>
            <Label className="mb-1 font-normal">Owner Name</Label>
            <Input
              value={formData.ownerName}
              onChange={(e) => updateField("ownerName", e.target.value)}
            />
          </div>

          <div>
            <Label className="mb-1 font-normal">Phone</Label>
            <Input
              value={formData.phone}
              onChange={(e) => updateField("phone", e.target.value)}
            />
          </div>

          <div>
            <Label className="mb-1 font-normal">Email</Label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
            />
          </div>

          <div>
            <Label className="mb-1 font-normal">Monthly Price</Label>
            <Input
              type="number"
              value={formData.monthlyPrice}
              onChange={(e) =>
                updateField("monthlyPrice", Number(e.target.value))
              }
            />
          </div>

          {/* <div>
            <Label className="mb-1 font-normal">Yearly Price</Label>
            <Input
              type="number"
              value={formData.yearlyPrice ?? ""}
              onChange={(e) =>
                updateField(
                  "yearlyPrice",
                  e.target.value === "" ? undefined : Number(e.target.value)
                )
              }
            />
          </div> */}

          <div className="md:col-span-2">
            <Label className="mb-1 font-normal">Description</Label>
            <Textarea
              rows={5}
              value={formData.description}
              onChange={(e) => updateField("description", e.target.value)}
            />
          </div>

          <div>
            <Label className="mb-1 font-normal">Food Type</Label>

            <Select
              value={formData.foodType}
              onValueChange={(value) =>
                updateField("foodType", value as Mess["foodType"])
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Veg">Vegetarian</SelectItem>
                <SelectItem value="Non-Veg">Non Vegetarian</SelectItem>
                <SelectItem value="Both">Both</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Location</CardTitle>
          <Separator />
        </CardHeader>

        <CardContent className="grid gap-6 md:grid-cols-2">
          <Input
            placeholder="Address"
            value={formData.address}
            onChange={(e) => updateField("address", e.target.value)}
          />

          <Input
            placeholder="City"
            value={formData.city}
            onChange={(e) => updateField("city", e.target.value)}
          />

          <Input
            placeholder="State"
            value={formData.state}
            onChange={(e) => updateField("state", e.target.value)}
          />

          <Input
            placeholder="Pincode"
            value={formData.pincode}
            onChange={(e) => updateField("pincode", e.target.value)}
          />

          <Input
            type="number"
            placeholder="Latitude"
            value={formData.location?.latitude ?? ""}
            onChange={(e) => updateLocation("latitude", Number(e.target.value))}
          />

          <Input
            type="number"
            placeholder="Longitude"
            value={formData.location?.longitude ?? ""}
            onChange={(e) =>
              updateLocation("longitude", Number(e.target.value))
            }
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Meals Served</CardTitle>
          <Separator />
        </CardHeader>

        <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {MEAL_TYPES.map((meal) => (
            <div key={meal} className="flex items-center gap-2">
              <Checkbox
                checked={formData.foodType?.includes(meal)}
                onCheckedChange={(checked) =>
                  toggleArrayValue("mealType", meal, checked === true)
                }
              />
              <Label>{meal}</Label>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Amenities</CardTitle>
          <Separator />
        </CardHeader>

        <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {AMENITIES.map((amenity) => (
            <div key={amenity} className="flex items-center gap-2">
              <Checkbox
                checked={formData.amenities?.includes(amenity as Amenities)} onCheckedChange={(checked) =>
                  toggleArrayValue("amenities", amenity, checked === true)
                }
              />
              <Label>{amenity}</Label>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Status</CardTitle>
          <Separator />
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <Checkbox
              checked={formData.isVerified}
              onCheckedChange={(checked) =>
                updateField("isVerified", checked === true)
              }
            />
            <Label>Verified</Label>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              checked={formData.isActive}
              onCheckedChange={(checked) =>
                updateField("isActive", checked === true)
              }
            />
            <Label>Active</Label>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>

        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}