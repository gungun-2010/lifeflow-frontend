import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowLeft, Clock, CheckCircle, XCircle, Inbox, Calendar, Droplet, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const SentRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchSentRequests = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/requests/sent-requests/${user.phone}`);
        if (res.data.success) {
          setRequests(res.data.requests);
        }
      } catch (err) {
        console.error("Failed to fetch sent requests");
      } finally {
        setLoading(false);
      }
    };

    if (user?.phone) fetchSentRequests();
  }, [user?.phone]);

  const getStatusIcon = (status) => {
    if (status === 'Accepted') return <CheckCircle size={16} className="text-green-600" />;
    if (status === 'Rejected') return <XCircle size={16} className="text-red-600" />;
    return <Clock size={16} className="text-yellow-600" />;
  };

  const getStatusStyle = (status) => {
    if (status === 'Accepted') return 'bg-green-50 text-green-700 border-green-100';
    if (status === 'Rejected') return 'bg-red-50 text-red-700 border-red-100';
    return 'bg-yellow-50 text-yellow-700 border-yellow-100';
  };

  if (!user) return (
    <div className="pt-28 text-center px-4">
      <div className="bg-white p-10 rounded-[2.5rem] shadow-xl max-w-md mx-auto border border-gray-100">
        <p className="text-gray-500 font-bold mb-6">Please login to view history.</p>
        <Link to="/login" className="bg-red-600 text-white px-8 py-3 rounded-xl font-black">Log In</Link>
      </div>
    </div>
  );

  return (
    <div className="w-full pt-28 pb-20 px-4 md:px-8 max-w-7xl mx-auto animate-in fade-in duration-500">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="p-2 bg-white hover:bg-red-50 text-gray-400 hover:text-red-600 rounded-xl border border-gray-100 shadow-sm transition-all active:scale-90">
            <ArrowLeft size={20} />
          </Link>
          <div>
            {/* UPDATED: Reduced from text-4xl to text-xl */}
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">Sent <span className="text-red-600">Requests</span></h1>
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">History</p>
          </div>
        </div>
        
        <div className="bg-white px-5 py-2 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Live Status</span>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-24 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Fetching records...</p>
          </div>
        ) : requests.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Target Donor</th>
                  <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Group</th>
                  <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Sent Date</th>
                  <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Current Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {requests.map((req) => (
                  <tr key={req._id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 group-hover:bg-red-50 group-hover:text-red-600 transition-colors">
                            <User size={14} />
                        </div>
                        <span className="font-mono text-[10px] text-gray-400">{req.donorId}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex justify-center">
                        <div className="w-10 h-10 bg-white border border-red-50 rounded-xl flex items-center justify-center font-black text-red-600 shadow-sm text-sm">
                            {req.bloodGroupNeeded}
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-gray-600 font-bold text-xs">
                        <Calendar size={14} className="text-gray-400" />
                        {new Date(req.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[10px] font-black uppercase tracking-wider w-fit ${getStatusStyle(req.status)}`}>
                        {getStatusIcon(req.status)}
                        {req.status}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-24 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Inbox size={32} className="text-gray-200" />
            </div>
            <h3 className="text-xl font-black text-gray-900 tracking-tight">No Requests Found</h3>
            <p className="text-gray-500 font-medium mt-2 mb-8 text-sm">You haven't reached out to any donors yet.</p>
            <Link 
              to="/find-donors" 
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl font-black hover:bg-red-600 transition-all shadow-xl active:scale-95 text-sm"
            >
              <Droplet size={18} />
              Browse Donors
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SentRequests;