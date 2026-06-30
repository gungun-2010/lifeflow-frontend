import React from 'react';
import { Link } from 'react-router-dom';
// 1. IMPORT YOUR NEW SMART SEARCH BAR COMPONENT HERE
import SmartSearchBar from '../components/SmartSearchBar';
import DemandChart from '../components/DemandChart';
import { Heart, Search, ShieldCheck, Droplet, TrendingUp } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col items-center overflow-x-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="relative w-full flex flex-col items-center justify-center text-center py-40 px-4 overflow-hidden min-h-screen">
        
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0">
            <img 
                // Yahan maine path update kiya hai. Ensure hero.jpg is in your 'public' folder.
                src="/hero.jpg" 
                alt="Blood Donation Background" 
                className="w-full h-full object-cover"
                style={{ 
                  imageRendering: '-webkit-optimize-contrast', 
                  objectPosition: 'center' 
                }}
                // Fallback handle karne ke liye (Optional)
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1615461066841-6116ecaaba7f?auto=format&fit=crop&q=80&w=2000";
                }}
            />
            {/* White overlay: Adjusted for a high-end cinematic feel */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/70 to-gray-50"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center max-w-7xl mx-auto">
            {/* Blinking Badge */}
            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md text-red-600 px-6 py-2.5 rounded-full text-sm font-black mb-10 shadow-xl border border-white animate-pulse">
              <span className="w-2 h-2 bg-red-600 rounded-full"></span>
              SAVING LIVES, ONE DROP AT A TIME
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black text-gray-900 leading-[1.1] max-w-5xl tracking-tighter">
              The Quickest Way to <br/>
              <span className="text-red-600">Find or Donate</span> Blood.
            </h1>
            
            <p className="mt-10 text-xl md:text-2xl text-gray-600 max-w-3xl leading-relaxed font-medium">
              Join the LifeFlow network. Whether you are looking for a donor in an emergency or want to donate, we make the process seamless and verified.
            </p>
             
             {/* 2. REPLACED OLD BUTTONS ROW WITH THE SMART AI SEARCH COMPONENT */}
            <SmartSearchBar />
            
           </div>
           </section>

            {/* <div className="mt-14 flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
              <Link 
                to="/find-donors" 
                className="bg-red-600 text-white px-12 py-5 rounded-[2rem] font-black text-xl hover:bg-red-700 shadow-2xl shadow-red-200 transition-all flex items-center justify-center gap-3 active:scale-95"
              >
                <Search size={24} /> Find Donors
              </Link>
              <Link 
                to="/signup" 
                className="bg-white text-gray-900 border-2 border-transparent px-12 py-5 rounded-[2rem] font-black text-xl hover:border-red-600 transition-all flex items-center justify-center gap-3 active:scale-95 shadow-xl"
              >
                <Heart size={24} className="text-red-600" /> Become a Donor
              </Link>
            </div>
        </div>
      </section> */}

      {/* --- ANALYTICS SECTION --- */}
      <section className="w-full bg-gray-50 py-32 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-end justify-between mb-16 gap-10">
            <div className="text-left">
              <div className="flex items-center gap-3 text-red-600 font-black mb-4 tracking-widest uppercase text-sm">
                <TrendingUp size={24} />
                <span>Live Demand Analytics</span>
              </div>
              <h2 className="text-5xl font-black text-gray-900 tracking-tight">Real-time Requirements</h2>
              <p className="text-gray-500 text-xl mt-4 font-medium">Visualizing blood demand across the LifeFlow network.</p>
            </div>
            
            {/* Quick Stats Mini-Grid */}
            <div className="flex gap-4 w-full lg:w-auto">
              <div className="flex-1 bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 text-center">
                <p className="text-4xl font-black text-red-600">24/7</p>
                <p className="text-xs text-gray-400 uppercase font-black mt-2 tracking-widest">Availability</p>
              </div>
              <div className="flex-1 bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 text-center">
                <p className="text-4xl font-black text-gray-800">100%</p>
                <p className="text-xs text-gray-400 uppercase font-black mt-2 tracking-widest">Verified</p>
              </div>
            </div>
          </div>

          {/* Chart Container */}
          <div className="bg-white p-6 md:p-12 rounded-[4rem] shadow-2xl shadow-gray-200/50 border border-white">
            <DemandChart />
          </div>
        </div>
      </section>

      {/* --- FEATURE SECTION --- */}
      <section className="py-32 w-full max-w-7xl px-6">
        <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-gray-900 tracking-tight">Why Trust LifeFlow?</h2>
            <p className="text-gray-500 mt-4 text-xl font-medium">A safe and transparent connection between heroes and those in need.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { 
              icon: <ShieldCheck className="text-green-500" size={40} />, 
              title: "Verified Donors", 
              desc: "Every donor is verified with proper medical history and identity checks for your safety.",
              color: "bg-green-50"
            },
            { 
              icon: <Droplet className="text-red-500" size={40} />, 
              title: "All Groups", 
              desc: "From A+ to O-, find matching blood groups in your local area instantly during emergencies.",
              color: "bg-red-50"
            },
            { 
              icon: <Heart className="text-pink-500" size={40} />, 
              title: "100% Free", 
              desc: "We are a non-profit bridge. We do not charge anything for connecting donors and patients.",
              color: "bg-pink-50"
            }
          ].map((feature, i) => (
            <div key={i} className="group bg-white rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden text-left">
              <div className={`h-56 ${feature.color} flex items-center justify-center relative overflow-hidden`}>
                <div className="transform group-hover:scale-[2.5] transition-transform duration-1000 opacity-5 absolute">
                    {feature.icon}
                </div>
                <div className="relative z-10 p-6 bg-white rounded-3xl shadow-xl shadow-gray-200/50">
                    {feature.icon}
                </div>
              </div>
              <div className="p-12">
                <h3 className="font-black text-gray-900 text-2xl mb-4 tracking-tight">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed font-medium">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- IMPACT SECTION --- */}
      <section className="relative mb-32 bg-gray-900 w-[95%] max-w-7xl rounded-[4rem] p-12 md:p-20 text-white flex flex-col lg:flex-row items-center justify-between gap-12 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/20 blur-[120px] rounded-full"></div>
        <div className="relative z-10">
          <h2 className="text-5xl font-black mb-6 tracking-tight">Ready to save a life?</h2>
          <p className="text-gray-400 text-xl max-w-xl font-medium leading-relaxed">Your single donation can impact up to three lives. Join thousands of heroes across India today.</p>
        </div>
        <Link 
          to="/signup" 
          className="relative z-10 bg-red-600 text-white px-16 py-6 rounded-[2rem] font-black text-xl hover:bg-red-700 transition-all shadow-xl shadow-red-900/20 active:scale-95 w-full lg:w-auto text-center"
        >
          Register as Donor
        </Link>
      </section>

    </div>
  );
};

export default Home;