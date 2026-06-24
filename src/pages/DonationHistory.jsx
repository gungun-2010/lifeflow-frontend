import React, {
  useEffect,
  useState
} from "react";

import API from "../api/axios";

import {
  Award,
  Heart,
  Droplet,
  CalendarDays
} from "lucide-react";

import { toast } from "sonner";

const DonationHistory = () => {

  const [history, setHistory] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const localUser =
    JSON.parse(
      localStorage.getItem("user")
    );

  const donorId =
    localUser?._id ||
    localUser?.id;


  // ======================================================
  // FETCH DONATION HISTORY
  // ======================================================

  const fetchHistory =
    async () => {

      try {

        const res =
          await API.get(
            `/donations/donor/${donorId}`
          );

        setHistory(
          res.data.history
        );

      } catch (error) {

        console.error(error);

        toast.error(
          "Failed to fetch donation history"
        );

      } finally {

        setLoading(false);

      }

    };


  useEffect(() => {

    if (donorId) {

      fetchHistory();

    }

  }, []);


  // ======================================================
  // STATS
  // ======================================================

  const totalDonations =
    history.length;

  const totalPoints =
    history.reduce(
      (sum, donation) =>
        sum +
        donation.pointsEarned,
      0
    );

  const livesSaved =
    totalDonations * 3;


  // ======================================================
  // LOADING
  // ======================================================

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        <h1 className="text-3xl font-black">
          Loading Donation History...
        </h1>

      </div>

    );

  }


  return (

    <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-6">

      <div className="max-w-7xl mx-auto">

        {/* ====================================================== */}
        {/* HEADER */}
        {/* ====================================================== */}

        <div className="mb-10">

          <p className="text-xs uppercase tracking-[0.3em] font-black text-red-600 mb-3">
            Donor Impact
          </p>

          <h1 className="text-5xl font-black text-gray-900">
            Donation History
          </h1>

        </div>


        {/* ====================================================== */}
        {/* STATS */}
        {/* ====================================================== */}

        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white rounded-3xl border border-gray-200 p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-gray-500 font-semibold">
                  Total Donations
                </p>

                <h2 className="text-4xl font-black mt-2">
                  {totalDonations}
                </h2>

              </div>

              <Droplet
                size={40}
                className="text-red-600"
              />

            </div>

          </div>


          <div className="bg-white rounded-3xl border border-gray-200 p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-gray-500 font-semibold">
                  Reward Points
                </p>

                <h2 className="text-4xl font-black mt-2">
                  {totalPoints}
                </h2>

              </div>

              <Award
                size={40}
                className="text-yellow-500"
              />

            </div>

          </div>


          <div className="bg-white rounded-3xl border border-gray-200 p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-gray-500 font-semibold">
                  Lives Saved
                </p>

                <h2 className="text-4xl font-black mt-2">
                  {livesSaved}
                </h2>

              </div>

              <Heart
                size={40}
                className="text-green-600"
              />

            </div>

          </div>

        </div>


        {/* ====================================================== */}
        {/* TABLE */}
        {/* ====================================================== */}

        <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden">

          <div className="p-6 border-b border-gray-200">

            <h2 className="text-2xl font-black">
              Donation Records
            </h2>

          </div>


          {history.length === 0 ? (

            <div className="p-12 text-center">

              <CalendarDays
                size={50}
                className="mx-auto text-gray-300 mb-4"
              />

              <h3 className="text-2xl font-black text-gray-700">
                No Donations Yet
              </h3>

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>

                  <tr className="bg-gray-50">

                    <th className="text-left p-4 font-black">
                      Hospital
                    </th>

                    <th className="text-left p-4 font-black">
                      Blood Group
                    </th>

                    <th className="text-left p-4 font-black">
                      Units
                    </th>

                    <th className="text-left p-4 font-black">
                      Points
                    </th>

                    <th className="text-left p-4 font-black">
                      Date
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {history.map(
                    (donation) => (

                      <tr
                        key={donation._id}
                        className="border-t border-gray-100 hover:bg-gray-50"
                      >

                        <td className="p-4 font-semibold">

                          {
                            donation
                              ?.hospitalId
                              ?.name ||
                            "Unknown Hospital"
                          }

                        </td>

                        <td className="p-4">

                          <span className="bg-red-50 text-red-700 px-3 py-1 rounded-xl font-black">

                            {
                              donation.bloodGroup
                            }

                          </span>

                        </td>

                        <td className="p-4">
                          {donation.units}
                        </td>

                        <td className="p-4 font-bold text-yellow-600">
                          +{
                            donation.pointsEarned
                          }
                        </td>

                        <td className="p-4">

                          {
                            new Date(
                              donation.donationDate
                            ).toLocaleDateString()
                          }

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

    </div>

  );

};

export default DonationHistory;


