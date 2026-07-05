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

// Shape of the create payload, mirroring the Mongoose schema. Fields
// like isVerified/isActive/rating/totalReviews are server-managed
// defaults, so they're intentionally left out of the create form.
interface NewMess {
  name: string;
  ownerName: string;
  phone: string;
  email: string;
  description: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  location: {
    latitude: number | "";
    longitude: number | "";
  };
  mealType: string[];
  foodType: "Veg" | "Non-Veg" | "Both" | "";
  monthlyPrice: number | "";
  amenities: string[];
}

const initialFormData: NewMess = {
  name: "",
  ownerName: "",
  phone: "",
  email: "",
  description: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  location: { latitude: "", longitude: "" },
  mealType: [],
  foodType: "",
  monthlyPrice: "",
  amenities: [],
};

export default function CreateMessForm() {
  const router = useRouter();

  const [formData, setFormData] = useState<NewMess>(initialFormData);
  const [loading, setLoading] = useState(false);

  const updateField = <K extends keyof NewMess>(field: K, value: NewMess[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateLocation = (field: "latitude" | "longitude", value: number) => {
    setFormData((prev) => ({
      ...prev,
      location: { ...prev.location, [field]: value },
    }));
  };

  const toggleArrayValue = (
    field: "mealType" | "amenities",
    value: string,
    checked: boolean
  ) => {
    setFormData((prev) => {
      const current = prev[field];
      const next = checked
        ? [...current, value]
        : current.filter((v) => v !== value);
      return { ...prev, [field]: next };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic required-field guard matching the schema's `required: true` fields.
    if (
      !formData.name ||
      !formData.ownerName ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.pincode ||
      !formData.foodType ||
      formData.monthlyPrice === "" ||
      formData.location.latitude === "" ||
      formData.location.longitude === ""
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      console.log("Submitting form data:", formData);
      const data = await MessService.create(formData);
      console.log("Created mess:", data);
      toast.success("Mess created successfully");

      router.push("/dashboard/messes");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to create mess");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-5xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <Separator />
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          <div>
            <Label className="mb-1 font-normal">Mess Name *</Label>
            <Input
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
            />
          </div>

          <div>
            <Label className="mb-1 font-normal">Owner Name *</Label>
            <Input
              value={formData.ownerName}
              onChange={(e) => updateField("ownerName", e.target.value)}
            />
          </div>

          <div>
            <Label className="mb-1 font-normal">Phone *</Label>
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
            <Label className="mb-1 font-normal">Monthly Price *</Label>
            <Input
              type="number"
              value={formData.monthlyPrice}
              onChange={(e) =>
                updateField(
                  "monthlyPrice",
                  e.target.value === "" ? "" : Number(e.target.value)
                )
              }
            />
          </div>

          <div className="md:col-span-2">
            <Label className="mb-1 font-normal">Description</Label>
            <Textarea
              rows={5}
              value={formData.description}
              onChange={(e) => updateField("description", e.target.value)}
            />
          </div>

          <div>
            <Label className="mb-1 font-normal">Food Type *</Label>

            <Select
              value={formData.foodType}
              onValueChange={(value) =>
                updateField("foodType", value as NewMess["foodType"])
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select food type" />
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
            placeholder="Address *"
            value={formData.address}
            onChange={(e) => updateField("address", e.target.value)}
          />

          <Input
            placeholder="City *"
            value={formData.city}
            onChange={(e) => updateField("city", e.target.value)}
          />

          <Input
            placeholder="State *"
            value={formData.state}
            onChange={(e) => updateField("state", e.target.value)}
          />

          <Input
            placeholder="Pincode *"
            value={formData.pincode}
            onChange={(e) => updateField("pincode", e.target.value)}
          />

          <Input
            type="number"
            placeholder="Latitude *"
            value={formData.location.latitude}
            onChange={(e) =>
              updateLocation(
                "latitude",
                e.target.value === "" ? ("" as unknown as number) : Number(e.target.value)
              )
            }
          />

          <Input
            type="number"
            placeholder="Longitude *"
            value={formData.location.longitude}
            onChange={(e) =>
              updateLocation(
                "longitude",
                e.target.value === "" ? ("" as unknown as number) : Number(e.target.value)
              )
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
                checked={formData.mealType.includes(meal)}
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
                checked={formData.amenities.includes(amenity)}
                onCheckedChange={(checked) =>
                  toggleArrayValue("amenities", amenity, checked === true)
                }
              />
              <Label>{amenity}</Label>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>

        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Mess"}
        </Button>
      </div>
    </form>
  );
}