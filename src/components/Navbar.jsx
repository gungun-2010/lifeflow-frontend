import API from "../api/axios";

import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Droplet, User, Bell, LayoutDashboard, LogOut } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [notificationCount, setNotificationCount] =
  useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  // Check if user is logged in
  const savedUser = localStorage.getItem('user');
  const user = savedUser ? JSON.parse(savedUser) : null;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

useEffect(() => {

  const fetchNotificationCount =
    async () => {

      try {

        const savedUser =
          localStorage.getItem("user");

        if (!savedUser) return;

        const user =
          JSON.parse(savedUser);

        const userId =
          user?._id || user?.id;

        if (!userId) return;

        const res =
          await API.get(
            `/notifications/${userId}`
          );

        console.log(
          "ALL NOTIFICATIONS:",
          res.data.notifications
        );

        const unreadCount =
          res.data.notifications.filter(
            (notification) =>
              !notification.isRead
          ).length;

        console.log(
          "UNREAD COUNT:",
          unreadCount
        );

        setNotificationCount(
          unreadCount
        );

      } catch (error) {

        console.error(
          "Notification Count Error:",
          error
        );

      }

    };

  fetchNotificationCount();

  window.addEventListener(
    "notificationAdded",
    fetchNotificationCount
  );

  window.addEventListener(
    "notificationsRead",
    fetchNotificationCount
  );

  return () => {

    window.removeEventListener(
      "notificationAdded",
      fetchNotificationCount
    );

    window.removeEventListener(
      "notificationsRead",
      fetchNotificationCount
    );

  };

}, []);



  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
    window.location.reload(); 
  };

  // UPDATED: Removed Find Donors, Eligibility, and Learn to keep the UI lean
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Heroes', path: '/hero-hall' },
    { name: 'Centers', path: '/centers' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/90 backdrop-blur-md shadow-lg py-3' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <div className="bg-red-600 p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300 shadow-md">
            <Droplet className="text-white" size={24} fill="currentColor" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-gray-900">
            Life<span className="text-red-600">Flow</span>
          </span>
        </Link>

        <Link 
        to="/profile" 
        className="hover:text-red-600 transition-colors flex items-center gap-2"
        >
        <User size={18} /> Profile
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 bg-gray-50/50 px-6 py-2 rounded-full border border-gray-100/50">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-bold transition-all hover:text-red-600 relative py-1 ${
                isActive(link.path) ? 'text-red-600' : 'text-gray-600'
              }`}
            >
              {link.name}
              {isActive(link.path) && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-600 rounded-full" />
              )}
            </Link>
          ))}
          
          {/* Dashboard link remains visible for logged-in users */}
{user?.role === "donor" && (
  <Link
    to="/dashboard"
    className={`text-sm font-bold transition-all hover:text-red-600 flex items-center gap-1.5 ${
      isActive("/dashboard") ? "text-red-600" : "text-gray-600"
    }`}
  >
    <LayoutDashboard size={16} />
    Dashboard
  </Link>
)}

{user?.role === "hospital" && (
  <>
    <Link
      to="/hospital-dashboard"
      className={`text-sm font-bold transition-all hover:text-red-600 ${
        isActive("/hospital-dashboard")
          ? "text-red-600"
          : "text-gray-600"
      }`}
    >
      Dashboard
    </Link>

    <Link
      to="/hospital-analytics"
      className={`text-sm font-bold transition-all hover:text-red-600 ${
        isActive("/hospital-analytics")
          ? "text-red-600"
          : "text-gray-600"
      }`}
    >
      Analytics
    </Link>

    <Link
      to="/inventory"
      className={`text-sm font-bold transition-all hover:text-red-600 ${
        isActive("/inventory")
          ? "text-red-600"
          : "text-gray-600"
      }`}
    >
      Inventory
    </Link>
  </>
)}

{user?.role === "admin" && (
  <Link
    to="/admin-dashboard"
    className={`text-sm font-bold transition-all hover:text-red-600 ${
      isActive("/admin-dashboard")
        ? "text-red-600"
        : "text-gray-600"
    }`}
  >
    Admin
  </Link>
)}
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          {user ? (
            <div className="flex items-center gap-3">
<button
  onClick={() =>
    navigate("/notifications")
  }
  className="
    p-2.5
    text-gray-500
    hover:bg-white
    hover:shadow-sm
    rounded-xl
    transition-all
    relative
    border
    border-transparent
    hover:border-gray-100
  "
>

  <Bell size={20} />

  {

    notificationCount > 0 && (

      <span
        className="
          absolute
          -top-1
          -right-1
          bg-red-600
          text-white
          text-xs
          font-black
          rounded-full
          w-5
          h-5
          flex
          items-center
          justify-center
        "
      >

        {notificationCount}

      </span>

    )

  }

</button>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 bg-gray-100 text-gray-700 px-5 py-2.5 rounded-xl font-bold hover:bg-red-50 hover:text-red-600 transition-all active:scale-95"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="flex items-center gap-2 bg-gray-900 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-red-600 transition-all active:scale-95 shadow-lg shadow-gray-200"
            >
              <User size={18} />
              Login
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-gray-900"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-t border-gray-100 p-6 shadow-2xl md:hidden flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path} onClick={() => setIsOpen(false)} className={`text-xl font-bold ${isActive(link.path) ? 'text-red-600' : 'text-gray-900'}`}>
                {link.name}
              </Link>
            ))}
            {user && (
              <Link to="/dashboard" onClick={() => setIsOpen(false)} className={`text-xl font-bold ${isActive('/dashboard') ? 'text-red-600' : 'text-gray-900'}`}>
                Dashboard
              </Link>
            )}
          </div>
          <div className="pt-4 border-t border-gray-100">
            {user ? (
               <button onClick={handleLogout} className="w-full bg-gray-100 text-gray-900 py-4 rounded-2xl font-bold">Logout</button>
            ) : (
               <Link to="/login" onClick={() => setIsOpen(false)} className="w-full bg-red-600 text-white py-4 rounded-2xl font-bold text-center block">Sign In</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

