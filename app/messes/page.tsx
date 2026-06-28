import React from 'react'
import { MessService } from '@/services/mess_service'
import MessCard from '@/components/cards/messCard';
import { Mess } from '@/types/types';

// export const messes: Mess[] = [
//   {
//     id: 1,
//     name: "Annapurna Mess",
//     city: "Dehradun",
//     state: "Uttarakhand",
//     pinCode: "248001",
//     address: "Rajpur Road, Dehradun",
//     foodType: "Vegetarian",
//     pricePerMonth: 4500,
//     imageUrl:
//       "https://images.unsplash.com/photo-1544025162-d76694265947?w=800",
//     rating: 4.6,
//     totalRatings: 328,
//     location: {
//       latitude: 30.3165,
//       longitude: 78.0322,
//     },
//   },
//   {
//     id: 2,
//     name: "Tandoori Delight",
//     city: "Delhi",
//     state: "Delhi",
//     pinCode: "110001",
//     address: "Karol Bagh, New Delhi",
//     foodType: "Non-Vegetarian",
//     pricePerMonth: 6500,
//     imageUrl:
//       "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
//     rating: 4.8,
//     totalRatings: 615,
//     location: {
//       latitude: 28.6448,
//       longitude: 77.2167,
//     },
//   },
//   {
//     id: 3,
//     name: "Student's Kitchen",
//     city: "Pune",
//     state: "Maharashtra",
//     pinCode: "411007",
//     address: "Aundh, Pune",
//     foodType: "Vegetarian",
//     pricePerMonth: 5000,
//     imageUrl:
//       "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
//     rating: 4.4,
//     totalRatings: 241,
//     location: {
//       latitude: 18.559,
//       longitude: 73.7868,
//     },
//   },
//   {
//     id: 4,
//     name: "Hyderabad Spice Mess",
//     city: "Hyderabad",
//     state: "Telangana",
//     pinCode: "500081",
//     address: "Madhapur, Hyderabad",
//     foodType: "Non-Vegetarian",
//     pricePerMonth: 7000,
//     imageUrl:
//       "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800",
//     rating: 4.9,
//     totalRatings: 892,
//     location: {
//       latitude: 17.4485,
//       longitude: 78.3908,
//     },
//   },
//   {
//     id: 5,
//     name: "South Indian Meals",
//     city: "Bengaluru",
//     state: "Karnataka",
//     pinCode: "560034",
//     address: "Koramangala, Bengaluru",
//     foodType: "Vegetarian",
//     pricePerMonth: 5800,
//     imageUrl:
//       "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800",
//     rating: 4.7,
//     totalRatings: 476,
//     location: {
//       latitude: 12.9352,
//       longitude: 77.6245,
//     },
//   },
//   {
//     id: 6,
//     name: "Royal Punjabi Mess",
//     city: "Chandigarh",
//     state: "Chandigarh",
//     pinCode: "160022",
//     address: "Sector 22, Chandigarh",
//     foodType: "Both Veg & Non-Veg",
//     pricePerMonth: 6200,
//     imageUrl:
//       "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800",
//     rating: 4.5,
//     totalRatings: 389,
//     location: {
//       latitude: 30.7333,
//       longitude: 76.7794,
//     },
//   },
// ];

const page = async() => {
  const messes = await MessService.getAll();
  console.log(messes);

  return (
    <div className='flex flex-wrap gap-4 mt-8 w-full px-16 justify-center'>
        {
            messes.map((data:Mess)=>(
            <MessCard key={data.id} mess={data} />
            ))
        }
    </div>
  )
}

export default page