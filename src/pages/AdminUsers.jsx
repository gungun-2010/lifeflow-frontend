import React, { useEffect, useState } from "react";
import API from "../api/axios";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/admin/users");

      setUsers(res.data.users);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="p-10 text-xl font-semibold">
        Loading users...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-black text-gray-900">
          User Management
        </h1>

        <p className="text-gray-500 mt-2">
          Manage all registered donors, hospitals and administrators.
        </p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-md overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="text-left px-6 py-4">Name</th>

              <th className="text-left px-6 py-4">Email</th>

              <th className="text-left px-6 py-4">Phone</th>

              <th className="text-left px-6 py-4">Role</th>

              <th className="text-left px-6 py-4">Location</th>

              <th className="text-left px-6 py-4">Status</th>

            </tr>

          </thead>

          <tbody>

            {users.map((user) => (

              <tr
                key={user._id}
                className="border-b hover:bg-gray-50 transition-all"
              >

                <td className="px-6 py-5 font-semibold">
                  {user.name}
                </td>

                <td className="px-6 py-5">
                  {user.email}
                </td>

                <td className="px-6 py-5">
                  {user.phone}
                </td>

                <td className="px-6 py-5">

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold
                      ${
                        user.role === "admin"
                          ? "bg-purple-100 text-purple-700"
                          : user.role === "hospital"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }
                    `}
                  >
                    {user.role}
                  </span>

                </td>

                <td className="px-6 py-5">
                  {user.location}
                </td>

                <td className="px-6 py-5">

                  {user.isBlocked ? (

                    <span className="text-red-600 font-bold">
                      Blocked
                    </span>

                  ) : (

                    <span className="text-green-600 font-bold">
                      Active
                    </span>

                  )}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default AdminUsers;