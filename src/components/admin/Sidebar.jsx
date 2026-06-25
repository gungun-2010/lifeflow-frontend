import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Building2,
  Activity,
  FileBarChart2,
  Bell,
  Settings,
  LogOut
} from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();

  const menu = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/admin-dashboard"
    },
    {
      title: "Users",
      icon: <Users size={20} />,
      path: "/admin/users"
    },
    {
      title: "Hospitals",
      icon: <Building2 size={20} />,
      path: "/admin/hospitals"
    },
    {
      title: "Blood Requests",
      icon: <Activity size={20} />,
      path: "/admin/requests"
    },
    {
      title: "Reports",
      icon: <FileBarChart2 size={20} />,
      path: "/admin/reports"
    },
    {
      title: "Notifications",
      icon: <Bell size={20} />,
      path: "/admin/notifications"
    },
    {
      title: "Settings",
      icon: <Settings size={20} />,
      path: "/admin/settings"
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <aside className="w-72 h-screen bg-gray-900 text-white flex flex-col sticky top-0">

      <div className="p-8 border-b border-gray-700">

        <h1 className="text-3xl font-black">
          Life<span className="text-red-500">Flow</span>
        </h1>

        <p className="text-gray-400 mt-2">
          Admin Control Center
        </p>

      </div>

      <nav className="flex-1 mt-6 px-3">

        {menu.map((item) => (

          <NavLink
            key={item.title}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-5 py-4 rounded-xl mb-2 transition-all duration-200 ${
                isActive
                  ? "bg-red-600 text-white shadow-lg"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`
            }
          >
            {item.icon}
            <span className="font-semibold">
              {item.title}
            </span>
          </NavLink>

        ))}

      </nav>

      <div className="border-t border-gray-700 p-6">

        <div className="mb-6">

          <p className="text-sm text-gray-400">
            Logged in as
          </p>

          <p className="font-bold text-lg">
            Administrator
          </p>

          <div className="flex items-center gap-2 mt-2">

            <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>

            <span className="text-sm text-gray-300">
              Online
            </span>

          </div>

        </div>

        <button
          onClick={handleLogout}
          className="
            w-full
            flex
            items-center
            justify-center
            gap-3
            py-3
            rounded-xl
            bg-red-600
            hover:bg-red-700
            transition-all
            font-semibold
          "
        >
          <LogOut size={20} />
          Logout
        </button>

      </div>

    </aside>
  );
};

export default Sidebar;