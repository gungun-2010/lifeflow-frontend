import React from "react";

const About = () => {
  return (
    <div className="bg-white text-gray-900 overflow-hidden">

      {/* HERO SECTION */}
      <section className="relative h-[75vh] overflow-hidden">

        {/* Background Image */}
        <img
          src="https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=2070&auto=format&fit=crop"
          alt="Blood Donation"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Light Overlay */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Soft Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 h-full flex items-center">

          <div className="max-w-3xl">

            <p className="text-xs font-black uppercase tracking-[0.35em] text-red-300 mb-6">
              National Blood Coordination Platform
            </p>

            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.05] text-white mb-8">
              Every Drop
              <span className="block text-gray-200">
                Counts.
              </span>

              Every Second
              <span className="block text-red-400">
                Matters.
              </span>
            </h1>

            <p className="text-gray-100 text-lg leading-relaxed font-medium max-w-2xl mb-10">
              LifeFlow is a modern blood donation coordination platform
              connecting donors, hospitals, and patients in real-time
              during critical medical emergencies.
            </p>

            <button className="bg-red-600 hover:bg-red-700 transition-all duration-300 px-8 py-4 text-white font-bold tracking-wide shadow-xl">
              Explore Network
            </button>

          </div>

        </div>

      </section>

      {/* ABOUT SECTION */}
      <section className="py-24 bg-white">

        <div className="max-w-7xl mx-auto px-6 md:px-10">

          <div className="grid lg:grid-cols-2 gap-20 items-center">

            {/* IMAGE SECTION */}
            <div className="relative">

              <img
                src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=1974&auto=format&fit=crop"
                alt="Healthcare"
                className="w-full h-[550px] object-cover shadow-2xl"
              />

              {/* Floating Card */}
              <div className="absolute -bottom-8 -right-8 bg-red-600 text-white px-8 py-6 shadow-2xl">

                <h3 className="text-4xl font-black mb-2">
                  24/7
                </h3>

                <p className="uppercase text-xs tracking-[0.25em] font-bold text-red-100">
                  Emergency Access
                </p>

              </div>

            </div>

            {/* CONTENT SECTION */}
            <div>

              <p className="text-xs font-black uppercase tracking-[0.35em] text-red-600 mb-5">
                Our Mission
              </p>

              <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight text-gray-900 mb-8">
                Bridging the gap between
                <span className="block text-red-600">
                  Hope and Healing.
                </span>
              </h2>

              <p className="text-gray-600 text-lg leading-relaxed font-medium mb-10">
                Thousands of patients struggle to find compatible blood
                donors during emergencies. Our platform reduces delays
                through secure real-time donor coordination and smart
                location-based matching.
              </p>

              <div className="space-y-8">

                {/* Feature 1 */}
                <div className="flex gap-5">

                  <div className="w-3 h-3 rounded-full bg-red-600 mt-3"></div>

                  <div>
                    <h4 className="text-xl font-black text-gray-900 mb-2">
                      Verified Donor Network
                    </h4>

                    <p className="text-gray-600 font-medium leading-relaxed">
                      Connect with medically eligible and verified donors
                      instantly during emergencies.
                    </p>
                  </div>

                </div>

                {/* Feature 2 */}
                <div className="flex gap-5">

                  <div className="w-3 h-3 rounded-full bg-red-600 mt-3"></div>

                  <div>
                    <h4 className="text-xl font-black text-gray-900 mb-2">
                      Real-Time Matching
                    </h4>

                    <p className="text-gray-600 font-medium leading-relaxed">
                      Smart location-based donor discovery system for faster
                      emergency response.
                    </p>
                  </div>

                </div>

                {/* Feature 3 */}
                <div className="flex gap-5">

                  <div className="w-3 h-3 rounded-full bg-red-600 mt-3"></div>

                  <div>
                    <h4 className="text-xl font-black text-gray-900 mb-2">
                      Community Driven Platform
                    </h4>

                    <p className="text-gray-600 font-medium leading-relaxed">
                      Building a culture of voluntary blood donation across
                      India through technology.
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* STATS SECTION */}
      <section className="bg-gray-700 py-24">

        <div className="max-w-7xl mx-auto px-6 md:px-10">

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

            {/* Stat 1 */}
            <div className="border border-white/10 bg-white/5 backdrop-blur-sm p-10 text-center">

              <h2 className="text-5xl font-black text-red-500 mb-3">
                100%
              </h2>

              <p className="uppercase tracking-[0.25em] text-xs font-bold text-gray-400">
                Voluntary Donors
              </p>

            </div>

            {/* Stat 2 */}
            <div className="border border-white/10 bg-white/5 backdrop-blur-sm p-10 text-center">

              <h2 className="text-5xl font-black text-red-500 mb-3">
                24/7
              </h2>

              <p className="uppercase tracking-[0.25em] text-xs font-bold text-gray-400">
                Emergency Access
              </p>

            </div>

            {/* Stat 3 */}
            <div className="border border-white/10 bg-white/5 backdrop-blur-sm p-10 text-center">

              <h2 className="text-5xl font-black text-red-500 mb-3">
                Fast
              </h2>

              <p className="uppercase tracking-[0.25em] text-xs font-bold text-gray-400">
                Smart Matching
              </p>

            </div>

            {/* Stat 4 */}
            <div className="border border-white/10 bg-white/5 backdrop-blur-sm p-10 text-center">

              <h2 className="text-5xl font-black text-red-500 mb-3">
                Secure
              </h2>

              <p className="uppercase tracking-[0.25em] text-xs font-bold text-gray-400">
                Verified Network
              </p>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
};

export default About;

