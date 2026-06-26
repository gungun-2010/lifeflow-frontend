import React from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Droplets,
  Hospital,
  Users,
} from "lucide-react";

const stats = [
  {
    icon: Heart,
    value: "25,000+",
    title: "Lives Impacted",
    color: "bg-red-100 text-red-600",
  },
  {
    icon: Droplets,
    value: "8,500+",
    title: "Blood Donations",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: Hospital,
    value: "320+",
    title: "Partner Hospitals",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: Users,
    value: "18,000+",
    title: "Registered Donors",
    color: "bg-purple-100 text-purple-600",
  },
];

const ImpactStats = () => {
  return (
    <section className="py-32 bg-gradient-to-b from-white to-red-50 overflow-hidden">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >

          <p className="uppercase tracking-[0.35em] text-red-600 font-bold mb-5">
            OUR IMPACT
          </p>

          <h2 className="text-5xl font-black text-gray-900">

            Every Donation

            <span className="block text-red-600">

              Creates Hope

            </span>

          </h2>

          <p className="max-w-3xl mx-auto mt-8 text-gray-600 text-xl leading-9">

            Every successful donation strengthens communities,
            supports hospitals and gives patients another chance
            at life.

          </p>

        </motion.div>

        {/* Stats */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {stats.map((stat, index) => {

            const Icon = stat.icon;

            return (

              <motion.div

                key={index}

                initial={{ opacity: 0, y: 40 }}

                whileInView={{ opacity: 1, y: 0 }}

                viewport={{ once: true }}

                transition={{ delay: index * 0.12 }}

                whileHover={{
                  y: -10,
                  scale: 1.03,
                }}

                className="
                  bg-white
                  rounded-[32px]
                  p-10
                  text-center
                  shadow-[0_15px_45px_rgba(0,0,0,0.08)]
                  border
                  border-gray-100
                  transition-all
                  duration-300
                "

              >

                <div
                  className={`
                    w-20
                    h-20
                    rounded-3xl
                    mx-auto
                    mb-8
                    flex
                    items-center
                    justify-center
                    ${stat.color}
                  `}
                >

                  <Icon size={36} />

                </div>

                <h2 className="text-5xl font-black text-gray-900 mb-4">

                  {stat.value}

                </h2>

                <p className="text-gray-600 text-lg font-medium">

                  {stat.title}

                </p>

              </motion.div>

            );

          })}

        </div>

        {/* Bottom Quote */}

        <motion.div

          initial={{ opacity: 0, y: 40 }}

          whileInView={{ opacity: 1, y: 0 }}

          viewport={{ once: true }}

          transition={{ delay: 0.2 }}

          className="
            mt-24
            bg-white
            rounded-[36px]
            p-14
            shadow-[0_20px_60px_rgba(0,0,0,0.08)]
            border
            border-gray-100
            text-center
          "

        >

          <h3 className="text-4xl font-black text-gray-900 mb-6">

            Every Number Represents

            <span className="block text-red-600">

              A Life Touched

            </span>

          </h3>

          <p className="text-gray-600 text-lg leading-9 max-w-4xl mx-auto">

            Behind every successful donation is a family finding hope,
            a hospital delivering timely care and a volunteer choosing
            to make a difference. LifeFlow exists to make those moments
            happen faster, safer and more reliably.

          </p>

        </motion.div>

      </div>

    </section>
  );
};

export default ImpactStats;