import React,
{
  useEffect,
  useState
}
from "react";

import API from "../api/axios";

import {

  BarChart,
  Bar,
  Cell,

  XAxis,
  YAxis,

  Tooltip,

  ResponsiveContainer,

  CartesianGrid

}
from "recharts";

const COLORS = {

  "A+": "#EF4444",
  "A-": "#F97316",

  "B+": "#3B82F6",
  "B-": "#06B6D4",

  "AB+": "#8B5CF6",
  "AB-": "#A855F7",

  "O+": "#22C55E",
  "O-": "#EAB308"

};

const HospitalAnalytics =
() => {

  const [
    analytics,
    setAnalytics
  ] = useState(null);

  useEffect(() => {

    const fetchData =
      async () => {

        try {

          const user =
            JSON.parse(

              localStorage.getItem(
                "user"
              )

            );

          const res =
            await API.get(

              `/analytics/hospital/${user._id}`

            );

          setAnalytics(
            res.data.analytics
          );

        } catch (error) {

          console.error(
            "Analytics Error:",
            error
          );

        }

      };

    fetchData();

  }, []);

  if (!analytics) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        <h1 className="text-3xl font-black text-gray-600">

          Loading Analytics...

        </h1>

      </div>

    );

  }

  const bloodData =
    Object.entries(

      analytics.bloodDemand

    ).map(

      ([group, value]) => ({

        group,

        value

      })

    );

  return (

    <div className="min-h-screen bg-gray-50 p-8">

      {/* HEADER */}

      <div className="mb-10">

        <h1 className="text-5xl font-black text-gray-900">

          Hospital Analytics

        </h1>

        <p className="text-gray-500 mt-2">

          Real-time insights and performance metrics

        </p>

      </div>

      {/* STAT CARDS */}

      <div className="grid md:grid-cols-4 gap-6 mb-10">

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">

          <h3 className="text-gray-500 font-semibold">

            Total Requests

          </h3>

          <p className="text-5xl font-black text-red-600 mt-2">

            {
              analytics.totalRequests
            }

          </p>

        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">

          <h3 className="text-gray-500 font-semibold">

            Completed

          </h3>

          <p className="text-5xl font-black text-green-600 mt-2">

            {
              analytics.completedRequests
            }

          </p>

        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">

          <h3 className="text-gray-500 font-semibold">

            Pending

          </h3>

          <p className="text-5xl font-black text-yellow-500 mt-2">

            {
              analytics.pendingRequests
            }

          </p>

        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">

          <h3 className="text-gray-500 font-semibold">

            Donations

          </h3>

          <p className="text-5xl font-black text-blue-600 mt-2">

            {
              analytics.totalDonations
            }

          </p>

        </div>

      </div>

      {/* CHART */}

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200">

        <h2 className="text-3xl font-black text-gray-900 mb-2">

          Blood Demand Distribution

        </h2>

        <p className="text-gray-500 mb-8">

          Number of requests received by blood group

        </p>

        <ResponsiveContainer
          width="100%"
          height={450}
        >

          <BarChart
            data={bloodData}
          >

            <CartesianGrid
              strokeDasharray="3 3"
              opacity={0.3}
            />

            <XAxis
              dataKey="group"
            />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="value"
              radius={[
                10,
                10,
                0,
                0
              ]}
            >

              {

                bloodData.map(
                  (
                    entry,
                    index
                  ) => (

                    <Cell

                      key={index}

                      fill={
                        COLORS[
                          entry.group
                        ] || "#6B7280"
                      }

                    />

                  )
                )

              }

            </Bar>

          </BarChart>

        </ResponsiveContainer>

        {/* LEGEND */}

        <div
          className="
            mt-8
            flex
            flex-wrap
            justify-center
            gap-4
          "
        >

          {

            Object.entries(
              COLORS
            ).map(
              ([group, color]) => (

                <div
                  key={group}
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >

                  <div
                    className="
                      w-4
                      h-4
                      rounded-full
                    "
                    style={{
                      backgroundColor:
                        color
                    }}
                  />

                  <span className="font-semibold text-gray-700">

                    {group}

                  </span>

                </div>

              )
            )

          }

        </div>

      </div>

    </div>

  );

};

export default HospitalAnalytics;