import {
  Building2,
  MapPin,
  Mail,
  Phone,
  Eye,
  Pencil,
  Ban,
} from "lucide-react";

const HospitalsTable = ({ hospitals, loading }) => {
  const getStatus = (hospital) => {
    if (hospital.isBlocked) {
      return {
        label: "Blocked",
        className: "bg-red-100 text-red-700",
      };
    }

    if (hospital.isVerified) {
      return {
        label: "Verified",
        className: "bg-green-100 text-green-700",
      };
    }

    return {
      label: "Pending",
      className: "bg-yellow-100 text-yellow-700",
    };
  };

  if (loading) {
    return (
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-20 text-center">
        <h2 className="text-xl font-bold text-gray-600">
          Loading Hospitals...
        </h2>
      </div>
    );
  }

  if (hospitals.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-20 text-center">

        <Building2
          size={60}
          className="mx-auto text-gray-300 mb-6"
        />

        <h2 className="text-3xl font-black text-gray-900">
          No Hospitals Found
        </h2>

        <p className="text-gray-500 mt-3">
          Registered hospitals will appear here.
        </p>

      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">

      {/* Header */}

      <div className="grid grid-cols-12 px-8 py-5 bg-gray-50 border-b border-gray-200 text-sm font-bold uppercase tracking-wider text-gray-500">

        <div className="col-span-4">Hospital</div>

        <div className="col-span-2">Location</div>

        <div className="col-span-2">Status</div>

        <div className="col-span-2">Registered</div>

        <div className="col-span-2 text-center">Actions</div>

      </div>

      {hospitals.map((hospital) => {

        const status = getStatus(hospital);

        return (

          <div
            key={hospital._id}
            className="
              grid
              grid-cols-12
              items-center
              px-8
              py-6
              border-b
              border-gray-100
              hover:bg-red-50/40
              transition-all
            "
          >

            {/* Hospital */}

            <div className="col-span-4 flex items-center gap-5">

              <div
                className="
                  w-16
                  h-16
                  rounded-2xl
                  bg-gradient-to-br
                  from-red-500
                  to-red-600
                  flex
                  items-center
                  justify-center
                  shadow-md
                "
              >

                <Building2
                  size={28}
                  className="text-white"
                />

              </div>

              <div>

                <h3 className="font-black text-lg text-gray-900">
                  {hospital.name}
                </h3>

                <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">

                  <Mail size={15} />

                  {hospital.email}

                </div>

                <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">

                  <Phone size={15} />

                  {hospital.phone || "Not Available"}

                </div>

              </div>

            </div>

            {/* Location */}

            <div className="col-span-2">

              <div className="flex items-center gap-2 text-gray-700">

                <MapPin size={16} />

                {hospital.location || "N/A"}

              </div>

            </div>

            {/* Status */}

            <div className="col-span-2">

              <span
                className={`
                  px-4
                  py-2
                  rounded-full
                  text-sm
                  font-semibold
                  ${status.className}
                `}
              >
                {status.label}
              </span>

            </div>

            {/* Registered Date */}

            <div className="col-span-2 text-gray-500">

              {new Date(
                hospital.createdAt
              ).toLocaleDateString()}

            </div>

            {/* Actions */}

            <div className="col-span-2 flex justify-center gap-3">

              {/* View */}

              <button
                className="
                  w-10
                  h-10
                  rounded-xl
                  bg-blue-50
                  text-blue-600
                  hover:bg-blue-600
                  hover:text-white
                  transition-all
                "
              >
                <Eye
                  size={18}
                  className="mx-auto"
                />
              </button>

              {/* Edit */}

              <button
                className="
                  w-10
                  h-10
                  rounded-xl
                  bg-yellow-50
                  text-yellow-600
                  hover:bg-yellow-500
                  hover:text-white
                  transition-all
                "
              >
                <Pencil
                  size={18}
                  className="mx-auto"
                />
              </button>

              {/* Block */}

              <button
                className={`
                  w-10
                  h-10
                  rounded-xl
                  transition-all
                  ${
                    hospital.isBlocked
                      ? "bg-green-50 text-green-600 hover:bg-green-600 hover:text-white"
                      : "bg-red-50 text-red-600 hover:bg-red-600 hover:text-white"
                  }
                `}
              >
                <Ban
                  size={18}
                  className="mx-auto"
                />
              </button>

            </div>

          </div>

        );
      })}
    </div>
  );
};

export default HospitalsTable;