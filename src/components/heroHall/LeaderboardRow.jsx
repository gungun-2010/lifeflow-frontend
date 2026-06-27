import React from "react";
import {
  Heart,
  MapPin,
  Award
} from "lucide-react";

import RankBadge from "./RankBadge";
import Avatar from "./Avatar";

const LeaderboardRow = ({ hero }) => {

  return (

    <div
      className="
        group
        bg-white
        border
        border-gray-200
        rounded-3xl
        px-8
        py-6
        transition-all
        duration-300
        hover:shadow-xl
        hover:border-red-200
        hover:-translate-y-1
      "
    >

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

        {/* LEFT */}

        <div className="flex items-center gap-6">

          <RankBadge rank={hero.rank} />

          <Avatar
            name={hero.name}
            size="lg"
          />

          <div>

            <h3 className="text-2xl font-black text-gray-900">

              {hero.name}

            </h3>

            <div className="flex items-center gap-2 mt-2">

              <MapPin
                size={16}
                className="text-gray-400"
              />

              <span className="text-gray-500 font-medium">

                {hero.location || "Unknown"}

              </span>

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="flex flex-wrap lg:flex-nowrap items-center gap-10">

          {/* Blood Group */}

          <div className="text-center">

            <p className="text-xs uppercase tracking-[0.25em] text-gray-400 font-bold mb-2">

              Blood

            </p>

            <span className="
              bg-red-50
              text-red-600
              px-4
              py-2
              rounded-full
              font-black
            ">

              {hero.bloodGroup || "--"}

            </span>

          </div>

          {/* Donations */}

          <div className="text-center">

            <p className="text-xs uppercase tracking-[0.25em] text-gray-400 font-bold mb-2">

              Donations

            </p>

            <div className="flex items-center justify-center gap-2">

              <Heart
                size={18}
                className="text-red-500"
                fill="currentColor"
              />

              <span className="text-2xl font-black text-gray-900">

                {hero.donations}

              </span>

            </div>

          </div>

          {/* Score */}

          <div className="text-center">

            <p className="text-xs uppercase tracking-[0.25em] text-gray-400 font-bold mb-2">

              Score

            </p>

            <div className="flex items-center justify-center gap-2">

              <Award
                size={18}
                className="text-amber-500"
              />

              <span className="text-2xl font-black text-gray-900">

                {hero.points}

              </span>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

};

export default LeaderboardRow;