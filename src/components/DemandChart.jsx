import React, {
  useEffect,
  useState
} from "react";

import API from "../api/axios";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell
} from "recharts";

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

const CustomTooltip = ({
  active,
  payload
}) => {

  if (
    active &&
    payload &&
    payload.length
  ) {

    return (

      <div
        className="
          bg-white
          p-4
          rounded-xl
          shadow-lg
          border
          border-gray-200
        "
      >

        <p className="font-black text-gray-900">

          Blood Group:
          {" "}
          {payload[0].payload.bloodGroup}

        </p>

        <p className="text-red-600 font-bold">

          Requests:
          {" "}
          {payload[0].value}

        </p>

      </div>

    );

  }

  return null;

};

const DemandChart = () => {

  const [data, setData] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const fetchData =
    async () => {

      try {

        const res =
          await API.get(
            "/analytics/blood-demand"
          );

        const formatted =
          res.data.map(
            (item) => ({

              bloodGroup:
                item._id,

              demand:
                item.count

            })
          );

        setData(
          formatted
        );

      } catch (error) {

        console.error(
          "Demand Chart Error:",
          error
        );

      } finally {

        setLoading(false);

      }

    };

  useEffect(() => {

    fetchData();

    const interval =
      setInterval(
        fetchData,
        10000
      );

    return () =>
      clearInterval(
        interval
      );

  }, []);

  if (loading) {

    return (

      <div className="h-[400px] flex items-center justify-center">

        <h2 className="text-xl font-bold text-gray-500">

          Loading Analytics...

        </h2>

      </div>

    );

  }

  return (

    <div
      className="
        bg-white
        rounded-3xl
        p-8
        shadow-lg
        border
        border-gray-200
      "
    >

      <div className="mb-8">

        <h2
          className="
            text-3xl
            font-black
            text-gray-900
          "
        >

          Blood Demand Analytics

        </h2>

        <p className="text-gray-500 mt-2">

          Real-time distribution of blood requests
          across all blood groups.

        </p>

      </div>

      <ResponsiveContainer
        width="100%"
        height={450}
      >

        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 10,
            bottom: 10
          }}
        >

          <CartesianGrid
            strokeDasharray="3 3"
            opacity={0.3}
          />

          <XAxis
            dataKey="bloodGroup"
            tick={{
              fontSize: 14,
              fontWeight: 700
            }}
          />

          <YAxis />

          <Tooltip
            content={
              <CustomTooltip />
            }
          />

          <Bar
            dataKey="demand"
            radius={[
              10,
              10,
              0,
              0
            ]}
          >

            {

              data.map(
                (
                  entry,
                  index
                ) => (

                  <Cell

                    key={index}

                    fill={
                      COLORS[
                        entry.bloodGroup
                      ] || "#6B7280"
                    }

                  />

                )
              )

            }

          </Bar>

        </BarChart>

      </ResponsiveContainer>

      <div
        className="
          mt-8
          flex
          flex-wrap
          gap-4
          justify-center
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

                <span
                  className="
                    font-semibold
                    text-gray-700
                  "
                >

                  {group}

                </span>

              </div>

            )
          )

        }

      </div>

    </div>

  );

};

export default DemandChart;