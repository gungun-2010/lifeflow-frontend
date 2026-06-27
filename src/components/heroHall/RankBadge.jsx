import React from "react";
import {
  Crown,
  Medal
} from "lucide-react";

const RankBadge = ({ rank }) => {

  // GOLD
  if (rank === 1) {

    return (

      <div className="
        w-14
        h-14
        rounded-full
        bg-yellow-400
        text-white
        flex
        items-center
        justify-center
        shadow-md
      ">

        <Crown size={26} />

      </div>

    );

  }

  // SILVER
  if (rank === 2) {

    return (

      <div className="
        w-14
        h-14
        rounded-full
        bg-gray-300
        text-white
        flex
        items-center
        justify-center
        shadow-md
      ">

        <Medal size={24} />

      </div>

    );

  }

  // BRONZE
  if (rank === 3) {

    return (

      <div className="
        w-14
        h-14
        rounded-full
        bg-orange-500
        text-white
        flex
        items-center
        justify-center
        shadow-md
      ">

        <Medal size={24} />

      </div>

    );

  }

  // NORMAL RANK

  return (

    <div className="
      w-14
      h-14
      rounded-full
      bg-gray-100
      text-gray-700
      flex
      items-center
      justify-center
      font-black
      text-lg
    ">

      #{rank}

    </div>

  );

};

export default RankBadge;