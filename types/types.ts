export interface Mess {
  _id: number;
  name: string;
  description?: string;
  email: string;
  phone: string;
  ownerName: string;
  city: string;
  state: string;
  pincode: string;
  address: string;
  foodType: string;
  monthlyPrice: number;
  images: string[];
  rating: number;
  isVerified?: boolean;
  isActive?: boolean;
  totalReviews: number;
  amenities?: Amenities[];
  location: {
    latitude: number;
    longitude: number;
  };
};

export enum Amenities {
  WiFi = "WiFi",
  Parking = "Parking",
  ROWater = "RO Water",
  HomeDelivery = "Home Delivery",
  AC = "AC",
  CCTV = "CCTV",
  TiffinService = "Tiffin Service"
}