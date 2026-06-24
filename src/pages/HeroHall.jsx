import React, { useEffect, useState } from "react";
import {
  Trophy,
  Crown,
  Heart,
  ArrowUpRight,
  Medal,
  ShieldCheck,
  Activity
} from "lucide-react";

import API from "../api/axios";


const HeroHall = () => {

  const [heroes, setHeroes] = useState([]);

  const [loading, setLoading] = useState(true);


  // ======================================================
  // FETCH LEADERBOARD
  // ======================================================

  useEffect(() => {

    const fetchHeroes = async () => {

      try {

        const res = await API.get("/leaderboard");

        console.log(res.data);

        const formattedHeroes = res.data.users.map(
          (user, index) => ({

            id: user._id,

            name: user.name,

            donations:
              user.totalDonations || 0,

            rank: index + 1,

            points:
              user.points || 0,

            growth: "+0%",

            bloodGroup:
              user.bloodGroup,

            location:
              user.location

          })
        );

        setHeroes(formattedHeroes);

      } catch (error) {

        console.error(
          "Leaderboard Fetch Error:",
          error
        );

      } finally {

        setLoading(false);

      }

    };

    fetchHeroes();

  }, []);


  // ======================================================
  // LOADING STATE
  // ======================================================

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-gray-50">

        <h2 className="text-2xl font-black text-gray-700">
          Loading Hero Hall...
        </h2>

      </div>

    );

  }


  // ======================================================
  // EMPTY STATE
  // ======================================================

  if (heroes.length === 0) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-gray-50">

        <h2 className="text-2xl font-black text-gray-700">
          No donors found
        </h2>

      </div>

    );

  }


  return (

    <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-6">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex items-end justify-between mb-12">

          <div>

            <p className="text-xs uppercase tracking-[0.3em] font-black text-red-600 mb-4">
              Community Recognition
            </p>

            <h1 className="text-5xl font-black tracking-tight text-gray-900">
              Hero Hall
            </h1>

            <p className="text-lg text-gray-600 mt-5 font-medium max-w-2xl">
              Recognizing individuals who continuously contribute
              towards emergency healthcare support through voluntary
              blood donation and rapid response participation.
            </p>

          </div>

          <div className="hidden lg:flex items-center gap-3 bg-white border border-gray-200 rounded-2xl px-5 py-4 shadow-sm">

            <Activity className="text-red-600" size={20} />

            <div>

              <p className="text-xs uppercase tracking-widest text-gray-400 font-black">
                Live Activity
              </p>

              <h4 className="font-black text-gray-900">
                {heroes.length} Active Donors
              </h4>

            </div>

          </div>

        </div>


        {/* HERO SECTION */}
        <div className="bg-white border border-gray-200 rounded-3xl p-10 md:p-14 mb-10 shadow-sm">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">

            {/* LEFT */}
            <div className="max-w-3xl">

              <div className="flex items-center gap-3 mb-6">

                <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center">

                  <Trophy className="text-red-600" size={26} />

                </div>

                <div>

                  <p className="text-xs uppercase tracking-[0.3em] font-black text-red-600 mb-2">
                    Top Contributor
                  </p>

                  <h2 className="text-3xl md:text-4xl font-black tracking-tight text-gray-900">
                    {heroes[0]?.name}
                  </h2>

                </div>

              </div>

              <p className="text-lg text-gray-600 leading-relaxed font-medium">
                Leading the donor network through continuous blood donations
                and emergency healthcare support contributions.
              </p>

            </div>

            {/* RIGHT */}
            <div className="grid grid-cols-2 gap-5 min-w-[320px]">

              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">

                <div className="flex items-center justify-between mb-4">

                  <Heart
                    className="text-red-500"
                    size={20}
                    fill="currentColor"
                  />

                  <span className="text-xs uppercase tracking-widest font-black text-gray-400">
                    Donations
                  </span>

                </div>

                <h3 className="text-4xl font-black text-gray-900">
                  {heroes[0]?.donations}
                </h3>

              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">

                <div className="flex items-center justify-between mb-4">

                  <ShieldCheck
                    className="text-red-600"
                    size={20}
                  />

                  <span className="text-xs uppercase tracking-widest font-black text-gray-400">
                    Score
                  </span>

                </div>

                <h3 className="text-4xl font-black text-gray-900">
                  {heroes[0]?.points}
                </h3>

              </div>

            </div>

          </div>

        </div>


        {/* LEADERBOARD */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

          {heroes.map((hero, i) => (

            <div
              key={hero.id}
              className="group bg-white border border-gray-200 rounded-3xl p-7 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >

              {/* TOP */}
              <div className="flex items-center justify-between mb-8">

                <div
                  className={`
                    w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl
                    ${i === 0
                      ? "bg-amber-50 text-amber-600"
                      : "bg-gray-100 text-gray-700"}
                  `}
                >
                  {hero.rank}
                </div>

                <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-2 rounded-xl">

                  <ArrowUpRight size={15} />

                  <span className="text-sm font-bold">
                    {hero.growth}
                  </span>

                </div>

              </div>

              {/* NAME */}
              <div className="mb-8">

                <h3 className="text-2xl font-black text-gray-900 mb-2">
                  {hero.name}
                </h3>

                <p className="text-gray-500 font-medium">
                  {hero.bloodGroup} • {hero.location}
                </p>

              </div>

              {/* STATS */}
              <div className="space-y-5">

                <div className="flex items-center justify-between">

                  <p className="text-sm text-gray-500 font-medium">
                    Donations
                  </p>

                  <div className="flex items-center gap-2">

                    <Heart
                      size={16}
                      className="text-red-500"
                      fill="currentColor"
                    />

                    <span className="font-black text-gray-900">
                      {hero.donations}
                    </span>

                  </div>

                </div>

                <div className="flex items-center justify-between">

                  <p className="text-sm text-gray-500 font-medium">
                    Contribution Score
                  </p>

                  <span className="font-black text-gray-900">
                    {hero.points}
                  </span>

                </div>

              </div>

              {/* FOOTER */}
              <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">

                <div className="flex items-center gap-2">

                  {i === 0 ? (
                    <Crown className="text-amber-500" size={18} />
                  ) : (
                    <Medal className="text-gray-300" size={18} />
                  )}

                  <span className="text-sm font-black text-gray-900">
                    Rank #{hero.rank}
                  </span>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

};

export default HeroHall;

