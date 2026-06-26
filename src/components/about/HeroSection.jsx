import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  HeartPulse,
  ShieldCheck,
  Users,
  Hospital,
  ChevronDown,
  Sparkles,
  CheckCircle2
} from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-red-50 via-white to-white min-h-screen">

      {/* Background Blur */}
      <div className="absolute -top-52 -left-52 w-[500px] h-[500px] rounded-full bg-red-100 blur-3xl opacity-60"></div>

      <div className="absolute -bottom-56 right-0 w-[450px] h-[450px] rounded-full bg-red-100 blur-3xl opacity-50"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-32 pb-24">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT */}

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >

<motion.div

initial={{opacity:0,y:-20}}

animate={{opacity:1,y:0}}

transition={{delay:0.3}}

className="
inline-flex
items-center
gap-3
rounded-full
border
border-red-100
bg-white/80
backdrop-blur-xl
shadow-lg
px-6
py-3
mb-8
"

>

<div className="bg-red-100 p-2 rounded-full">

<HeartPulse className="text-red-600 w-4 h-4"/>

</div>

<div>

<p className="font-semibold text-red-600">

Healthcare Innovation Platform

</p>

</div>

</motion.div>

            <h1 className="text-5xl lg:text-7xl font-black text-gray-900 leading-tight">

              Saving Lives

              <span className="block text-red-600">

                Through

              </span>

              Intelligent

              <span className="block">

                Blood Coordination

              </span>

            </h1>

            <p className="mt-8 text-xl text-gray-600 leading-9 max-w-xl">

              LifeFlow seamlessly connects hospitals, verified blood donors,
              and patients using intelligent matching, real-time alerts,
              and emergency coordination.

              <div className="flex flex-wrap gap-3 mt-8">

<div className="flex items-center gap-2 bg-red-50 px-4 py-2 rounded-full">

<CheckCircle2 className="text-red-600 w-4 h-4"/>

<span className="font-medium text-gray-700">

Verified Donors

</span>

</div>

<div className="flex items-center gap-2 bg-red-50 px-4 py-2 rounded-full">

<CheckCircle2 className="text-red-600 w-4 h-4"/>

<span className="font-medium text-gray-700">

Real-Time Matching

</span>

</div>

<div className="flex items-center gap-2 bg-red-50 px-4 py-2 rounded-full">

<CheckCircle2 className="text-red-600 w-4 h-4"/>

<span className="font-medium text-gray-700">

Emergency Response

</span>

</div>

</div>

            </p>

            <div className="flex flex-wrap gap-5 mt-12">

<button

className="
group
bg-red-600
hover:bg-red-700
transition-all
duration-300
px-8
py-4
rounded-xl
text-white
font-bold
flex
items-center
gap-3
shadow-xl
hover:scale-105
"

>

Become a Donor

<ArrowRight
className="group-hover:translate-x-1 transition"
/>

</button>

<button

className="
border-2
border-gray-200
hover:border-red-600
hover:text-red-600
hover:shadow-lg
transition-all
duration-300
px-8
py-4
rounded-xl
font-semibold
"

>

Explore Platform

</button>


<div className="mt-10 flex flex-wrap gap-8 items-center">

<p className="text-gray-500 font-semibold">

Trusted by

</p>

<div className="flex gap-6">

<span className="font-bold text-gray-700">

Apollo

</span>

<span className="font-bold text-gray-700">

AIIMS

</span>

<span className="font-bold text-gray-700">

Fortis

</span>

</div>

</div>

            </div>

            {/* Trust Numbers */}

            <div className="grid grid-cols-3 gap-8 mt-16">

              <div>

                <h2 className="text-4xl font-black text-gray-900">

                  500+

                </h2>

                <p className="text-gray-500 mt-2">

                  Verified Donors

                </p>

              </div>

              <div>

                <h2 className="text-4xl font-black text-gray-900">

                  120+

                </h2>

                <p className="text-gray-500 mt-2">

                  Hospitals

                </p>

              </div>

              <div>

                <h2 className="text-4xl font-black text-gray-900">

                  24×7

                </h2>

                <p className="text-gray-500 mt-2">

                  Emergency Support

                </p>

              </div>

            </div>

          </motion.div>

{/* RIGHT */}

<motion.div
  initial={{ opacity: 0, x: 60 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8 }}
  className="relative flex justify-center"
>

    <div className="
absolute
top-8
right-8
bg-yellow-100
p-3
rounded-full
shadow-lg
">

<Sparkles
className="text-yellow-500"
/>

</div>

  {/* Main Image */}

  <img
  
    src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1974&auto=format&fit=crop"
    alt="Healthcare"
    className="
      rounded-[36px]
      shadow-[0_35px_80px_rgba(0,0,0,0.15)]
      w-full
      max-w-[620px]
      h-[720px]
      object-cover
    "
  />

  {/* ---------------- Card 1 ---------------- */}

  <motion.div

    animate={{
      y: [0, -12, 0]
    }}

    transition={{
      duration: 4,
      repeat: Infinity
    }}

    className="
      absolute
      top-10
      -left-10
      bg-white/80 backdrop-blur-xl
      rounded-3xl
      shadow-[0_20px_60px_rgba(0,0,0,0.12)]
      p-6
      w-64
      border
    "

  >

    <div className="flex items-center gap-4">

      <div className="bg-red-100 p-3 rounded-xl">

        <Users className="text-red-600"/>

      </div>

      <div>

        <h3 className="font-bold text-lg">

          500+

        </h3>

        <p className="text-gray-500">

          Active Donors

        </p>

      </div>

    </div>

  </motion.div>

  {/* ---------------- Card 2 ---------------- */}

  <motion.div

    animate={{
      y:[0,10,0]
    }}

    transition={{
      duration:5,
      repeat:Infinity
    }}

    className="
      absolute
      top-1/2
      -right-10
      bg-white
      rounded-3xl
      shadow-xl
      p-6
      w-72
      border
    "

  >

    <div className="flex gap-4">

      <div className="bg-green-100 p-3 rounded-xl">

        <Hospital className="text-green-600"/>

      </div>

      <div>

        <h3 className="font-bold">

          Connected Hospitals

        </h3>

        <p className="text-gray-500 text-sm">

          120+ verified hospitals
          across India.

        </p>

      </div>

    </div>

  </motion.div>

  {/* ---------------- Card 3 ---------------- */}

  <motion.div

    animate={{
      y:[0,-8,0]
    }}

    transition={{
      duration:3.5,
      repeat:Infinity
    }}

    className="
      absolute
      bottom-6
      left-10
      bg-white
      rounded-3xl
      shadow-xl
      p-6
      w-72
      border
    "

  >

    <div className="flex items-center gap-4">

      <div className="bg-blue-100 p-3 rounded-xl">

        <ShieldCheck className="text-blue-600"/>

      </div>

      <div>

        <h3 className="font-bold">

          Secure Platform

        </h3>

        <p className="text-gray-500 text-sm">

          End-to-end encrypted
          donor & hospital data.

        </p>

      </div>

    </div>

  </motion.div>

  {/* ---------------- Card 4 ---------------- */}

  <motion.div

    animate={{
      scale:[1,1.05,1]
    }}

    transition={{
      duration:2,
      repeat:Infinity
    }}

    className="
      absolute
      bottom-28
      -right-4
      bg-red-600
      text-white
      rounded-3xl
      px-7
      py-6
      shadow-2xl
    "

  >

    <h2 className="text-4xl font-black">

      98%

    </h2>

    <p className="text-red-100 font-semibold mt-2">

      Successful Matches

    </p>

  </motion.div>

</motion.div>

        </div>

      </div>


    </section>
  );
};

export default HeroSection;

