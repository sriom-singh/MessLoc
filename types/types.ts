export type Mess = {
  id: number;
  name: string;
  city: string;
  state: string;
  pinCode: string;
  address: string;
  foodType: string;
  pricePerMonth: number;
  imageUrl: string;
  rating: number;
  totalRatings: number;
  location: {
    latitude: number;
    longitude: number;
  };
};