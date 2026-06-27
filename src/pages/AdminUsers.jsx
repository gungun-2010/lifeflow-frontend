import {
  Eye,
  Pencil,
  Ban,
  Trash2,
  CheckCircle
} from "lucide-react";
import UserModal from "../components/admin/users/UserModal";
import EditUserModal from "../components/admin/users/EditUserModal";
import React, { useEffect, useState } from "react";
import API from "../api/axios";
import ConfirmActionModal from "../components/admin/users/ConfirmActionModal";
import UserPagination from "../components/admin/users/UserPagination";

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

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedActionUser, setSelectedActionUser] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [deleteUserData, setDeleteUserData] = useState(null);

  const [page, setPage] = useState(1);

const [pagination, setPagination] =
useState(null);

  const openStatusModal = (user) => {

  setSelectedActionUser(user);

  setConfirmOpen(true);

};

const openDeleteModal = (user) => {

  setDeleteUserData(user);

  setDeleteOpen(true);

};

const toggleUserStatus = async () => {

  try {

    await API.patch(

      `/admin/users/${selectedActionUser._id}/status`,

      {
        isBlocked: !selectedActionUser.isBlocked
      }

    );

    setConfirmOpen(false);

    fetchUsers();

  }

  catch (error) {

    console.error(error);

  }

};

const deleteUser = async () => {

  console.log("Delete function called");

  try {

    await API.delete(`/admin/users/${deleteUserData._id}`);

    console.log("User deleted");

    setDeleteOpen(false);

    fetchUsers();

  } catch (error) {

    console.error(error);

  }

};

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await API.get("/admin/users", {
       params:{

search,

role,

status,

page,

limit:10

},
      });

      setUsers(res.data.users);

setPagination(
  res.data.pagination
);
      setPagination(res.data.pagination);
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
}, [
search,
role,
status,
page
]);

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

        <div className="bg-white rounded-3xl shadow-md overflow-x-auto">

          <table className="min-w-[1350px] w-full">

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

<th className="text-center px-6 py-4 w-48">
  Actions
</th>

<th className="text-left px-6 py-4">
  Status
</th>

<th className="text-center px-6 py-4 w-52">
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

                    <td className="px-6 py-5 w-[260px]">
                      {user.email}
                    </td>

                    <td className="px-6 py-5 w-[260px]">
                      {user.phone}
                    </td>

                    <td className="px-6 py-5 w-[260px]">

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

<td className="px-6 py-5 w-[260px]">
  {user.location}
</td>

<td className="px-6 py-5 w-[260px]">

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

<td className="px-6 py-5 text-center">

  <div className="flex items-center justify-center gap-3">

    {/* View */}
    <button
      onClick={() => viewUser(user._id)}
      title="View User"
      className="
        w-10 h-10
        rounded-full
        bg-blue-50
        text-blue-600
        hover:bg-blue-600
        hover:text-white
        transition-all
        duration-200
      "
    >
      <Eye size={18} className="mx-auto" />
    </button>

    {/* Edit */}
    <button
      onClick={() => handleEdit(user._id)}
      title="Edit User"
      className="
        w-10 h-10
        rounded-full
        bg-amber-50
        text-amber-600
        hover:bg-amber-500
        hover:text-white
        transition-all
        duration-200
      "
    >
      <Pencil size={18} className="mx-auto" />
    </button>

    {/* Block / Unblock */}
    <button
      onClick={() => openStatusModal(user)}
      title={user.isBlocked ? "Unblock User" : "Block User"}
      className={`
        w-10 h-10
        rounded-full
        transition-all
        duration-200
        ${
          user.isBlocked
            ? "bg-green-50 text-green-600 hover:bg-green-600 hover:text-white"
            : "bg-red-50 text-red-600 hover:bg-red-600 hover:text-white"
        }
      `}
    >
      {user.isBlocked ? (
        <CheckCircle size={18} className="mx-auto" />
      ) : (
        <Ban size={18} className="mx-auto" />
      )}
    </button>

    {/* Delete */}
    <button
  title="Delete User"
  onClick={() => openDeleteModal(user)}
  className="
    w-10
    h-10
    rounded-full
    bg-gray-100
    text-gray-600
    hover:bg-red-600
    hover:text-white
    transition-all
    duration-200
  "
>
  <Trash2 size={18} className="mx-auto" />
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

      <UserPagination
  pagination={pagination}
  onPageChange={setPage}
/>

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

<ConfirmActionModal
  open={confirmOpen}
  title={
    selectedActionUser?.isBlocked
      ? "Unblock User"
      : "Block User"
  }
  message={
    selectedActionUser?.isBlocked
      ? `Allow ${selectedActionUser?.name} to login again?`
      : `Are you sure you want to block ${selectedActionUser?.name}? This user will no longer be able to login.`
  }
  confirmText={
    selectedActionUser?.isBlocked
      ? "Unblock"
      : "Block"
  }
  confirmColor={
    selectedActionUser?.isBlocked
      ? "bg-green-600 hover:bg-green-700"
      : "bg-red-600 hover:bg-red-700"
  }
  onConfirm={toggleUserStatus}
  onClose={() => setConfirmOpen(false)}
/>

<ConfirmActionModal
  open={deleteOpen}
  title="Delete User"
  message={`Are you sure you want to permanently delete ${deleteUserData?.name}? This action cannot be undone.`}
  confirmText="Delete"
  confirmColor="bg-red-600 hover:bg-red-700"
  onConfirm={deleteUser}
  onClose={() => setDeleteOpen(false)}
/>

    </div>

    
  );
};

export default AdminUsers;

