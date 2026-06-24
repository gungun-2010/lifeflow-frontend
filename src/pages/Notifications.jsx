import React, {
  useEffect,
  useState
} from "react";

import API from "../api/axios";

import {
  Bell,
  Calendar,
  User
} from "lucide-react";
import { toast } from "sonner";

const Notifications = () => {

  const [notifications, setNotifications] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  const userId =
    user?._id ||
    user?.id;

useEffect(() => {

  fetchNotifications();

  const markAllAsRead =
  async () => {

    try {

      await API.patch(

        `/notifications/read-all/${userId}`

      );
      window.dispatchEvent(
  new Event(
    "notificationsRead"
  )
);

      console.log(
        "All notifications marked as read"
      );

    } catch (error) {

      console.error(
        error
      );

    }

  };

  markAllAsRead();

}, []);

  

  const fetchNotifications =
    async () => {

      try {

        const res =
          await API.get(
            `/notifications/${userId}`
          );

        setNotifications(
          res.data.notifications
        );

      } catch (error) {

        console.error(
          "Notification Error:",
          error
        );

      } finally {

        setLoading(false);

      }

    };

    const markAllAsRead =
  async () => {

    try {

      for (
        const notification
        of notifications
      ) {

        if (
          !notification.isRead
        ) {

          await API.patch(
            `/notifications/read/${notification._id}`
          );

        }

      }

    } catch (error) {

      console.error(error);

    }

  };

const acceptRequest =
  async (notification) => {

    try {

      const user =
        JSON.parse(
          localStorage.getItem("user")
        );

        console.log(
  "NOTIFICATION:",
  notification
);

console.log(
  "REQUEST ID:",
  notification.requestId
);

      await API.patch(

        `/hospital/accept-donor/${notification.requestId}`,

        {
          donorId:
            user._id
        }

      );

      toast.success(
        "Request Accepted"
      );

      setNotifications(
        (prev) =>
          prev.map(
            (item) =>

              item._id ===
              notification._id

                ? {
                    ...item,
                    status:
                      "accepted"
                  }

                : item
          )
      );

    } catch (error) {

  console.log(
    "ACCEPT ERROR:"
  );

  console.log(error);

  console.log(
    error.response
  );

  console.log(
    error.response?.data
  );

  toast.error(
    "Failed to accept request"
  );

}

  };


const rejectRequest =
  async (notification) => {

    try {

      await API.patch(

        `/notifications/reject/${notification._id}`

      );

      toast.success(
        "Request Rejected"
      );

      setNotifications(
        (prev) =>
          prev.map(
            (item) =>

              item._id ===
              notification._id

                ? {
                    ...item,
                    status:
                      "rejected"
                  }

                : item
          )
      );

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to reject request"
      );

    }

  };

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        <h1 className="text-3xl font-black">
          Loading Notifications...
        </h1>

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-gray-50 pt-24 px-6 pb-16">

      <div className="max-w-6xl mx-auto">

        <div className="flex items-center gap-4 mb-10">

          <Bell
            size={40}
            className="text-red-600"
          />

          <h1 className="text-5xl font-black text-gray-900">
            Notifications
          </h1>

        </div>

        {

          notifications.length === 0 ? (

            <div className="bg-white rounded-3xl border border-gray-200 p-10 text-center">

              <Bell
                size={60}
                className="mx-auto text-gray-300 mb-4"
              />

              <h2 className="text-2xl font-black text-gray-700">
                No Notifications
              </h2>

              <p className="text-gray-500 mt-2">
                You don't have any notifications yet.
              </p>

            </div>

          ) : (

            <div className="space-y-5">

              {

                notifications.map(
                  (notification) => (

                    <div
                      key={notification._id}
                      className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm"
                    >

                      <div className="flex items-start justify-between">

                        <div>

                          <div className="flex items-center gap-2 mb-3">

                            <User
                              size={18}
                              className="text-red-600"
                            />

                            <span className="font-black text-gray-900">
                              {
                                notification.senderName
                              }
                            </span>

                          </div>

<p className="text-lg text-gray-700">
  {notification.message}
</p>

{
  notification.status === "pending" && (

    <div className="flex gap-3 mt-5">

      <button
        onClick={() =>
          acceptRequest(notification)
        }
        className="
          bg-green-600
          hover:bg-green-700
          text-white
          px-5
          py-2
          rounded-xl
          font-bold
        "
      >
        Accept
      </button>

      <button
        onClick={() =>
          rejectRequest(notification)
        }
        className="
          bg-red-600
          hover:bg-red-700
          text-white
          px-5
          py-2
          rounded-xl
          font-bold
        "
      >
        Reject
      </button>

    </div>

  )
}

{
  notification.status === "accepted" && (

    <span
      className="
        inline-block
        mt-4
        bg-green-100
        text-green-700
        px-4
        py-2
        rounded-xl
        font-bold
      "
    >
      ✓ Accepted
    </span>

  )
}

{
  notification.status === "rejected" && (

    <span
      className="
        inline-block
        mt-4
        bg-red-100
        text-red-700
        px-4
        py-2
        rounded-xl
        font-bold
      "
    >
      ✕ Rejected
    </span>

  )
}

                        </div>

                        <div className="flex items-center gap-2 text-gray-500">

                          <Calendar size={16} />

                          {

                            new Date(
                              notification.createdAt
                            ).toLocaleDateString()

                          }

                        </div>

                      </div>

                    </div>

                  )
                )

              }

            </div>

          )

        }

      </div>

    </div>

  );

};

export default Notifications;