import React, { useState, useEffect } from "react";
import {
  Mail,
  MapPin,
  Droplet,
  Edit3,
  Save,
  ShieldCheck,
  Heart,
  Calendar,
  Activity,
  Clock3
} from "lucide-react";
import { toast } from "sonner";
import API from "../api/axios";

const Profile = () => {
  // ======================================================
  // STATES
  // ======================================================
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(null);
  const [donationHistory, setDonationHistory] = useState([]);

  // ======================================================
  // BADGE SYSTEM
  // ======================================================
  const getBadge = (donations) => {
    if (donations >= 30) return "🏆 Platinum";
    if (donations >= 15) return "🥇 Gold";
    if (donations >= 5) return "🥈 Silver";
    return "🥉 Bronze";
  };

  // ======================================================
  // FETCH PROFILE & HISTORY FROM BACKEND
  // ======================================================
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const localUser = JSON.parse(localStorage.getItem("user"));
        
        const res = await API.get(`/users/${localUser._id}`);
        console.log(res.data);
        setUserData(res.data.user);

        const donationRes = await API.get(`/donations/donor/${localUser._id}`);
        setDonationHistory(donationRes.data.history);
      } catch (error) {
        console.error("Profile Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // ======================================================
  // UPDATE PROFILE METHOD
  // ======================================================
  const handleSave = async () => {
    try {
      const res = await API.put(`/users/${userData._id}`, {
        name: userData.name,
        location: userData.location,
        phone: userData.phone
      });

      setUserData(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      toast.error("Update failed");
    }
  };

  // ======================================================
  // LOADING SCREEN LAYOUT
  // ======================================================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <h2 className="text-2xl font-black text-gray-700">
          Loading Profile...
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* TOP HEADER */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] font-black text-red-600 mb-3">
              Donor Account
            </p>
            <h1 className="text-5xl font-black tracking-tight text-gray-900">
              Profile Overview
            </h1>
          </div>

          <button
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            className="bg-red-600 hover:bg-red-700 transition-all text-white px-6 py-3 rounded-2xl font-black flex items-center gap-2 shadow-sm"
          >
            {isEditing ? (
              <>
                <Save size={18} />
                Save Changes
              </>
            ) : (
              <>
                <Edit3 size={18} />
                Edit Profile
              </>
            )}
          </button>
        </div>

        {/* MAIN LAYOUT CONTAINER */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          {/* LEFT SIDEBAR PANEL */}
          <div className="xl:col-span-3">
            <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
              
              {/* TOP HEADER DETAILS */}
              <div className="p-8 border-b border-gray-100">
                <div className="w-24 h-24 bg-red-50 rounded-3xl flex items-center justify-center mb-6">
                  <span className="text-4xl font-black text-red-600">
                    {userData?.name?.charAt(0)}
                  </span>
                </div>

                <h2 className="text-3xl font-black text-gray-900">
                  {userData?.name}
                </h2>
                <p className="text-gray-500 font-medium mt-2">
                  Verified Blood Donor
                </p>

                <div className="mt-5 inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl text-sm font-bold">
                  <ShieldCheck size={16} />
                  Verified Account
                </div>
              </div>

              {/* SIDEBAR DIVIDED LIST DETAILS */}
              <div className="divide-y divide-gray-100">
                
                {/* EMAIL INFOGRAPHIC */}
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <Mail size={18} className="text-gray-400 mt-1" />
                    <div>
                      <p className="text-xs uppercase tracking-widest font-black text-gray-400 mb-2">
                        Email Address
                      </p>
                      <p className="font-bold text-gray-900 break-all">
                        {userData?.email}
                      </p>
                    </div>
                  </div>
                </div>

                {/* BLOOD INFOGRAPHIC */}
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <Droplet size={18} className="text-red-500 mt-1" />
                    <div>
                      <p className="text-xs uppercase tracking-widest font-black text-gray-400 mb-2">
                        Blood Group
                      </p>
                      <p className="font-bold text-gray-900">
                        {userData?.bloodGroup}
                      </p>
                    </div>
                  </div>
                </div>

                {/* LOCATION INFOGRAPHIC WITH INLINE EDIT SWITCHING */}
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <MapPin size={18} className="text-gray-400 mt-1" />
                    <div className="w-full">
                      <p className="text-xs uppercase tracking-widest font-black text-gray-400 mb-2">
                        Location
                      </p>
                      {isEditing ? (
                        <input
                          value={userData?.location || ""}
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              location: e.target.value
                            })
                          }
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-red-500 font-bold"
                        />
                      ) : (
                        <p className="font-bold text-gray-900">
                          {userData?.location}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* RIGHT SIDE DATA VIEW CONTENT */}
          <div className="xl:col-span-9 space-y-8">
            
            {/* GRID STATUS PROFILE METRICS SECTION (5 COLUMNS GRID) */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-5">
              
              {/* METRIC CARD: TOTAL DONATIONS */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-5">
                  <Heart className="text-red-500" size={20} />
                  <Activity className="text-gray-300" size={18} />
                </div>
                <p className="text-sm text-gray-500 font-medium mb-2">
                  Total Donations
                </p>
                <h3 className="text-4xl font-black text-gray-900">
                  {userData?.totalDonations || 0}
                </h3>
              </div>

              {/* METRIC CARD: LIVES SUPPORTED */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-5">
                  <ShieldCheck className="text-emerald-600" size={20} />
                  <Activity className="text-gray-300" size={18} />
                </div>
                <p className="text-sm text-gray-500 font-medium mb-2">
                  Lives Supported
                </p>
                <h3 className="text-4xl font-black text-gray-900">
                  {(userData?.totalDonations || 0) * 3}
                </h3>
              </div>

              {/* METRIC CARD: REWARD POINTS */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-5">
                  <Calendar className="text-blue-600" size={20} />
                  <Activity className="text-gray-300" size={18} />
                </div>
                <p className="text-sm text-gray-500 font-medium mb-2">
                  Reward Points
                </p>
                <h3 className="text-4xl font-black text-gray-900">
                  {userData?.rewardPoints || 0}
                </h3>
              </div>

              {/* METRIC CARD: NEXT ELIGIBLE */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-5">
                  <Clock3 className="text-amber-600" size={20} />
                  <Activity className="text-gray-300" size={18} />
                </div>
                <p className="text-sm text-gray-500 font-medium mb-2">
                  Next Eligible
                </p>
                <h3 className="text-lg font-black text-gray-900">
                  {userData?.nextEligibleDate
                    ? new Date(userData.nextEligibleDate).toLocaleDateString()
                    : "Eligible Now"}
                </h3>
              </div>

              {/* METRIC CARD: GAMIFIED BADGES */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-2xl">🏆</span>
                  <Activity className="text-gray-300" size={18} />
                </div>
                <p className="text-sm text-gray-500 font-medium mb-2">
                  Current Badge
                </p>
                <h3 className="text-xl font-black text-gray-900">
                  {getBadge(userData?.totalDonations || 0)}
                </h3>
              </div>

            </div>

            {/* LOWER SUB-ROW ROW INFO BLOCKS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              
              {/* METRIC CARD: LAST DONATION TIME */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-5">
                  <Calendar className="text-green-600" size={20} />
                  <Activity className="text-gray-300" size={18} />
                </div>
                <p className="text-sm text-gray-500 font-medium mb-2">
                  Last Donation
                </p>
                <h3 className="text-lg font-black text-gray-900">
                  {userData?.lastDonated
                    ? new Date(userData.lastDonated).toLocaleDateString()
                    : "Never"}
                </h3>
              </div>

            </div>

            {/* REAL DONATION LOG ACTIVITY TABLE LAYOUT */}
            <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
              
              {/* TABLE MODULE LABELS HEADER */}
              <div className="px-8 py-6 border-b border-gray-100">
                <p className="text-xs uppercase tracking-[0.3em] font-black text-red-600 mb-3">
                  Donation Activity
                </p>
                <h2 className="text-3xl font-black text-gray-900">
                  Donation History
                </h2>
              </div>

              {/* CORE TABLE COLUMN COLUMNS FIELD SCHEMES */}
              <div className="grid grid-cols-12 gap-4 px-8 py-4 bg-gray-50 border-b border-gray-100">
                <div className="col-span-3 text-xs uppercase tracking-widest font-black text-gray-400">
                  Date
                </div>
                <div className="col-span-4 text-xs uppercase tracking-widest font-black text-gray-400">
                  Location
                </div>
                <div className="col-span-2 text-xs uppercase tracking-widest font-black text-gray-400">
                  Units
                </div>
                <div className="col-span-3 text-xs uppercase tracking-widest font-black text-gray-400 text-right">
                  Status
                </div>
              </div>

              {/* RE-RENDER MAP DOM MATRIX ARRAY LOGIC */}
              {donationHistory.length > 0 ? (
                donationHistory.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-12 gap-4 px-8 py-6 border-b border-gray-100 items-center hover:bg-gray-50 transition-all"
                  >
                    <div className="col-span-3">
                      <p className="font-black text-gray-900">
                        {new Date(item.donationDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="col-span-4">
                      <p className="font-bold text-gray-900">
                        {item?.hospitalId?.name || "Unknown Location"}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="font-bold text-gray-900">
                        {item.units}
                      </p>
                    </div>
                    <div className="col-span-3 flex justify-end">
                      <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl text-sm font-black">
                        Completed
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-8 py-12 text-center text-gray-400 font-bold">
                  No records found in database
                </div>
              )}

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;