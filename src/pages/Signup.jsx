import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'sonner';
import { User, Mail, Phone, MapPin, Lock, Droplet, UserPlus } from 'lucide-react';
// 1. Api function ko import kijiye (Aapke project structures ke mutabik src/api.js se)
import { signUp } from '../api.js';

const Signup = () => {
  const navigate = useNavigate();
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const [formData, setFormData] = useState({
  name: '',
  email: '',
  bloodGroup: '',
  phone: '',
  location: '',
  password: '',
  role: 'donor'
});

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (formData.name.trim().length < 3) newErrors.name = "Name must be at least 3 characters";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) newErrors.email = "Enter a valid email address";
    if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Enter a 10-digit phone number";
    if (formData.password.length < 6) newErrors.password = "Minimum 6 characters required";
    if (
  formData.role === "donor" &&
  !formData.bloodGroup
) {
  newErrors.bloodGroup = "Required";
}

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e) => {

  e.preventDefault();

  if (!validateForm()) {

    toast.error(
      "Please correct the errors in the form"
    );

    return;

  }

  setLoading(true);

  try {

    const payload = {
      ...formData
    };

    if (
      payload.role ===
      "hospital"
    ) {

      delete payload.bloodGroup;

    }

    console.log(
      "SIGNUP PAYLOAD:",
      payload
    );

    const response =
      await signUp(payload);

    toast.success(
      "Registration Successful! Welcome to LifeFlow."
    );

    setTimeout(
      () => navigate("/login"),
      1500
    );

  } catch (err) {

    const errorMsg =
      err.response?.data?.message ||
      err.response?.data?.error ||
      "Signup failed";

    toast.error(errorMsg);

    console.error(err);

  } finally {

    setLoading(false);

  }

};

  return (
    <div className="w-full pt-28 pb-20 px-4 md:px-8 max-w-7xl mx-auto flex items-center justify-center animate-in fade-in duration-500">
      <Toaster position="top-right" richColors closeButton />
      
      <div className="w-full max-w-2xl bg-white rounded-[2.5rem] shadow-xl border border-gray-100 p-8 md:p-12">
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-6 shadow-inner -rotate-3">
            <UserPlus className="text-red-600" size={32} />
          </div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">Join the Network</h2>
          <p className="text-gray-500 mt-2 font-medium">Become a life-saver in your community</p>
        </div>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="md:col-span-2">
            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Full Name</label>
            <div className="relative group">
              <User className="absolute left-4 top-4 text-gray-400 group-focus-within:text-red-600 transition-colors" size={20} />
              <input 
                name="name" 
                type="text" 
                value={formData.name}
                onChange={handleChange} 
                className={`w-full pl-12 pr-4 py-4 bg-gray-50 border rounded-2xl focus:ring-4 focus:bg-white focus:outline-none transition-all font-medium ${errors.name ? 'border-red-500 focus:ring-red-50' : 'border-transparent focus:border-red-600 focus:ring-red-50'}`} 
                placeholder="Gungun Singh" 
              />
            </div>
            {errors.name && <p className="text-red-500 text-xs font-bold mt-2 ml-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Email</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-4 text-gray-400 group-focus-within:text-red-600 transition-colors" size={20} />
              <input 
                name="email" 
                type="email" 
                value={formData.email}
                onChange={handleChange} 
                className={`w-full pl-12 pr-4 py-4 bg-gray-50 border rounded-2xl focus:ring-4 focus:bg-white focus:outline-none transition-all font-medium ${errors.email ? 'border-red-500 focus:ring-red-50' : 'border-transparent focus:border-red-600 focus:ring-red-50'}`} 
                placeholder="gungun@example.com" 
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs font-bold mt-2 ml-1">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Phone</label>
            <div className="relative group">
              <Phone className="absolute left-4 top-4 text-gray-400 group-focus-within:text-red-600 transition-colors" size={20} />
              <input 
                name="phone" 
                type="tel" 
                value={formData.phone}
                onChange={handleChange} 
                className={`w-full pl-12 pr-4 py-4 bg-gray-50 border rounded-2xl focus:ring-4 focus:bg-white focus:outline-none transition-all font-medium ${errors.phone ? 'border-red-500 focus:ring-red-50' : 'border-transparent focus:border-red-600 focus:ring-red-50'}`} 
                placeholder="9876543210" 
              />
            </div>
            {errors.phone && <p className="text-red-500 text-xs font-bold mt-2 ml-1">{errors.phone}</p>}
          </div>


        {/* ROLE */}

<div>
  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">
    Account Type
  </label>

  <select
    name="role"
    value={formData.role}
    onChange={handleChange}
    className="w-full px-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:ring-4 focus:ring-red-50 focus:border-red-600 focus:bg-white outline-none transition-all font-bold"
  >
    <option value="donor">
      Donor
    </option>

    <option value="hospital">
      Hospital
    </option>
  </select>
</div>


          {/* Blood Group */}
{formData.role === "donor" && (

<div>
  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">
    Blood Group
  </label>

  <div className="relative group">

    <Droplet
      className="absolute left-4 top-4 text-red-500"
      size={20}
    />

    <select
      name="bloodGroup"
      value={formData.bloodGroup}
      onChange={handleChange}
      className={`w-full pl-12 pr-4 py-4 bg-gray-50 border rounded-2xl focus:ring-4 focus:bg-white focus:outline-none transition-all font-bold appearance-none cursor-pointer ${
        errors.bloodGroup
          ? "border-red-500 focus:ring-red-50"
          : "border-transparent focus:border-red-600 focus:ring-red-50"
      }`}
    >

      <option value="">
        Select
      </option>

      {bloodGroups.map(
        (group) => (

          <option
            key={group}
            value={group}
          >
            {group}
          </option>

        )
      )}

    </select>

  </div>

  {errors.bloodGroup && (
    <p className="text-red-500 text-xs font-bold mt-2 ml-1">
      {errors.bloodGroup}
    </p>
  )}

</div>

)}

          {/* Location */}
          <div>
            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Location</label>
            <div className="relative group">
              <MapPin className="absolute left-4 top-4 text-gray-400 group-focus-within:text-red-600 transition-colors" size={20} />
              <input 
                name="location" 
                type="text" 
                value={formData.location}
                onChange={handleChange} 
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:ring-4 focus:ring-red-50 focus:border-red-600 focus:bg-white outline-none transition-all font-medium" 
                placeholder="Patna, Bihar" 
              />
            </div>
          </div>

          {/* Password */}
          <div className="md:col-span-2">
            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-4 text-gray-400 group-focus-within:text-red-600 transition-colors" size={20} />
              <input 
                name="password" 
                type="password" 
                value={formData.password}
                onChange={handleChange} 
                className={`w-full pl-12 pr-4 py-4 bg-gray-50 border rounded-2xl focus:ring-4 focus:bg-white focus:outline-none transition-all font-medium ${errors.password ? 'border-red-500 focus:ring-red-50' : 'border-transparent focus:border-red-600 focus:ring-red-50'}`} 
                placeholder="••••••••" 
              />
            </div>
            {errors.password && <p className="text-red-500 text-xs font-bold mt-2 ml-1">{errors.password}</p>}
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className={`md:col-span-2 mt-6 text-white py-5 rounded-2xl font-black text-lg shadow-xl transition-all active:scale-95 flex items-center justify-center ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-900 hover:bg-red-600 shadow-gray-200 hover:shadow-red-100'}`}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-10 text-center text-sm font-medium text-gray-500">
          Already a member? <a href="/login" className="text-red-600 font-black hover:text-red-700 transition-colors ml-1">Log in here</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;