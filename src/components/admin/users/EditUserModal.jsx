import React, { useEffect, useState } from "react";
import API from "../../../api/axios";
import { X } from "lucide-react";

const EditUserModal = ({
  open,
  onClose,
  user,
  onUserUpdated,
}) => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    bloodGroup: "",
    role: "",
    isBlocked: false,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {

    if (user) {

      setFormData({

        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        location: user.location || "",
        bloodGroup: user.bloodGroup || "",
        role: user.role || "",
        isBlocked: user.isBlocked || false,

      });

    }

  }, [user]);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  const handleStatusChange = (e) => {

    setFormData((prev) => ({
      ...prev,
      isBlocked: e.target.value === "blocked",
    }));

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const res = await API.put(
        `/admin/users/${user._id}`,
        formData
      );

      if (res.data.success) {

        alert("User updated successfully!");

        onUserUpdated();

        onClose();

      }

    } catch (error) {
  console.error("Update Error:", error);

  if (error.response) {
    console.log("Status:", error.response.status);
    console.log("Data:", error.response.data);

    alert(error.response.data.message);
  } else {
    alert(error.message);
  }
}finally {

      setLoading(false);

    }

  };

  if (!open || !user) return null;

  return (

    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl p-8 relative">

        <button
          onClick={onClose}
          className="absolute right-6 top-6"
        >
          <X />
        </button>

        <h2 className="text-3xl font-black mb-8">
          Edit User
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>

            <label className="font-semibold">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 mt-2"
            />

          </div>

          <div>

            <label className="font-semibold">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 mt-2"
            />

          </div>

          <div className="grid grid-cols-2 gap-5">

            <div>

              <label className="font-semibold">
                Phone
              </label>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3 mt-2"
              />

            </div>

            <div>

              <label className="font-semibold">
                Location
              </label>

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3 mt-2"
              />

            </div>

          </div>

          <div className="grid grid-cols-2 gap-5">

{formData.role === "donor" && (

  <div>

    <label className="font-semibold">
      Blood Group
    </label>

    <select
      name="bloodGroup"
      value={formData.bloodGroup}
      onChange={handleChange}
      className="w-full border rounded-xl px-4 py-3 mt-2"
    >

      <option value="">Select</option>

      <option>A+</option>
      <option>A-</option>
      <option>B+</option>
      <option>B-</option>
      <option>AB+</option>
      <option>AB-</option>
      <option>O+</option>
      <option>O-</option>

    </select>

  </div>

)}

            <div>

              <label className="font-semibold">
                Role
              </label>

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3 mt-2"
              >

                <option value="donor">
                  Donor
                </option>

                <option value="hospital">
                  Hospital
                </option>

                <option value="admin">
                  Admin
                </option>

              </select>

            </div>

          </div>

          <div>

            <label className="font-semibold">
              Account Status
            </label>

            <select
              value={
                formData.isBlocked
                  ? "blocked"
                  : "active"
              }
              onChange={handleStatusChange}
              className="w-full border rounded-xl px-4 py-3 mt-2"
            >

              <option value="active">
                Active
              </option>

              <option value="blocked">
                Blocked
              </option>

            </select>

          </div>

          <div className="flex justify-end gap-4 pt-6">

            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-xl border"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold"
            >

              {loading
                ? "Saving..."
                : "Save Changes"}

            </button>

          </div>

        </form>

      </div>

    </div>

  );

};

export default EditUserModal;


