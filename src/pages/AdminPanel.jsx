import React from 'react';
import { ShieldAlert, Users, Database, Settings } from 'lucide-react';

const AdminPanel = () => {
  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-10">
          <div className="bg-red-600 p-3 rounded-2xl shadow-lg shadow-red-200">
            <ShieldAlert className="text-white" size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-black text-slate-900">Admin Control</h1>
            <p className="text-slate-500 font-medium">System-wide management and verification.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
            <Users className="text-blue-500 mb-4" />
            <h3 className="font-bold text-lg">User Management</h3>
            <p className="text-sm text-slate-400 mt-1">Manage donor and hospital accounts.</p>
          </div>
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
            <Database className="text-emerald-500 mb-4" />
            <h3 className="font-bold text-lg">System Logs</h3>
            <p className="text-sm text-slate-400 mt-1">Monitor all blood requests and fulfills.</p>
          </div>
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
            <Settings className="text-purple-500 mb-4" />
            <h3 className="font-bold text-lg">Global Config</h3>
            <p className="text-sm text-slate-400 mt-1">Adjust points and system settings.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;