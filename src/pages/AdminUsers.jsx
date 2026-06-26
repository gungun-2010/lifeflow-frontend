import UserModal from "../components/admin/users/UserModal";
import EditUserModal from "../components/admin/users/EditUserModal";
import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { Eye, Pencil, Ban, Trash2 } from "lucide-react";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");

  const [selectedUser, setSelectedUser] = useState(null);

  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await API.get("/admin/users", {
        params: {
          search,
          role,
          status,
        },
      });

      setUsers(res.data.users);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

const viewUser = async (id) => {

  const handleEdit = (user) => {
  setEditUser(user);
  setEditModal(true);
};

  console.log("Clicked View:", id);

  try {

    const res = await API.get(`/admin/users/${id}`);

    console.log("Response:", res.data);

    setSelectedUser(res.data.user);

    setOpenModal(true);

  } catch (error) {

    console.error(error);

  }

};

const handleEdit = async (id) => {

  try {

    const res = await API.get(`/admin/users/${id}`);

    setEditUser(res.data.user);

    setEditModal(true);

  } catch (error) {

    console.error(error);

  }

};

useEffect(() => {
  fetchUsers();
}, [search, role, status]);

console.log("openModal:", openModal);
console.log("selectedUser:", selectedUser);

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

      {/* Search + Filters */}

      <div className="bg-white rounded-3xl shadow-md p-6 mb-8">

        <div className="grid md:grid-cols-3 gap-4">

          <input
            type="text"
            placeholder="Search by name, email or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              border
              border-gray-300
              rounded-xl
              px-4
              py-3
              outline-none
              focus:ring-2
              focus:ring-red-500
            "
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="
              border
              border-gray-300
              rounded-xl
              px-4
              py-3
            "
          >
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="hospital">Hospital</option>
            <option value="donor">Donor</option>
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="
              border
              border-gray-300
              rounded-xl
              px-4
              py-3
            "
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
          </select>

        </div>

      </div>

      {/* Loading */}

      {loading ? (

        <div className="bg-white rounded-3xl shadow-md p-12 text-center">

          <h2 className="text-xl font-semibold">
            Loading users...
          </h2>

        </div>

      ) : (

        <div className="bg-white rounded-3xl shadow-md overflow-hidden">

          <table className="w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="text-left px-6 py-4">
                  Name
                </th>

                <th className="text-left px-6 py-4">
                  Email
                </th>

                <th className="text-left px-6 py-4">
                  Phone
                </th>

                <th className="text-left px-6 py-4">
                  Role
                </th>

                <th className="text-left px-6 py-4">
                  Location
                </th>

<th className="text-left px-6 py-4">
  Status
</th>

<th className="text-left px-6 py-4">
  Actions
</th>

              </tr>

            </thead>

            <tbody>

              {users.length === 0 ? (

                <tr>

                  <td
                    colSpan="7"
                    className="
                      text-center
                      py-10
                      text-gray-500
                    "
                  >

                    No users found.

                  </td>

                </tr>

              ) : (

                users.map((user) => (

                  <tr
                    key={user._id}
                    className="
                      border-b
                      hover:bg-gray-50
                      transition-all
                    "
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
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          user.role === "admin"
                            ? "bg-purple-100 text-purple-700"
                            : user.role === "hospital"
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
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

<td className="px-6 py-5">

<div className="flex items-center gap-2">

  {/* View */}

  <button
    onClick={() => viewUser(user._id)}
    className="
      bg-blue-600
      hover:bg-blue-700
      text-white
      px-3
      py-2
      rounded-lg
    "
  >
    View
  </button>

  {/* Edit */}

  <button
    onClick={() => handleEdit(user._id)}
    className="
      bg-yellow-500
      hover:bg-yellow-600
      text-white
      px-3
      py-2
      rounded-lg
    "
  >
    Edit
  </button>


    {/* Block */}
    <button
      className="
        p-2
        rounded-lg
        bg-red-100
        hover:bg-red-200
        text-red-700
        transition-all
      "
    >
      <Ban size={18} />
    </button>

    {/* Delete */}
    <button
      className="
        p-2
        rounded-lg
        bg-gray-200
        hover:bg-gray-300
        text-gray-700
        transition-all
      "
    >
      <Trash2 size={18} />
    </button>

  </div>

</td>
                    

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

  )}

      <UserModal
        open={openModal}
        user={selectedUser}
        onClose={() => setOpenModal(false)}
      />

      <EditUserModal
  open={editModal}
  user={editUser}
  onClose={() => setEditModal(false)}
  onUserUpdated={fetchUsers}
/>

    </div>
  );
};

export default AdminUsers;

