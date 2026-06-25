import React, { useState } from 'react';
import API from "../api/axios";
import { toast } from 'sonner';
import { Droplet, Hospital, User, ClipboardList, AlertCircle } from 'lucide-react';

const RequestBlood = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  
  const [formData, setFormData] = useState({
    requester: storedUser?.id || '',
    patientName: '',
    bloodGroup: '',
    unitsNeeded: 1,
    hospitalName: '',
    location: '',
    urgency: 'Normal'
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Note: Aapke routes ke hisaab se path '/api/requests/send' ya '/api/requests/hospital/create' ho sakta hai
      // Hum yahan general individual request bhej rahe hain
      const res = await API.post('/requests/send', formData);
      
      if (res.data.success) {
        toast.success("Blood request posted successfully!");
        setFormData({ ...formData, patientName: '', hospitalName: '', unitsNeeded: 1 });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to post request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
        
        {/* Header */}
        <div className="bg-red-600 p-10 text-white">
          <h2 className="text-3xl font-black flex items-center gap-3">
            <Droplet size={32} fill="white" /> Post Blood Request
          </h2>
          <p className="text-red-100 mt-2 font-medium">Fill in the details to find matching donors nearby.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Patient Name */}
            <div>
              <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-wider">Patient Name</label>
              <div className="relative">
                <User className="absolute left-4 top-3.5 text-gray-400" size={20} />
                <input 
                  type="text"
                  required
                  placeholder="Full Name"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-red-500 outline-none transition-all"
                  onChange={(e) => setFormData({...formData, patientName: e.target.value})}
                  value={formData.patientName}
                />
              </div>
            </div>

            {/* Blood Group */}
            <div>
              <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-wider">Blood Group Required</label>
              <select 
                required
                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-red-500 outline-none transition-all appearance-none"
                onChange={(e) => setFormData({...formData, bloodGroup: e.target.value})}
                value={formData.bloodGroup}
              >
                <option value="">Select Group</option>
                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(group => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Units */}
            <div>
              <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-wider">Units Needed</label>
              <input 
                type="number"
                min="1"
                required
                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-red-500 outline-none transition-all"
                onChange={(e) => setFormData({...formData, unitsNeeded: e.target.value})}
                value={formData.unitsNeeded}
              />
            </div>

            {/* Hospital */}
            <div>
              <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-wider">Hospital Name</label>
              <div className="relative">
                <Hospital className="absolute left-4 top-3.5 text-gray-400" size={20} />
                <input 
                  type="text"
                  required
                  placeholder="e.g. Apollo Hospital"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-red-500 outline-none transition-all"
                  onChange={(e) => setFormData({...formData, hospitalName: e.target.value})}
                  value={formData.hospitalName}
                />
              </div>
            </div>
          </div>

          {/* Urgency Selection */}
          <div>
            <label className="block text-sm font-black text-gray-700 mb-4 uppercase tracking-wider">Urgency Level</label>
            <div className="flex flex-wrap gap-4">
              {['Normal', 'Urgent', 'Emergency'].map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setFormData({...formData, urgency: level})}
                  className={`px-6 py-3 rounded-xl font-bold transition-all border-2 ${
                    formData.urgency === level 
                    ? 'border-red-600 bg-red-50 text-red-600 shadow-md' 
                    : 'border-gray-100 bg-white text-gray-400 hover:border-gray-200'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gray-900 text-white py-5 rounded-2xl font-black text-xl hover:bg-black transition-all shadow-xl active:scale-[0.98] disabled:opacity-70 mt-4 flex items-center justify-center gap-3"
          >
            {loading ? "Posting..." : "Post Urgent Request"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default RequestBlood;