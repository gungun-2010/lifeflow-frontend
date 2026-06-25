import React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import { Toaster } from "sonner";


// ======================================================
// COMPONENTS
// ======================================================

import Navbar from "./components/Navbar";

import ProtectedRoute from "./components/ProtectedRoute";


// ======================================================
// PUBLIC PAGES
// ======================================================

import Home from "./pages/Home";

import Login from "./pages/Login";

import Signup from "./pages/Signup";

import About from "./pages/About";

import Learn from "./pages/Learn";

import FindDonors from "./pages/FindDonors";

import EligibilityQuiz from "./pages/EligibilityQuiz";

import HeroHall from "./pages/HeroHall";

import Centers from "./pages/Centers";
import DonorDashboard from "./pages/DonorDashboard";
import BloodInventory from "./pages/BloodInventory";
import DonationHistory from "./pages/DonationHistory";

import HospitalAnalytics
from "./pages/HospitalAnalytics";
import HospitalDonations from "./pages/HospitalDonations";
import Notifications from "./pages/Notifications";

import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";



// ======================================================
// DONOR PAGES
// ======================================================

import Dashboard from "./pages/Dashboard";

import Profile from "./pages/Profile";

import RequestBlood from "./pages/RequestBlood";

import SentRequests from "./pages/SentRequests";


// ======================================================
// HOSPITAL / ADMIN PAGES
// ======================================================

import HospitalDashboard from "./pages/HospitalDashboard";
import Inventory from "./pages/Inventory";

import AdminPanel from "./pages/AdminPanel";


// ======================================================
// APP
// ======================================================

function App() {

  return (

    <Router>

      <div className="min-h-screen bg-gray-50 flex flex-col">

        {/* ====================================================== */}
        {/* GLOBAL TOASTER */}
        {/* ====================================================== */}

        <Toaster
          position="top-center"
          richColors
        />


        {/* ====================================================== */}
        {/* NAVBAR */}
        {/* ====================================================== */}

        <Navbar />


        {/* ====================================================== */}
        {/* MAIN CONTENT */}
        {/* ====================================================== */}

        <main className="flex-grow w-full pt-16">

          <Routes>

            {/* ====================================================== */}
            {/* PUBLIC ROUTES */}
            {/* ====================================================== */}

            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/signup"
              element={<Signup />}
            />

            <Route
              path="/about"
              element={<About />}
            />

            <Route
              path="/learn"
              element={<Learn />}
            />

            <Route
              path="/find-donors"
              element={<FindDonors />}
            />

            <Route
              path="/centers"
              element={<Centers />}
            />

            <Route
              path="/quiz"
              element={<EligibilityQuiz />}
            />

            <Route
              path="/check-eligibility"
              element={<EligibilityQuiz />}
            />

            <Route
              path="/hero-hall"
              element={<HeroHall />}
            />

            <Route
              path="/leaderboard"
              element={<HeroHall />}
            />
            
            <Route
              path="/donor-dashboard"
              element={<DonorDashboard />}
            />

            <Route
              path="/inventory"
              element={<BloodInventory />}
            />

            <Route
            path="/donation-history"
            element={<DonationHistory />}
            />

            <Route
  path="/notifications"
  element={<Notifications />}
/>

            {/* ====================================================== */}
            {/* DONOR ROUTES */}
            {/* ====================================================== */}

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute
                  allowedRoles={[
                    "donor",
                    "hospital",
                    "admin"
                  ]}
                >
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute
                  allowedRoles={[
                    "donor",
                    "hospital",
                    "admin"
                  ]}
                >
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/request-blood"
              element={
                <ProtectedRoute
                  allowedRoles={[
                    "donor"
                  ]}
                >
                  <RequestBlood />
                </ProtectedRoute>
              }
            />

            <Route
              path="/sent-requests"
              element={
                <ProtectedRoute
                  allowedRoles={[
                    "donor"
                  ]}
                >
                  <SentRequests />
                </ProtectedRoute>
              }
            />
            

            {/* ====================================================== */}
            {/* HOSPITAL ROUTES */}
            {/* ====================================================== */}

 <Route
  path="/hospital-dashboard"
  element={<HospitalDashboard />}
/>

<Route
  path="/hospital-analytics"
  element={
    <ProtectedRoute
      allowedRoles={[
        "hospital",
        "admin",
        "donor"
      ]}
    >
      <HospitalAnalytics />
    </ProtectedRoute>
  }
/>

<Route
  path="/hospital-donations"
  element={
    <ProtectedRoute
      allowedRoles={[
        "hospital",
        "admin"
      ]}
    >
      <HospitalDonations />
    </ProtectedRoute>
  }
/>

<Route
  path="/inventory"
  element={
    <ProtectedRoute
      allowedRoles={[
        "hospital",
        "admin"
      ]}
    >
      <Inventory />
    </ProtectedRoute>
  }
/>


            {/* ====================================================== */}
            {/* ADMIN ROUTES */}
            {/* ====================================================== */}

            <Route
              path="/admin-panel"
              element={
                <ProtectedRoute
                  allowedRoles={[
                    "hospital",
                    "admin",
                    "donor"
                  ]}
                >
                  <AdminPanel />
                </ProtectedRoute>
              }
            />

            <Route
  path="/admin-dashboard"
  element={
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/users"
  element={
    <ProtectedRoute
      allowedRoles={["admin"]}
    >
      <AdminUsers />
    </ProtectedRoute>
  }
/>

            {/* ====================================================== */}
            {/* 404 PAGE */}
            {/* ====================================================== */}

            <Route
              path="*"
              element={

                <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">

                  <div className="text-center">

                    <h1 className="text-7xl font-black text-gray-900">
                      404
                    </h1>

                    <p className="mt-5 text-xl font-medium text-gray-500">
                      The page you are looking for does not exist.
                    </p>

                  </div>

                </div>

              }
            />

          </Routes>

        </main>


        {/* ====================================================== */}
        {/* FOOTER */}
        {/* ====================================================== */}

        <footer className="bg-white border-t border-gray-200 py-8">

          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">

            <div>

              <h3 className="font-black text-gray-900 text-lg">
                LifeFlow
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Emergency Blood Coordination Platform
              </p>

            </div>

            <p className="text-sm text-gray-400 text-center md:text-right">
              © {new Date().getFullYear()} LifeFlow.
              Built to save lives through technology.
            </p>

          </div>

        </footer>

      </div>

    </Router>

  );

}

export default App;

