console.log("🔥 DONOR DASHBOARD COMPONENT LOADED");
import React, { useEffect, useState } from "react";
import {
  Bell,
  Droplet,
  Clock3,
  CheckCircle2,
  MapPin
} from "lucide-react";

import socket from "../socket";
import API from "../api/axios";
import { toast } from "sonner";

const DonorDashboard = () => {

  const [notifications, setNotifications] =
    useState([]);

  const localUser =
    JSON.parse(
      localStorage.getItem("user")
    );

  useEffect(() => {

    if (!localUser) return;

    const userId =
      localUser._id ||
      localUser.id;

    const registerUser = () => {

      console.log(
        "✅ REGISTERING USER:",
        userId
      );

  console.log(
  "🚀 ABOUT TO EMIT registerUser",
  userId
);

socket.emit(
  "registerUser",
  userId
);

console.log(
  "✅ registerUser EMITTED"
);

    };

    // Register immediately
    if (socket.connected) {

      registerUser();

    }

    // Register after reconnect
    socket.on(
      "connect",
      registerUser
    );

    // Receive realtime blood request
socket.on(
  "bloodRequestNotification",
  (data) => {

    setNotifications(
      (prev) => [
        data,
        ...prev
      ]
    );

    window.dispatchEvent(
      new Event(
        "notificationAdded"
      )
    );

  }
);

    return () => {

      socket.off(
        "connect",
        registerUser
      );

      socket.off(
        "bloodRequestNotification"
      );

    };

  }, []);

  const acceptRequest =
    async (requestId) => {

      try {

        const donorId =
          localUser._id ||
          localUser.id;

        await API.patch(

          `/hospital/accept-donor/${requestId}`,

          {
            donorId
          }

        );

        toast.success(
          "Request Accepted"
        );

      } catch (error) {

        console.error(error);

        toast.error(
          "Failed to accept request"
        );

      }

    };

  // KEEP THE REST OF YOUR JSX EXACTLY AS IT IS

  return (

    <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-6">

      <div className="max-w-5xl mx-auto">

        <div className="mb-10">

          <p className="text-xs uppercase tracking-[0.3em] font-black text-red-600 mb-3">
            Donor Emergency Center
          </p>

          <h1 className="text-5xl font-black text-gray-900">
            Donor Dashboard
          </h1>

        </div>


        {notifications.length === 0 && (

          <div className="bg-white rounded-3xl border border-gray-200 p-10 text-center">

            <Bell
              size={40}
              className="mx-auto text-gray-300 mb-4"
            />

            <h3 className="text-2xl font-black text-gray-800">
              No Emergency Alerts
            </h3>

          </div>

        )}


        <div className="space-y-5">

          {notifications.map(
            (item, index) => (

              <div
                key={index}
                className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm"
              >

                <div className="flex items-center justify-between">

                  <div>

                    <div className="flex items-center gap-3 mb-4">

                      <div className="bg-red-50 text-red-700 px-4 py-2 rounded-xl font-black flex items-center gap-2">

                        <Droplet
                          size={16}
                          fill="currentColor"
                        />

                        {item.bloodGroup}

                      </div>

                      <div className="bg-yellow-50 text-yellow-700 px-4 py-2 rounded-xl font-black flex items-center gap-2">

                        <Clock3 size={16} />

                        {item.urgency}

                      </div>

                    </div>

                    <h2 className="text-2xl font-black text-gray-900">
                      Emergency Blood Request
                    </h2>

                    <p className="text-gray-500 mt-2">
                      {item.hospitalName}
                    </p>

                    <div className="flex items-center gap-2 mt-2 text-gray-500">

                      <MapPin size={15} />

                      {item.location}

                    </div>

                  </div>


                  <button
                    onClick={() =>
                      acceptRequest(
                        item.request._id
                      )
                    }
                    className="bg-red-600 hover:bg-red-700 transition-all text-white px-6 py-4 rounded-2xl font-black flex items-center gap-2"
                  >

                    <CheckCircle2
                      size={18}
                    />

                    Accept Request

                  </button>

                </div>

              </div>

            )
          )}

        </div>

      </div>

    </div>

  );

};

export default DonorDashboard;

