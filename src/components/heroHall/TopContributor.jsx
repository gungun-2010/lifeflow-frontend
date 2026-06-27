import React from "react";
import {
  Trophy,
  Heart,
  ShieldCheck,
  MapPin,
  Droplets
} from "lucide-react";

const TopContributor = ({ hero }) => {

  if (!hero) return null;

  const initials = hero.name
    .split(" ")
    .map(word => word[0])
    .join("")
    .substring(0, 2);

  return (

    <div className="bg-white border border-gray-200 rounded-[32px] shadow-sm p-10 lg:p-14 mb-12">

      <div className="grid lg:grid-cols-[1.8fr_1fr] gap-10 items-center">

        {/* LEFT */}

        <div>

          <div className="flex items-center gap-5 mb-8">

            <div className="w-20 h-20 rounded-3xl bg-yellow-100 flex items-center justify-center">

              <Trophy
                className="text-yellow-600"
                size={42}
              />

            </div>

            <div>

              <p className="uppercase tracking-[0.35em] text-red-600 text-xs font-black mb-2">

                TOP CONTRIBUTOR

              </p>

              <h2 className="text-5xl font-black text-gray-900">

                {hero.name}

              </h2>

            </div>

          </div>

          <p className="text-lg text-gray-600 leading-8 max-w-3xl">

            Recognized as the leading contributor in the LifeFlow
            community for outstanding commitment towards voluntary
            blood donation and emergency healthcare support.

          </p>

          {/* INFO */}

          <div className="flex flex-wrap gap-5 mt-10">

            <div className="flex items-center gap-3 bg-red-50 rounded-xl px-5 py-3">

              <Droplets
                size={18}
                className="text-red-600"
              />

              <span className="font-bold text-gray-800">

                {hero.bloodGroup}

              </span>

            </div>

            <div className="flex items-center gap-3 bg-blue-50 rounded-xl px-5 py-3">

              <MapPin
                size={18}
                className="text-blue-600"
              />

              <span className="font-bold text-gray-800">

                {hero.location}

              </span>

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div>

          {/* Avatar */}

          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-500 to-green-700 mx-auto flex items-center justify-center text-white text-5xl font-black shadow-xl">

            {initials}

          </div>

          {/* Stats */}

          <div className="grid grid-cols-2 gap-5 mt-10">

            <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6">

              <div className="flex items-center justify-between">

                <Heart
                  size={20}
                  className="text-red-500"
                  fill="currentColor"
                />

                <span className="text-xs uppercase tracking-widest text-gray-400 font-black">

                  Donations

                </span>

              </div>

              <h3 className="text-4xl font-black mt-5">

                {hero.donations}

              </h3>

            </div>

            <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6">

              <div className="flex items-center justify-between">

                <ShieldCheck
                  size={20}
                  className="text-red-600"
                />

                <span className="text-xs uppercase tracking-widest text-gray-400 font-black">

                  Score

                </span>

              </div>

              <h3 className="text-4xl font-black mt-5">

                {hero.points}

              </h3>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

};

export default TopContributor;