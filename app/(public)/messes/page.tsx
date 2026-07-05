export const dynamic = "force-dynamic";


import { MessService } from '@/services/mess_service'
import MessList from './MessList';
import FilterSidebar from './FilterBar';

interface PageProps {
  searchParams: Promise<{
    foodType?: string;
    sort?: string;
  }>;
}

// {
//     foodType: params.foodType,
//     sort: params.sort,
//   }

export default async function page({ searchParams }: PageProps) {
  const params = await searchParams;

  const { data } = await MessService.getAll();

  return (
    <div className="w-full flex justify-center">

      <div className="my-8  flex w-7xl flex-wrap  px-4 md:px-6 lg:px-8 ">
        {/* <FilterSidebar /> */}
        <MessList messes={data} />
      </div>
    </div>
  );
}
