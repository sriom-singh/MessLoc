import { Mess } from "@/types/types";
import { MessService } from "@/services/mess_service";
import MessCard from "./cards/messCard";

const RecommendCard = async ({ mess }: { mess: Mess }) => {
  const recommendations: Mess[] = await MessService.recommendMess({
    city: mess.city,
    foodType: mess.foodType,
  });

  return (
    <div>
     { recommendations.length ? <h1>Similar Messes</h1>:<></>}
      <div className="flex gap-4">

        {recommendations ? recommendations.map((item) => (
          <MessCard key={item._id} mess={item} />
        )) : <></>}
      </div>
    </div>
  );
};

export default RecommendCard;