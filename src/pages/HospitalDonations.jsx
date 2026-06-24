import React, {
  useEffect,
  useState
} from "react";

import API from "../api/axios";

import {
  Droplet,
  Calendar,
  Award
} from "lucide-react";

const HospitalDonations = () => {

  const [donations, setDonations] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  const hospitalId =
    user?._id ||
    user?.id;

  useEffect(() => {

    fetchDonations();

  }, []);

  const fetchDonations =
    async () => {

      try {

        const res =
          await API.get(

            `/donations/hospital/${hospitalId}`

          );

        setDonations(
          res.data.donations
        );

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        <h1 className="text-3xl font-black">
          Loading Donations...
        </h1>

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-gray-50 pt-24 px-6 pb-16">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-5xl font-black mb-10">
          Donation Records
        </h1>

        <div className="space-y-5">

          {donations.map(
            (donation) => (

              <div
                key={donation._id}
                className="bg-white border border-gray-200 rounded-3xl p-6"
              >

                <div className="flex items-center justify-between">

                  <div>

                    <h2 className="text-2xl font-black">

                      {
                        donation.donorId
                          ?.name
                      }

                    </h2>

                    <p className="text-gray-500">

                      {
                        donation.donorId
                          ?.email
                      }

                    </p>

                  </div>

                  <div className="flex gap-6">

                    <div className="flex items-center gap-2">

                      <Droplet
                        size={18}
                      />

                      {
                        donation.bloodGroup
                      }

                    </div>

                    <div className="flex items-center gap-2">

                      <Award
                        size={18}
                      />

                      {
                        donation.pointsEarned
                      } Points

                    </div>

                    <div className="flex items-center gap-2">

                      <Calendar
                        size={18}
                      />

                      {
                        new Date(
                          donation.donationDate
                        ).toLocaleDateString()
                      }

                    </div>

                  </div>

                </div>

              </div>

            )
          )}

        </div>

      </div>

    </div>

  );

};

export default HospitalDonations;