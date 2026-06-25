import React, { useEffect, useState } from "react";

import API from "../../api/axios";

import DashboardCard from "./DashboardCard";

import {
  Users,
  Heart,
  Building2,
  Activity,
  Droplets,
  AlertTriangle
} from "lucide-react";

const StatsGrid = () => {

  const [stats, setStats] = useState(null);

  const fetchDashboard = async () => {

    try {

      const res =
        await API.get("/admin/dashboard");

      setStats(
        res.data.overview
      );

    } catch (error) {

      console.error(
        "Dashboard Error:",
        error
      );

    }

  };

  useEffect(() => {

    fetchDashboard();

  }, []);

  if (!stats)
    return (
      <div className="text-center py-20">
        Loading Dashboard...
      </div>
    );

  return (

    <div
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        gap-6
      "
    >

      <DashboardCard
        title="Total Users"
        value={stats.totalUsers}
        icon={<Users size={28} className="text-white" />}
        color="bg-blue-600"
      />

      <DashboardCard
        title="Donors"
        value={stats.totalDonors}
        icon={<Heart size={28} className="text-white" />}
        color="bg-red-600"
      />

      <DashboardCard
        title="Hospitals"
        value={stats.totalHospitals}
        icon={<Building2 size={28} className="text-white" />}
        color="bg-green-600"
      />

      <DashboardCard
        title="Active Requests"
        value={stats.activeRequests}
        icon={<Activity size={28} className="text-white" />}
        color="bg-orange-500"
      />

      <DashboardCard
        title="Completed Donations"
        value={stats.completedDonations}
        icon={<Droplets size={28} className="text-white" />}
        color="bg-pink-600"
      />

      <DashboardCard
        title="Pending Hospitals"
        value={stats.pendingHospitals}
        icon={<AlertTriangle size={28} className="text-white" />}
        color="bg-yellow-500"
      />

    </div>

  );

};

export default StatsGrid;