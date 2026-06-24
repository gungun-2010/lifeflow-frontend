import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { Plus, Minus, Save, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

const Inventory = () => {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const hospitalId =
    user?._id || user?.id;

  const [inventory, setInventory] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [alerts, setAlerts] =
    useState([]);

  const bloodGroups = [
    "A_POSITIVE",
    "A_NEGATIVE",
    "B_POSITIVE",
    "B_NEGATIVE",
    "AB_POSITIVE",
    "AB_NEGATIVE",
    "O_POSITIVE",
    "O_NEGATIVE"
  ];

  useEffect(() => {

    fetchInventory();

    fetchAlerts();

  }, []);

  const createInventory =
    async () => {

      try {

        await API.post(
          "/inventory/create",
          {
            hospitalId
          }
        );

        fetchInventory();

      } catch (error) {

        console.log(error);

      }

    };

  const fetchInventory =
    async () => {

      try {

        const res =
          await API.get(
            `/inventory/${hospitalId}`
          );

        setInventory(
          res.data.inventory
        );

      } catch (error) {

        await createInventory();

      } finally {

        setLoading(false);

      }

    };

  const fetchAlerts =
    async () => {

      try {

        const res =
          await API.get(
            `/inventory/alerts/${hospitalId}`
          );

        setAlerts(
          res.data.alerts
        );

      } catch (error) {

        console.log(error);

      }

    };

  const addUnit =
    async (group) => {

      try {

        const res =
          await API.patch(
            `/inventory/add/${hospitalId}`,
            {
              bloodGroup: group,
              units: 1
            }
          );

        setInventory(
          res.data.inventory
        );

        fetchAlerts();

      } catch (error) {

        console.log(error);

      }

    };

  const removeUnit =
    async (group) => {

      try {

        const res =
          await API.patch(
            `/inventory/remove/${hospitalId}`,
            {
              bloodGroup: group,
              units: 1
            }
          );

        setInventory(
          res.data.inventory
        );

        fetchAlerts();

      } catch (error) {

        console.log(error);

      }

    };

  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-black">
          Loading Inventory...
        </h1>
      </div>
    );

  }

  return (

    <div className="min-h-screen bg-gray-50 pt-24 px-6 pb-16">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-5xl font-black mb-10">
          Blood Inventory
        </h1>

        {alerts.length > 0 && (

          <div className="mb-8 bg-red-50 border border-red-200 rounded-3xl p-6">

            <div className="flex items-center gap-3 mb-4">

              <AlertTriangle
                className="text-red-600"
              />

              <h2 className="text-2xl font-black text-red-700">
                Low Stock Alerts
              </h2>

            </div>

            {alerts.map((alert) => (

              <p
                key={alert.bloodGroup}
                className="text-red-600 font-bold"
              >
                {alert.bloodGroup} :
                {" "}
                {alert.units}
                {" "}
                units left
              </p>

            ))}

          </div>

        )}

        <div className="grid md:grid-cols-2 gap-6">

          {bloodGroups.map((group) => (

            <div
              key={group}
              className="bg-white rounded-3xl border border-gray-200 p-6"
            >

              <div className="flex items-center justify-between">

                <div>

                  <h2 className="text-2xl font-black">
                    {group.replace(
                      "_",
                      " "
                    )}
                  </h2>

                  <p className="text-gray-500 mt-2">
                    Current Units
                  </p>

                  <h3 className="text-4xl font-black mt-2 text-red-600">
                    {inventory[group]}
                  </h3>

                </div>

                <div className="flex gap-3">

                  <button
                    onClick={() =>
                      removeUnit(group)
                    }
                    className="bg-red-100 hover:bg-red-200 p-3 rounded-xl"
                  >
                    <Minus />
                  </button>

                  <button
                    onClick={() =>
                      addUnit(group)
                    }
                    className="bg-green-100 hover:bg-green-200 p-3 rounded-xl"
                  >
                    <Plus />
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

};

export default Inventory;