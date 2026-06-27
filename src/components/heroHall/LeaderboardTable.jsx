import React from "react";
import { Trophy, Activity } from "lucide-react";
import LeaderboardRow from "./LeaderboardRow";

const LeaderboardTable = ({ heroes }) => {

  return (

    <div className="bg-white rounded-[32px] border border-gray-200 shadow-sm overflow-hidden">

      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-8 py-6 bg-gray-50 border-b border-gray-200">

        <div className="flex items-center gap-4">

          <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center">

            <Trophy
              className="text-red-600"
              size={28}
            />

          </div>

          <div>

            <h2 className="text-3xl font-black text-gray-900">

              Hero Leaderboard

            </h2>

            <p className="text-gray-500 mt-1">

              Ranked by total contribution score

            </p>

          </div>

        </div>

        <div className="flex items-center gap-3 bg-red-50 text-red-600 px-5 py-3 rounded-xl font-bold">

          <Activity size={18} />

          Live Rankings

        </div>

      </div>

      {/* Column Headings */}

      <div className="hidden lg:grid grid-cols-[3fr_1fr_1fr_1fr] px-10 py-4 bg-white border-b border-gray-100">

        <span className="text-sm uppercase tracking-[0.3em] text-gray-400 font-black">
          Donor
        </span>

        <span className="text-center text-sm uppercase tracking-[0.3em] text-gray-400 font-black">
          Blood
        </span>

        <span className="text-center text-sm uppercase tracking-[0.3em] text-gray-400 font-black">
          Donations
        </span>

        <span className="text-center text-sm uppercase tracking-[0.3em] text-gray-400 font-black">
          Score
        </span>

      </div>

      {/* Leaderboard */}

      <div className="p-6 space-y-5">

        {heroes.map((hero) => (

          <LeaderboardRow

            key={hero.id}

            hero={hero}

          />

        ))}

      </div>

    </div>

  );

};

export default LeaderboardTable;