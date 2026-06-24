import React, {
  useEffect,
  useState
} from "react";

import API from "../api/axios";

import {
  Droplet,
  AlertTriangle,
  Save
} from "lucide-react";

import { toast } from "sonner";

const BloodInventory = () => {

  const [inventory, setInventory] =
    useState(null);

  const [loading, setLoading] =
    useState(true);


  const localUser =
    JSON.parse(
      localStorage.getItem("user")
    );

  const hospitalId =
    localUser?._id ||
    localUser?.id;


  // ======================================================
  // FETCH INVENTORY
  // ======================================================

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

        console.error(error);

        toast.error(
          "Inventory not found. Creating..."
        );

        try {

          await API.post(
            "/inventory/create",
            {
              hospitalId
            }
          );

          const res =
            await API.get(

              `/inventory/${hospitalId}`

            );

          setInventory(
            res.data.inventory
          );

        } catch (err) {

          console.error(err);

        }

      } finally {

        setLoading(false);

      }

    };


  useEffect(() => {

    fetchInventory();

  }, []);


  // ======================================================
  // HANDLE CHANGE
  // ======================================================

  const handleChange =
    (field, value) => {

      setInventory({

        ...inventory,

        [field]:
          Number(value)

      });

    };


  // ======================================================
  // SAVE INVENTORY
  // ======================================================

  const saveInventory =
    async () => {

      try {

        await API.patch(

          `/inventory/update/${hospitalId}`,

          inventory

        );

        toast.success(
          "Inventory Updated"
        );

      } catch (error) {

        console.error(error);

        toast.error(
          "Failed to update inventory"
        );

      }

    };


  // ======================================================
  // LOADING
  // ======================================================

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        <h1 className="text-3xl font-black">
          Loading Inventory...
        </h1>

      </div>

    );

  }


  const bloodGroups = [

    {
      key: "A_POSITIVE",
      label: "A+"
    },

    {
      key: "A_NEGATIVE",
      label: "A-"
    },

    {
      key: "B_POSITIVE",
      label: "B+"
    },

    {
      key: "B_NEGATIVE",
      label: "B-"
    },

    {
      key: "AB_POSITIVE",
      label: "AB+"
    },

    {
      key: "AB_NEGATIVE",
      label: "AB-"
    },

    {
      key: "O_POSITIVE",
      label: "O+"
    },

    {
      key: "O_NEGATIVE",
      label: "O-"
    }

  ];


  return (

    <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-6">

      <div className="max-w-6xl mx-auto">


        {/* HEADER */}

        <div className="mb-10">

          <p className="text-xs uppercase tracking-[0.3em] font-black text-red-600 mb-3">
            Hospital Operations
          </p>

          <h1 className="text-5xl font-black text-gray-900">
            Blood Inventory
          </h1>

        </div>


        {/* SUMMARY */}

        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white p-6 rounded-3xl border border-gray-200">

            <p className="text-gray-500 font-semibold">
              Total Units
            </p>

            <h2 className="text-4xl font-black mt-2">

              {
                bloodGroups.reduce(
                  (sum, item) =>
                    sum +
                    (inventory[
                      item.key
                    ] || 0),

                  0
                )
              }

            </h2>

          </div>


          <div className="bg-white p-6 rounded-3xl border border-gray-200">

            <p className="text-gray-500 font-semibold">
              Blood Types
            </p>

            <h2 className="text-4xl font-black mt-2">
              8
            </h2>

          </div>


          <div className="bg-white p-6 rounded-3xl border border-gray-200">

            <p className="text-gray-500 font-semibold">
              Critical Groups
            </p>

            <h2 className="text-4xl font-black mt-2 text-red-600">

              {
                bloodGroups.filter(
                  (item) =>
                    inventory[
                      item.key
                    ] <= 5
                ).length
              }

            </h2>

          </div>

        </div>


        {/* INVENTORY GRID */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          {bloodGroups.map(
            (group) => {

              const units =
                inventory[
                  group.key
                ];

              const lowStock =
                units <= 5;

              return (

                <div
                  key={group.key}
                  className="bg-white border border-gray-200 rounded-3xl p-6"
                >

                  <div className="flex items-center justify-between mb-5">

                    <div className="flex items-center gap-2">

                      <Droplet
                        size={18}
                        className="text-red-600"
                      />

                      <h3 className="text-xl font-black">
                        {group.label}
                      </h3>

                    </div>

                    {lowStock && (

                      <AlertTriangle
                        size={18}
                        className="text-red-500"
                      />

                    )}

                  </div>


                  <input
                    type="number"
                    min="0"
                    value={units}
                    onChange={(e) =>
                      handleChange(
                        group.key,
                        e.target.value
                      )
                    }
                    className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-center text-2xl font-black outline-none"
                  />

                  <p
                    className={`mt-4 text-sm font-bold ${
                      lowStock
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >

                    {lowStock
                      ? "Low Stock"
                      : "Healthy Stock"}

                  </p>

                </div>

              );

            }
          )}

        </div>


        {/* SAVE BUTTON */}

        <div className="mt-10">

          <button
            onClick={
              saveInventory
            }
            className="bg-red-600 hover:bg-red-700 transition-all text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3"
          >

            <Save size={18} />

            Save Inventory

          </button>

        </div>

      </div>

    </div>

  );

};

export default BloodInventory;