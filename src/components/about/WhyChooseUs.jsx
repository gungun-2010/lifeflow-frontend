import React from "react";
import { motion } from "framer-motion";
import {
  BrainCircuit,
  BellRing,
  ShieldCheck,
  HeartHandshake
} from "lucide-react";

const features = [
  {
    icon: BrainCircuit,
    title: "AI Powered Matching",
    description:
      "Compatible donors are intelligently matched using blood group, eligibility, location and availability.",
    color: "from-red-500 to-red-600"
  },
  {
    icon: BellRing,
    title: "Real-Time Alerts",
    description:
      "Hospitals instantly notify nearby eligible donors during critical emergencies.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: ShieldCheck,
    title: "Verified & Secure",
    description:
      "Every hospital and donor is authenticated while sensitive information remains protected.",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: HeartHandshake,
    title: "Community Impact",
    description:
      "Encouraging voluntary blood donation while reducing emergency response time across India.",
    color: "from-pink-500 to-rose-500"
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-32 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >

          <p className="uppercase tracking-[0.35em] text-red-600 font-bold mb-5">

            WHY LIFEFLOW

          </p>

          <h2 className="text-5xl font-black text-gray-900">

            Built for Speed.

            <span className="block text-red-600">

              Trusted for Life.

            </span>

          </h2>

          <p className="max-w-3xl mx-auto text-gray-600 text-xl mt-8 leading-9">

            LifeFlow combines technology, healthcare and community
            into one intelligent platform that makes blood donation
            faster, safer and more reliable.

          </p>

        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {features.map((feature, index) => {

            const Icon = feature.icon;

            return (

              <motion.div

                key={index}

                initial={{ opacity: 0, y: 40 }}

                whileInView={{ opacity: 1, y: 0 }}

                viewport={{ once: true }}

                transition={{
                  delay: index * 0.15
                }}

                whileHover={{
                  y: -12,
                  scale: 1.03
                }}

                className="
                bg-white
                rounded-[32px]
                border
                border-gray-100
                shadow-[0_15px_50px_rgba(0,0,0,0.08)]
                p-10
                transition-all
                duration-300
              "

              >

                <div
                  className={`
                  w-20
                  h-20
                  rounded-3xl
                  bg-gradient-to-r
                  ${feature.color}
                  flex
                  items-center
                  justify-center
                  mb-8
                  shadow-lg
                `}
                >

                  <Icon
                    className="text-white"
                    size={36}
                  />

                </div>

                <h3 className="text-2xl font-black text-gray-900 mb-5">

                  {feature.title}

                </h3>

                <p className="text-gray-600 leading-8">

                  {feature.description}

                </p>

              </motion.div>

            );

          })}

        </div>

      </div>

    </section>
  );
};

export default WhyChooseUs;