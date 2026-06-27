import React, { useEffect, useState } from "react";
import API from "../api/axios";

import HeroHeader from "../components/heroHall/HeroHeader";
import TopContributor from "../components/heroHall/TopContributor";
import LeaderboardTable from "../components/heroHall/LeaderboardTable";

const HeroHall = () => {

  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(true);

  // ======================================================
  // FETCH HEROES
  // ======================================================

  useEffect(() => {

    const fetchHeroes = async () => {

      try {

        const res = await API.get("/leaderboard");

        const formattedHeroes = res.data.users.map((user, index) => ({

          id: user._id,

          name: user.name,

          rank: index + 1,

          donations: user.totalDonations || 0,

          points: user.points || 0,

          bloodGroup: user.bloodGroup,

          location: user.location

        }));

        setHeroes(formattedHeroes);

      }

      catch (error) {

        console.error(
          "Leaderboard Fetch Error:",
          error
        );

      }

      finally {

        setLoading(false);

      }

    };

    fetchHeroes();

  }, []);

  // ======================================================
  // LOADING
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
  // EMPTY
  // ======================================================

  if (!heroes.length) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-gray-50">

        <h2 className="text-2xl font-black text-gray-700">

          No donors found.

        </h2>

      </div>

    );

  }

  // ======================================================
  // PAGE
  // ======================================================

  return (

    <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-6">

      <div className="max-w-7xl mx-auto">

        <HeroHeader
          totalHeroes={heroes.length}
        />

        <TopContributor
          hero={heroes[0]}
        />

        <LeaderboardTable
          heroes={heroes}
        />

      </div>

    </div>

  );

};

export default HeroHall;