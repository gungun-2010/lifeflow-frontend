console.log("🔥 DASHBOARD COMPONENT LOADED");
import React, { useState, useEffect } from 'react';
import { Toaster, toast } from "sonner";
import socket from "../socket";
import {
  Heart,
  Droplets,
  Trophy,
  Bell,
  ArrowRight,
  LayoutGrid,
  Search,
  MapPin,
  Activity,
  Menu,
  Clock3,
  ShieldCheck
} from 'lucide-react';

import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  useEffect(() => {

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  if (!user) return;

  const userId =
    user._id || user.id;

  console.log(
    "✅ REGISTERING USER:",
    userId
  );

  socket.emit(
    "registerUser",
    userId
  );

}, []);

  const [user] = useState(() => {
    try {
      const saved = localStorage.getItem('user');
      if (!saved || saved === "undefined") return null;
      return JSON.parse(saved);
    } catch (e) {
      console.error("Auth Error:", e);
      return null;
    }
  });

  const [requests, setRequests] = useState([]);
  const [hospitalFeed, setHospitalFeed] = useState([]);
  const [loading, setLoading] = useState(true);

  const [liveStats, setLiveStats] = useState({
    contributions: 0,
    pending: 0,
    demandRank: '#12'
  });

  const [activeCompatibility, setActiveCompatibility] = useState(
    user?.bloodGroup || 'O+'
  );

  useEffect(() => {

  socket.on(
    "newNotification",
    (data) => {

      console.log(
        "🚨 REALTIME ALERT:",
        data
      );

      toast.error(
        data.message,
        {
          duration: 10000
        }
      );

    }
  );

  return () => {

    socket.off(
      "newNotification"
    );

  };

}, []);

  const compatibilityMap = {
    'A+': { give: ['A+', 'AB+'], receive: ['A+', 'A-', 'O+', 'O-'] },
    'A-': { give: ['A+', 'A-', 'AB+', 'AB-'], receive: ['A-', 'O-'] },
    'B+': { give: ['B+', 'AB+'], receive: ['B+', 'B-', 'O+', 'O-'] },
    'B-': { give: ['B+', 'B-', 'AB+', 'AB-'], receive: ['B-', 'O-'] },
    'AB+': { give: ['AB+'], receive: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] },
    'AB-': { give: ['AB+', 'AB-'], receive: ['A-', 'B-', 'AB-', 'O-'] },
    'O+': { give: ['A+', 'B+', 'AB+', 'O+'], receive: ['O+', 'O-'] },
    'O-': { give: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], receive: ['O-'] },
  };

  useEffect(() => {
    const fetchDashboardData = async () => {

      if (!user) return;

      try {

        const userId = user._id || user.id;

        const [privateRes, hospitalRes, statsRes] = await Promise.all([
          axios.get(`http://localhost:5001/api/requests/my-requests/${userId}`),
          axios.get(`http://localhost:5001/api/requests/hospital/all`),
          axios.get(`http://localhost:5001/api/requests/stats/demand`)
            .catch(() => null)
        ]);

        if (privateRes?.data?.success) {
          setRequests(privateRes.data.requests || []);
        }

        if (hospitalRes?.data?.success) {
          setHospitalFeed(hospitalRes.data.requests || []);
        }

        if (statsRes?.data?.success) {
          setLiveStats({
            contributions: statsRes.data.totalContributions || 0,
            pending: statsRes.data.totalPending || 0,
            demandRank: statsRes.data.rank || '#12'
          });
        }

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();

  }, [user]);

  const handleAccept = async (id, type) => {

    try {

      const res = await axios.patch(
        `http://localhost:5001/api/requests/status/${type}/${id}`,
        {
          status: 'Accepted'
        }
      );

      if (res.data.success) {

        toast.success("Request Accepted");

        if (type === 'hospital') {
          setHospitalFeed(prev =>
            prev.filter(req => req._id !== id)
          );
        } else {
          setRequests(prev =>
            prev.filter(req => req._id !== id)
          );
        }

        setLiveStats(prev => ({
          ...prev,
          contributions: prev.contributions + 1
        }));
      }

    } catch (err) {
      toast.error("Failed to update request");
    }
  };

  if (!user) return <Navigate to="/login" replace />;

  const statsArr = [
    {
      label: 'Blood Group',
      value: user?.bloodGroup || 'N/A',
      icon: <Droplets className="text-red-600" size={20} />
    },
    {
      label: 'Contributions',
      value: liveStats.contributions,
      icon: <Heart className="text-red-600" size={20} />
    },
    {
      label: 'Pending',
      value: liveStats.pending,
      icon: <Bell className="text-red-600" size={20} />
    },
    {
      label: 'Network Rank',
      value: liveStats.demandRank,
      icon: <Trophy className="text-red-600" size={20} />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">

      <Toaster position="top-center" richColors />

      {/* SIDEBAR */}
      <aside className="hidden lg:flex w-72 bg-white border-r border-gray-200 flex-col px-6 py-8">

        {/* LOGO */}
        <div className="mb-12">

          <h1 className="text-2xl font-black tracking-tight text-gray-900">
            LifeFlow
          </h1>

          <p className="text-sm text-gray-500 mt-1 font-medium">
            Blood Donation Network
          </p>

        </div>

        {/* NAVIGATION */}
        <div className="space-y-2">

          <Link
            to="/dashboard"
            className="flex items-center gap-3 bg-red-600 text-white px-4 py-3 rounded-xl font-bold"
          >
            <LayoutGrid size={18} />
            Dashboard
          </Link>

          <Link
            to="/quiz"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100 transition"
          >
            <Activity size={18} />
            Eligibility Check
          </Link>

          <Link
            to="/centers"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100 transition"
          >
            <MapPin size={18} />
            Donation Centers
          </Link>

          <Link
            to="/profile"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100 transition"
          >
            <ShieldCheck size={18} />
            My Profile
          </Link>

        </div>

        {/* SIDEBAR FOOTER */}
        <div className="mt-auto bg-red-50 border border-red-100 rounded-2xl p-5">

          <p className="text-xs uppercase tracking-widest text-red-600 font-bold mb-2">
            Your Impact
          </p>

          <h3 className="text-3xl font-black text-gray-900">
            {liveStats.contributions}
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            Lives supported through donations
          </p>

        </div>

      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1">

        {/* TOP NAVBAR */}
        <div className="bg-white border-b border-gray-200 px-6 md:px-10 py-5 sticky top-0 z-20">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-4">

              <button className="lg:hidden">
                <Menu className="text-gray-700" />
              </button>

              <div>
                <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                  Welcome back, {user?.name?.split(' ')[0]}
                </h2>

                <p className="text-gray-500 text-sm font-medium mt-1">
                  Monitor emergency requests in real-time
                </p>
              </div>

            </div>

            <div className="hidden md:flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-xl">

              <Search size={18} className="text-gray-400" />

              <input
                type="text"
                placeholder="Search requests..."
                className="bg-transparent outline-none text-sm"
              />

            </div>

          </div>

        </div>

        {/* CONTENT */}
        <div className="p-6 md:p-10">

          {/* STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

            {statsArr.map((s, i) => (

              <div
                key={i}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
              >

                <div className="flex items-center justify-between mb-5">

                  <div className="w-11 h-11 bg-red-50 rounded-xl flex items-center justify-center">
                    {s.icon}
                  </div>

                </div>

                <p className="text-sm font-bold text-gray-500 uppercase tracking-wide">
                  {s.label}
                </p>

                <h3 className="text-3xl font-black text-gray-900 mt-2">
                  {s.value}
                </h3>

              </div>

            ))}

          </div>

          {/* MAIN GRID */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">

            {/* LEFT SECTION */}
            <div className="xl:col-span-4 space-y-8">

              {/* COMPATIBILITY */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">

                <div className="flex items-center gap-3 mb-6">

                  <Droplets className="text-red-600" size={22} />

                  <h3 className="text-xl font-bold text-gray-900">
                    Blood Compatibility
                  </h3>

                </div>

                <div className="grid grid-cols-4 gap-2 mb-6">

                  {Object.keys(compatibilityMap).map(type => (

                    <button
                      key={type}
                      onClick={() => setActiveCompatibility(type)}
                      className={`py-2 rounded-lg text-sm font-bold transition
                        ${activeCompatibility === type
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                      {type}
                    </button>

                  ))}

                </div>

                {/* DONATE */}
                <div className="mb-5">

                  <p className="text-xs font-bold uppercase tracking-widest text-red-600 mb-3">
                    Can Donate To
                  </p>

                  <div className="flex flex-wrap gap-2">

                    {compatibilityMap[activeCompatibility]?.give.map(t => (

                      <span
                        key={t}
                        className="bg-red-50 text-red-700 px-3 py-2 rounded-lg text-sm font-bold"
                      >
                        {t}
                      </span>

                    ))}

                  </div>

                </div>

                {/* RECEIVE */}
                <div>

                  <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">
                    Can Receive From
                  </p>

                  <div className="flex flex-wrap gap-2">

                    {compatibilityMap[activeCompatibility]?.receive.map(t => (

                      <span
                        key={t}
                        className="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm font-bold"
                      >
                        {t}
                      </span>

                    ))}

                  </div>

                </div>

              </div>

              {/* QUICK INFO */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">

                <div className="flex items-center gap-3 mb-5">

                  <Clock3 className="text-red-600" size={22} />

                  <h3 className="text-xl font-bold text-gray-900">
                    Donation Reminder
                  </h3>

                </div>

                <p className="text-gray-600 leading-relaxed">
                  You become eligible to donate blood again after
                  the medically recommended interval period.
                </p>

              </div>

            </div>

            {/* RIGHT SECTION */}
            <div className="xl:col-span-8">

              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

                {/* HEADER */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">

                  <div>

                    <h3 className="text-2xl font-black text-gray-900">
                      Emergency Feed
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      Live emergency blood requests
                    </p>

                  </div>

                  <span className="bg-red-100 text-red-700 px-4 py-2 rounded-full text-xs font-bold">
                    LIVE
                  </span>

                </div>

                {/* FEED */}
                <div>

                  {loading ? (

                    <div className="p-20 text-center text-gray-400">
                      Loading emergency requests...
                    </div>

                  ) : (hospitalFeed.length > 0 || requests.length > 0) ? (

                    <>

                      {hospitalFeed.map((req) => (

                        <div
                          key={req._id}
                          className="px-6 py-5 border-b border-gray-100 hover:bg-gray-50 transition"
                        >

                          <div className="flex items-center justify-between">

                            <div className="flex items-center gap-5">

                              <div className="w-14 h-14 bg-red-600 text-white rounded-xl flex items-center justify-center font-black text-lg">
                                {req.bloodGroup || 'O+'}
                              </div>

                              <div>

                                <h4 className="font-bold text-gray-900 text-lg">
                                  {req.hospitalName || 'Emergency Hospital'}
                                </h4>

                                <p className="text-sm text-gray-500 mt-1">
                                  {req.location || 'Mandi'} • {req.unitsNeeded || 1} Units Required
                                </p>

                              </div>

                            </div>

                            <button
                              onClick={() => handleAccept(req._id, 'hospital')}
                              className="bg-red-600 hover:bg-red-700 transition px-5 py-3 rounded-xl text-white font-bold text-sm"
                            >
                              Accept
                            </button>

                          </div>

                        </div>

                      ))}

                      {requests.map((req) => (

                        <div
                          key={req._id}
                          className="px-6 py-5 border-b border-gray-100 hover:bg-gray-50 transition"
                        >

                          <div className="flex items-center justify-between">

                            <div className="flex items-center gap-5">

                              <div className="w-14 h-14 bg-gray-100 text-gray-700 rounded-xl flex items-center justify-center font-black text-lg">
                                {req.bloodGroup || 'O+'}
                              </div>

                              <div>

                                <h4 className="font-bold text-gray-900 text-lg">
                                  {req.requesterName || 'Direct Request'}
                                </h4>

                                <p className="text-sm text-gray-500 mt-1">
                                  Status: {req.status || 'Pending'}
                                </p>

                              </div>

                            </div>

                            <button
                              onClick={() => handleAccept(req._id, 'individual')}
                              className="border border-gray-200 hover:bg-gray-100 transition px-5 py-3 rounded-xl text-gray-900 font-bold text-sm"
                            >
                              View
                            </button>

                          </div>

                        </div>

                      ))}

                    </>

                  ) : (

                    <div className="py-24 text-center">

                      <Search
                        className="mx-auto text-gray-200 mb-5"
                        size={60}
                      />

                      <h4 className="text-xl font-bold text-gray-700">
                        No Active Emergencies
                      </h4>

                      <p className="text-gray-500 mt-2">
                        Everything looks stable right now.
                      </p>

                    </div>

                  )}

                </div>

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
};

export default Dashboard;

