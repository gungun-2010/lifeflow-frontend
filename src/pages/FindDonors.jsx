import React, { useState, useEffect } from 'react';
// Added 'Users' to the import list below
import { Search, MapPin, Loader2, Phone, X, Calendar, Droplet, Users } from 'lucide-react';
import API from "../api/axios";
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const FindDonors = () => {
  const navigate = useNavigate();
  const [bloodGroup, setBloodGroup] = useState('');
  const [location, setLocation] = useState('');
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [requestLoading, setRequestLoading] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState(null);

  const isEligible = (lastDonated) => {
    if (!lastDonated) return true;
    const lastDate = new Date(lastDonated);
    const today = new Date();
    const diffTime = Math.abs(today - lastDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 90;
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await API.get(
  `/donors/search`, {
        params: {
          bloodGroup: bloodGroup === 'All Groups' ? '' : bloodGroup,
          location: location
        }
      });
      if (response.data.success) {
        const eligibleDonors = response.data.donors.filter(donor => isEligible(donor.lastDonated));
        setDonors(eligibleDonors);
      }
    } catch (error) {
      console.error("Search failed:", error);
      toast.error("Failed to fetch donors");
    } finally {
      setLoading(false);
    }
  };

  const handleSendRequest = async () => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (!loggedInUser) {
      toast.error("Please login to contact donors!");
      navigate('/login');
      return;
    }

    setRequestLoading(true);
    try {
      const requestData = {
        donorId: selectedDonor._id,
        bloodGroupNeeded: selectedDonor.bloodGroup,
        requesterName: loggedInUser.name, 
        requesterPhone: loggedInUser.phone, 
        message: `Urgent requirement for ${selectedDonor.bloodGroup} blood in ${selectedDonor.location}. Requested by ${loggedInUser.name}.`
      };
      const response = await API.post('/requests/send', requestData);
      if (response.data.success) {
        toast.success("Contact request sent successfully!");
        setSelectedDonor(null);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send request.");
    } finally {
      setRequestLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className="w-full pt-28 pb-20 px-4 md:px-8 max-w-7xl mx-auto animate-in fade-in duration-500">
      
      <header className="mb-10">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">
          Find <span className="text-red-600">Blood Donors</span>
        </h1>
        <p className="text-gray-500 font-medium mt-2">Connecting you with verified eligible donors in your area.</p>
      </header>

      {/* Filter Section */}
      <div className="bg-white p-2 rounded-[2rem] border border-gray-100 shadow-xl mb-12 flex flex-col md:flex-row gap-2 items-center">
        <div className="flex-1 w-full flex items-center gap-3 px-6 py-4 bg-gray-50 rounded-2xl md:rounded-l-[1.8rem] md:rounded-r-none border border-transparent focus-within:border-red-100 focus-within:bg-white transition-all">
          <Droplet className="text-red-500" size={20} />
          <select 
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            className="w-full bg-transparent font-bold text-gray-800 outline-none cursor-pointer"
          >
            <option value="">All Blood Groups</option>
            <option value="A+">A+</option><option value="A-">A-</option>
            <option value="B+">B+</option><option value="B-">B-</option>
            <option value="O+">O+</option><option value="O-">O-</option>
            <option value="AB+">AB+</option><option value="AB-">AB-</option>
          </select>
        </div>

        <div className="flex-[1.5] w-full flex items-center gap-3 px-6 py-4 bg-gray-50 rounded-2xl md:rounded-none border border-transparent focus-within:border-red-100 focus-within:bg-white transition-all">
          <MapPin className="text-gray-400" size={20} />
          <input 
            type="text" 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter your city (e.g. Mandi)..." 
            className="w-full bg-transparent font-medium text-gray-800 outline-none placeholder:text-gray-400" 
          />
        </div>

        <button 
          onClick={handleSearch}
          disabled={loading}
          className="w-full md:w-auto bg-gray-900 hover:bg-red-600 text-white px-10 py-4 rounded-2xl md:rounded-r-[1.8rem] md:rounded-l-none font-black flex items-center justify-center gap-3 transition-all active:scale-95 disabled:bg-gray-400"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
          Search Donors
        </button>
      </div>

      {/* Donor List */}
      {donors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {donors.map(donor => (
            <div key={donor._id} className="group bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-50 rounded-bl-[4rem] -mr-8 -mt-8 transition-colors group-hover:bg-red-100" />
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-16 h-16 bg-white shadow-md rounded-2xl flex items-center justify-center text-2xl font-black text-red-600 border border-red-50">
                    {donor.bloodGroup}
                  </div>
                  <div className="text-right">
                    <h3 className="font-black text-xl text-gray-900 capitalize">{donor.name}</h3>
                    <p className="flex items-center justify-end text-gray-400 font-bold gap-1 text-xs uppercase tracking-widest mt-1">
                      <MapPin size={12} /> {donor.location}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                   <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider w-fit">
                     <Calendar size={14} /> Ready to donate
                   </div>
                   <p className="text-gray-500 text-sm leading-relaxed">
                     This donor is currently eligible and has passed the 90-day safety rest period.
                   </p>
                </div>

                <button 
                  onClick={() => setSelectedDonor(donor)}
                  className="w-full bg-gray-50 group-hover:bg-red-600 group-hover:text-white text-gray-900 py-4 rounded-2xl transition-all font-black shadow-sm group-hover:shadow-red-200 active:scale-95"
                >
                  Contact Donor
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-gray-200">
          <div className="p-8 bg-gray-50 rounded-full w-fit mx-auto mb-6">
            <Users size={48} className="text-gray-300" />
          </div>
          <p className="text-gray-900 text-2xl font-black tracking-tight">No eligible donors found.</p>
          <p className="text-gray-400 font-medium mt-2 max-w-sm mx-auto">
            Try broadening your search or checking nearby cities.
          </p>
        </div>
      )}

      {/* Contact Modal */}
      {selectedDonor && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-md flex items-center justify-center p-4 z-[100] animate-in fade-in duration-300">
          <div className="bg-white rounded-[3rem] max-w-md w-full p-10 shadow-2xl relative animate-in zoom-in-95 duration-300">
            <button onClick={() => setSelectedDonor(null)} className="absolute top-6 right-6 p-2 bg-gray-50 rounded-xl text-gray-400 hover:text-red-600 transition-colors">
              <X size={24} />
            </button>

            <div className="text-center mb-10">
              <div className="w-24 h-24 bg-red-600 text-white rounded-[2rem] flex items-center justify-center mx-auto mb-6 font-black text-4xl shadow-xl shadow-red-200 rotate-3">
                {selectedDonor.bloodGroup}
              </div>
              <h3 className="text-3xl font-black text-gray-900 capitalize">{selectedDonor.name}</h3>
              <p className="text-gray-500 mt-2 font-bold flex items-center justify-center gap-1 uppercase tracking-widest text-xs">
                <MapPin size={16} className="text-red-500" /> {selectedDonor.location}
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl mb-8">
              <p className="text-sm text-gray-600 leading-relaxed font-medium">
                By clicking confirm, a request containing your contact details will be sent to <span className="text-gray-900 font-bold">{selectedDonor.name}</span>.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <button 
                onClick={handleSendRequest}
                disabled={requestLoading}
                className="w-full flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white py-5 rounded-2xl font-black transition-all shadow-xl shadow-red-100 disabled:bg-red-400 active:scale-95"
              >
                {requestLoading ? <Loader2 className="animate-spin" size={24} /> : <Phone size={24} />}
                Confirm & Send Request
              </button>
              <button onClick={() => setSelectedDonor(null)} className="w-full py-2 text-gray-400 font-bold hover:text-gray-900 transition-colors text-sm uppercase tracking-widest">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FindDonors;

