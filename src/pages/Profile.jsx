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
  Clock3,
  Phone,
  User
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
            <h1 className="text-6xl font-black tracking-tight text-gray-900">
              Profile Overview
            </h1>
          </div>

          <button
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            className="bg-gradient-to-br
from-red-600
to-red-700 hover:bg-red-700 transition-all text-white px-6 py-3 rounded-2xl font-black flex items-center gap-2 shadow-sm"
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
          
  {/* LEFT PROFILE CARD */}

<div className="xl:col-span-3">

  <div className="
    bg-white
    rounded-[32px]
    border
    border-gray-200
    shadow-sm
    overflow-hidden
  ">

    {/* Cover */}

    <div className="h-24 bg-gradient-to-r from-red-50 via-rose-50 to-white"></div>

    {/* Profile */}

    <div className="px-8 pb-8 -mt-12">

      {/* Avatar */}

      <div className="
        w-28
        h-28
        rounded-3xl
        bg-white
        border-4
        border-white
        shadow-lg
        flex
        items-center
        justify-center
        mx-auto
      ">

        <div className="
          w-full
          h-full
          rounded-2xl
          bg-red-50
          flex
          items-center
          justify-center
        ">

          <span className="text-4xl font-black text-red-600">

            {userData?.name?.charAt(0).toUpperCase()}

          </span>

        </div>

      </div>

      {/* Name */}

      <div className="text-center mt-6">

        <h2 className="text-[38px] font-black text-gray-900">

          {userData?.name}

        </h2>

        <p className="text-gray-500 mt-2">

          Verified Blood Donor

        </p>

      </div>

      {/* Badges */}

      <div className="flex justify-center gap-3 mt-6">

        <div className="
          bg-red-50
          text-red-600
          px-4
          py-2
          rounded-full
          text-sm
          font-bold
        ">

          🩸 {userData?.bloodGroup}

        </div>

        <div className="
          bg-emerald-50
          text-emerald-700
          px-4
          py-2
          rounded-full
          text-sm
          font-bold
          flex
          items-center
          gap-2
        ">

          <ShieldCheck size={15}/>

          Verified

        </div>

      </div>

      {/* Divider */}

      <div className="border-t border-gray-100 my-8"></div>

      {/* Details */}

      <div className="space-y-6">

        {/* Email */}

        <div className="flex gap-4">

          <div className="
            w-11
            h-11
            rounded-xl
            bg-gray-100
            flex
            items-center
            justify-center
          ">

            <Mail
              size={18}
              className="text-gray-500"
            />

          </div>

          <div>

            <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">

              Email

            </p>

            <p className="font-semibold text-gray-900 break-all">

              {userData?.email}

            </p>

          </div>

        </div>

        {/* Phone */}

        <div className="flex gap-4">

          <div className="
            w-11
            h-11
            rounded-xl
            bg-gray-100
            flex
            items-center
            justify-center
          ">

            <Phone
              size={18}
              className="text-gray-500"
            />

          </div>

          <div className="w-full">

            <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">

              Phone

            </p>

            {isEditing ? (

              <input

                value={userData?.phone || ""}

                onChange={(e)=>

                  setUserData({

                    ...userData,

                    phone:e.target.value

                  })

                }

                className="
                  mt-1
                  w-full
                  border
                  border-gray-200
                  rounded-xl
                  px-4
                  py-2
                  outline-none
                  focus:border-red-500
                "

              />

            ) : (

              <p className="font-semibold text-gray-900">

                {userData?.phone || "Not Added"}

              </p>

            )}

          </div>

        </div>

        {/* Location */}

        <div className="flex gap-4">

          <div className="
            w-11
            h-11
            rounded-xl
            bg-gray-100
            flex
            items-center
            justify-center
          ">

            <MapPin
              size={18}
              className="text-gray-500"
            />

          </div>

          <div className="w-full">

            <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">

              Location

            </p>

            {isEditing ? (

              <input

                value={userData?.location || ""}

                onChange={(e)=>

                  setUserData({

                    ...userData,

                    location:e.target.value

                  })

                }

                className="
                  mt-1
                  w-full
                  border
                  border-gray-200
                  rounded-xl
                  px-4
                  py-2
                  outline-none
                  focus:border-red-500
                "

              />

            ) : (

              <p className="font-semibold text-gray-900">

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
            
{/* PROFILE INSIGHTS */}

<div className="grid grid-cols-2 xl:grid-cols-5 gap-8">

  {/* Donations */}

  <div className="
    bg-white
    border
    border-gray-200
    rounded-[28px]
    p-7
    hover:shadow-lg
    transition-all
    duration-300
  ">

    <div className="flex items-center justify-between">

      <Heart
        className="text-red-600"
        size={22}
      />

      <span className="text-xs font-bold uppercase tracking-widest text-gray-400">

        Donations

      </span>

    </div>

    <h2 className="text-5xl font-black mt-8 text-gray-900">

      {userData?.totalDonations || 0}

    </h2>

    <p className="mt-3 text-gray-500 font-medium">

      Lifetime Donations

    </p>

  </div>

  {/* Lives Saved */}

  <div className="
    bg-white
    border
    border-gray-200
    rounded-[28px]
    p-7
    hover:shadow-lg
    transition-all
  ">

    <div className="flex items-center justify-between">

      <ShieldCheck
        className="text-emerald-600"
        size={22}
      />

      <span className="text-xs uppercase tracking-widest font-bold text-gray-400">

        Impact

      </span>

    </div>

    <h2 className="text-5xl font-black mt-8 text-gray-900">

      {(userData?.totalDonations || 0) * 3}

    </h2>

    <p className="mt-3 text-gray-500 font-medium">

      Estimated Lives Saved

    </p>

  </div>

  {/* Reward Points */}

  <div className="
    bg-white
    border
    border-gray-200
    rounded-[28px]
    p-7
    hover:shadow-lg
    transition-all
  ">

    <div className="flex items-center justify-between">

      <Activity
        className="text-blue-600"
        size={22}
      />

      <span className="text-xs uppercase tracking-widest font-bold text-gray-400">

        Rewards

      </span>

    </div>

    <h2 className="text-5xl font-black mt-8 text-gray-900">

      {userData?.rewardPoints || 0}

    </h2>

    <p className="mt-3 text-gray-500 font-medium">

      Reward Points

    </p>

  </div>

  {/* Next Eligible */}

  <div className="
    bg-white
    border
    border-gray-200
    rounded-[28px]
    p-7
    hover:shadow-lg
    transition-all
  ">

    <div className="flex items-center justify-between">

      <Clock3
        className="text-amber-600"
        size={22}
      />

      <span className="text-xs uppercase tracking-widest font-bold text-gray-400">

        Eligibility

      </span>

    </div>

    <h2 className="text-2xl font-black mt-8 text-gray-900 leading-tight">

      {userData?.nextEligibleDate
        ? new Date(
            userData.nextEligibleDate
          ).toLocaleDateString()
        : "Eligible Now"}

    </h2>

    <p className="mt-3 text-gray-500 font-medium">

      Next Donation

    </p>

  </div>

  {/* Badge */}

  <div className="
    bg-gradient-to-br
    from-red-600
    to-red-700
    rounded-[28px]
    p-7
    text-white
    shadow-lg
  ">

    <div className="flex items-center justify-between">

      <span className="text-3xl">

        🏆

      </span>

      <span className="text-xs uppercase tracking-widest font-bold text-red-100">

        Achievement

      </span>

    </div>

    <h2 className="text-3xl font-black mt-8">

      {getBadge(userData?.totalDonations || 0)}

    </h2>

    <p className="mt-3 text-red-100 font-medium">

      Current Donor Badge

    </p>

  </div>

</div>




{/* DONATION HISTORY */}

<div className="bg-white border border-gray-200 rounded-[32px] shadow-sm overflow-hidden">

  {/* Header */}

  <div className="flex items-center justify-between px-8 py-7 border-b border-gray-100">

    <div>

      <p className="text-xs uppercase tracking-[0.3em] font-black text-red-600 mb-2">

        Donation History

      </p>

      <h2 className="text-3xl font-black text-gray-900">

        Your Donation Journey

      </h2>

    </div>

    <div className="text-right">

      <p className="text-sm text-gray-500">

        Total Records

      </p>

      <h3 className="text-3xl font-black text-gray-900">

        {donationHistory.length}

      </h3>

    </div>

  </div>

  {/* Body */}

  {donationHistory.length > 0 ? (

    <div>

      {donationHistory.map((item, index) => (

        <div
          key={index}
          className="
            flex
            items-center
            justify-between
            px-8
            py-6
            border-b
            border-gray-100
            hover:bg-gray-50
            transition-all
            duration-200
          "
        >

          {/* Left */}

          <div className="flex items-center gap-5">

            <div className="
              w-14
              h-14
              rounded-2xl
              bg-red-50
              flex
              items-center
              justify-center
            ">

              <Heart
                size={22}
                className="text-red-600"
                fill="currentColor"
              />

            </div>

            <div>

              <h3 className="text-lg font-black text-gray-900">

                {item?.hospitalId?.name || "Unknown Hospital"}

              </h3>

              <p className="text-gray-500 mt-1">

                {new Date(
                  item.donationDate
                ).toLocaleDateString()}

              </p>

            </div>

          </div>

          {/* Center */}

          <div className="hidden md:block text-center">

            <p className="text-sm text-gray-500 mb-2">

              Blood Units

            </p>

            <h3 className="text-2xl font-black text-gray-900">

              {item.units}

            </h3>

          </div>

          {/* Status */}

          <div className="text-right">

            <div className="
              inline-flex
              items-center
              gap-2
              bg-emerald-50
              text-emerald-700
              px-4
              py-2
              rounded-full
              font-semibold
            ">

              <ShieldCheck size={16} />

              Completed

            </div>

          </div>

        </div>

      ))}

    </div>

  ) : (

    <div className="py-24 text-center">

      <div className="
        w-20
        h-20
        rounded-full
        bg-red-50
        flex
        items-center
        justify-center
        mx-auto
        mb-6
      ">

        <Heart
          size={34}
          className="text-red-600"
        />

      </div>

      <h3 className="text-2xl font-black text-gray-900">

        No Donations Yet

      </h3>

      <p className="mt-3 text-gray-500 max-w-md mx-auto">

        Your donation history will appear here after your
        first successful blood donation.

      </p>

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