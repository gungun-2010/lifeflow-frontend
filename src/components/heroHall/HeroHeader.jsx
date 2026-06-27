import React from "react";
import { Activity } from "lucide-react";

const HeroHeader = ({ totalHeroes }) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">

      {/* Left */}

      <div>

        <p className="text-xs uppercase tracking-[0.35em] font-black text-red-600 mb-4">
          Community Recognition
        </p>

        <h1 className="text-5xl lg:text-6xl font-black tracking-tight text-gray-900">
          Hero Hall
        </h1>

        <p className="text-lg text-gray-600 mt-6 leading-8 max-w-3xl">

          Celebrating the remarkable individuals whose dedication
          to voluntary blood donation strengthens communities and
          helps save lives across the country.

        </p>

      </div>

      {/* Right */}

      <div
        className="
          bg-white
          border
          border-gray-200
          rounded-2xl
          shadow-sm
          px-6
          py-5
          flex
          items-center
          gap-4
          min-w-[260px]
        "
      >

        <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">

          <Activity
            className="text-red-600"
            size={22}
          />

        </div>

        <div>

          <p className="text-xs uppercase tracking-[0.3em] font-black text-gray-400">
            Live Leaderboard
          </p>

          <h3 className="text-2xl font-black text-gray-900">

            {totalHeroes}

          </h3>

          <p className="text-gray-500 text-sm">

            Active Heroes

          </p>

        </div>

      </div>

    </div>
  );
};

export default HeroHeader;