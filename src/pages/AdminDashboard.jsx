import React from "react";

import Sidebar from "../components/admin/Sidebar";
import Topbar from "../components/admin/Topbar";
import WelcomeBanner from "../components/admin/WelcomeBanner";
import StatsGrid from "../components/admin/StatsGrid";
import QuickActions from "../components/admin/QuickActions";
import RecentActivity from "../components/admin/RecentActivity";

import BloodDemandChart
from "../components/BloodDemandChart";

const AdminDashboard = () => {

  return (

    <div className="flex min-h-screen bg-gray-100">

      <Sidebar/>

      <main className="flex-1 p-8 space-y-8">

        <Topbar/>

        <WelcomeBanner/>

        <StatsGrid/>

        <div className="grid lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-md">

            <h2 className="text-2xl font-black mb-6">

              Blood Demand Analytics

            </h2>

            <BloodDemandChart/>

          </div>

          <QuickActions/>

        </div>

        <RecentActivity/>

      </main>

    </div>

  );

};

export default AdminDashboard;