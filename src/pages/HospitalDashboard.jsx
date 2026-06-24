import React, {
  useEffect,
  useState
} from "react";

import {
  Plus,
  Trash2,
  CheckCircle2,
  XCircle,
  Clock3,
  Droplet,
  Users,
  Phone,
  MapPin
} from "lucide-react";

import { toast } from "sonner";

import API from "../api/axios";

import socket from "../socket";

const HospitalDashboard = () => {

  // ======================================================
  // STATES
  // ======================================================

  const [requests, setRequests] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [showModal, setShowModal] =
    useState(false);

  const [
    showDonorModal,
    setShowDonorModal
  ] = useState(false);

  const [
    selectedDonors,
    setSelectedDonors
  ] = useState([]);

  const [
  selectedRequestId,
  setSelectedRequestId
] = useState(null);


  const [formData, setFormData] =
    useState({

      patientName: "",

      bloodGroup: "A+",

      unitsNeeded: 1,

      urgency: "normal",

      notes: ""

    });


  // ======================================================
  // LOCAL USER
  // ======================================================

const userString =
  localStorage.getItem("user");

console.log(
  "RAW LOCAL STORAGE:",
  userString
);

const localUser =
  userString
    ? JSON.parse(userString)
    : null;

    if (!localUser) {

  window.location.href = "/login";
  return null;

}

if (localUser.role !== "hospital") {

  window.location.href = "/dashboard";
  return null;

}

console.log(
  "PARSED USER:",
  localUser
);

const userId =
  localUser?._id ||
  localUser?.id;

console.log(
  "USER ID:",
  userId
);


  // ======================================================
  // FETCH REQUESTS
  // ======================================================

const fetchRequests =
  async () => {

    if (!userId) {

      console.log("NO USER ID FOUND");
      return;

    }
      try {

        const res =
          await API.get(

            `/hospital/requests/${userId}`

          );

        setRequests(
          res.data.requests
        );

      } catch (error) {

        console.error(error);

        toast.error(
          "Failed to fetch requests"
        );

      } finally {

        setLoading(false);

      }

    };


  // ======================================================
  // SOCKET + INITIAL FETCH
  // ======================================================

  useEffect(() => {

    fetchRequests();


    socket.on(

      "donorAcceptedRequest",

      () => {

        toast.success(
          "Donor accepted request"
        );

        fetchRequests();

      }

    );


    return () => {

      socket.off(
        "donorAcceptedRequest"
      );

    };

  }, []);


  // ======================================================
  // CREATE REQUEST
  // ======================================================

  const handleCreateRequest =
    async (e) => {

      e.preventDefault();

      try {

        await API.post(

          "/hospital/create-request",

          {

            ...formData,

            hospitalId:
              userId,

            hospitalName:
              localUser.name,

            location:
              localUser.location

          }

        );

        toast.success(
          "Emergency request created"
        );

        setShowModal(false);

        setFormData({

          patientName: "",

          bloodGroup: "A+",

          unitsNeeded: 1,

          urgency: "normal",

          notes: ""

        });

        fetchRequests();

      } catch (error) {

        console.error(error);

        toast.error(
          "Failed to create request"
        );

      }

    };


  // ======================================================
  // UPDATE STATUS
  // ======================================================

  const updateStatus =
    async (id, status) => {

      try {

        await API.patch(

          `/hospital/update-status/${id}`,

          { status }

        );

        toast.success(
          "Request updated"
        );

        fetchRequests();

      } catch (error) {

        console.error(error);

      }

    };


  // ======================================================
  // DELETE REQUEST
  // ======================================================

  const deleteRequest =
    async (id) => {

      try {

        await API.delete(
          `/hospital/delete/${id}`
        );

        toast.success(
          "Request deleted"
        );

        fetchRequests();

      } catch (error) {

        console.error(error);

      }

    };


  // ======================================================
  // DONOR MODAL
  // ======================================================

const openDonorModal =
  (
    donors,
    requestId
  ) => {

    setSelectedDonors(
      donors
    );

    setSelectedRequestId(
      requestId
    );

    setShowDonorModal(true);

  };

    // ======================================================
// COMPLETE DONATION
// ======================================================

const completeDonation =
  async (
    requestId,
    donorId
  ) => {

    try {

      await API.patch(

        `/hospital/complete-donation/${requestId}`,

        {
          donorId
        }

      );

      toast.success(
        "Donation Completed"
      );

      fetchRequests();

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to complete donation"
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
          Loading...
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

<div className="flex items-center justify-between mb-10">

  <div>

    <p className="text-xs uppercase tracking-[0.3em] font-black text-red-600 mb-3">
      Hospital Operations
    </p>

    <h1 className="text-5xl font-black text-gray-900">
      Hospital Dashboard
    </h1>

  </div>

  <div className="flex gap-4">

    <button
      onClick={() =>
        window.location.href =
          "/inventory"
      }
      className="bg-purple-600 hover:bg-purple-700 transition-all text-white px-6 py-4 rounded-2xl font-black"
    >
      Inventory
    </button>

    <button
      onClick={() =>
        setShowModal(true)
      }
      className="bg-red-600 hover:bg-red-700 transition-all text-white px-6 py-4 rounded-2xl font-black flex items-center gap-3"
    >
      <Plus size={20} />
      Create Request
    </button>

  </div>

</div>


        {/* ====================================================== */}
        {/* REQUESTS */}
        {/* ====================================================== */}

        <div className="space-y-6">

          {requests.map((request) => (

            <div
              key={request._id}
              className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm"
            >

              <div className="flex items-start justify-between gap-10">


                {/* LEFT */}
                <div className="flex-1">

                  <div className="flex items-center gap-3 mb-5">

                    <div className="bg-red-50 text-red-700 px-4 py-2 rounded-xl font-black flex items-center gap-2">

                      <Droplet
                        size={15}
                        fill="currentColor"
                      />

                      {request.bloodGroup}

                    </div>

                    <div className="bg-yellow-50 text-yellow-700 px-4 py-2 rounded-xl font-black flex items-center gap-2">

                      <Clock3 size={15} />

                      {request.urgency}

                    </div>

                  </div>


                  <h2 className="text-3xl font-black text-gray-900 mb-3">
                    {request.patientName}
                  </h2>

                  <h2 className="text-2xl font-black">
  {request.patientName}
</h2>

<div className="mt-2 mb-4">

  {
    request.status === "open" && (
      <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-xl font-bold">
        Open
      </span>
    )
  }

  {
    request.status === "matched" && (
      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-xl font-bold">
        Matched
      </span>
    )
  }

  {
    request.status === "fulfilled" && (
      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-xl font-bold">
        Fulfilled
      </span>
    )
  }

</div>


                  <div className="space-y-2 text-gray-600">

                    <p>
                      <span className="font-black">
                        Units Needed:
                      </span>{" "}
                      {request.unitsNeeded}
                    </p>

                    <p>
                      <span className="font-black">
                        Notes:
                      </span>{" "}
                      {request.notes || "N/A"}
                    </p>

                    <div className="flex items-center gap-2">

                      <MapPin size={16} />

                      {request.location}

                    </div>

                  </div>


                  {/* DONOR BUTTON */}
                  <button
onClick={() =>
  openDonorModal(
    request.matchedDonors,
    request._id
  )
}
                    className="mt-6 bg-blue-50 hover:bg-blue-100 transition-all text-blue-700 px-5 py-3 rounded-2xl font-black flex items-center gap-2"
                  >

                    <Users size={18} />

                    View Donors (
                    {
                      request.matchedDonors
                        ?.length
                    }
                    )

                  </button>

                </div>


                {/* ACTIONS */}
                <div className="flex flex-col gap-3">

                  <button
                    onClick={() =>
                      updateStatus(
                        request._id,
                        "fulfilled"
                      )
                    }
                    className="bg-emerald-50 hover:bg-emerald-100 transition-all text-emerald-700 px-5 py-3 rounded-2xl flex items-center gap-2 font-black"
                  >

                    <CheckCircle2
                      size={18}
                    />

                    Fulfilled

                  </button>


                  <button
                    onClick={() =>
                      updateStatus(
                        request._id,
                        "cancelled"
                      )
                    }
                    className="bg-yellow-50 hover:bg-yellow-100 transition-all text-yellow-700 px-5 py-3 rounded-2xl flex items-center gap-2 font-black"
                  >

                    <XCircle size={18} />

                    Cancel

                  </button>


                  <button
                    onClick={() =>
                      deleteRequest(
                        request._id
                      )
                    }
                    className="bg-red-50 hover:bg-red-100 transition-all text-red-700 px-5 py-3 rounded-2xl flex items-center gap-2 font-black"
                  >

                    <Trash2 size={18} />

                    Delete

                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>


        {/* ====================================================== */}
        {/* CREATE REQUEST MODAL */}
        {/* ====================================================== */}

        {showModal && (

          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">

            <div className="bg-white rounded-3xl w-full max-w-2xl p-10">

              <div className="flex items-center justify-between mb-8">

                <h2 className="text-3xl font-black text-gray-900">
                  Create Emergency Request
                </h2>

                <button
                  onClick={() =>
                    setShowModal(false)
                  }
                  className="text-3xl text-gray-400 hover:text-gray-700"
                >
                  ×
                </button>

              </div>


              <form
                onSubmit={
                  handleCreateRequest
                }
                className="space-y-6"
              >

                <input
                  type="text"
                  placeholder="Patient Name"
                  required
                  value={
                    formData.patientName
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      patientName:
                        e.target.value
                    })
                  }
                  className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none"
                />


                <select
                  value={
                    formData.bloodGroup
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      bloodGroup:
                        e.target.value
                    })
                  }
                  className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none"
                >

                  {[
                    "A+",
                    "A-",
                    "B+",
                    "B-",
                    "AB+",
                    "AB-",
                    "O+",
                    "O-"
                  ].map((group) => (

                    <option key={group}>
                      {group}
                    </option>

                  ))}

                </select>


                <input
                  type="number"
                  min="1"
                  placeholder="Units Needed"
                  value={
                    formData.unitsNeeded
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      unitsNeeded:
                        e.target.value
                    })
                  }
                  className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none"
                />


                <select
                  value={
                    formData.urgency
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      urgency:
                        e.target.value
                    })
                  }
                  className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none"
                >

                  <option value="normal">
                    Normal
                  </option>

                  <option value="urgent">
                    Urgent
                  </option>

                  <option value="critical">
                    Critical
                  </option>

                </select>


                <textarea
                  rows="4"
                  placeholder="Additional Notes"
                  value={
                    formData.notes
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      notes:
                        e.target.value
                    })
                  }
                  className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none resize-none"
                />


                <button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 transition-all text-white py-4 rounded-2xl font-black"
                >
                  Create Emergency Request
                </button>

              </form>

            </div>

          </div>

        )}


        {/* ====================================================== */}
        {/* DONOR MODAL */}
        {/* ====================================================== */}

        {showDonorModal && (

          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">

            <div className="bg-white rounded-3xl w-full max-w-4xl p-8">

              <div className="flex items-center justify-between mb-8">

                <h2 className="text-3xl font-black text-gray-900">
                  Matched Donors
                </h2>

                <button
                  onClick={() =>
                    setShowDonorModal(false)
                  }
                  className="text-3xl text-gray-400 hover:text-gray-700"
                >
                  ×
                </button>

              </div>


              <div className="space-y-4 max-h-[500px] overflow-y-auto">

                {selectedDonors.map(
                  (donor) => (

                    <div
  key={donor._id}
  className="border border-gray-200 rounded-2xl p-6 flex items-center justify-between"
>

  <div>

    <h3 className="text-xl font-black text-gray-900">
      {donor.name}
    </h3>

    <div className="flex items-center gap-5 mt-3 text-gray-500">

      <div className="flex items-center gap-2">

        <Droplet size={15} />

        {donor.bloodGroup}

      </div>

      <div className="flex items-center gap-2">

        <Phone size={15} />

        {donor.phone}

      </div>

      <div className="flex items-center gap-2">

        <MapPin size={15} />

        {donor.location}

      </div>

    </div>

  </div>

  <button
onClick={() =>
  completeDonation(
    selectedRequestId,
    donor._id
  )
}
    className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-black"
  >
    Complete Donation
  </button>

</div>

                  )
                )}

              </div>

            </div>

          </div>

        )}

      </div>

    </div>

  );

};

export default HospitalDashboard;

