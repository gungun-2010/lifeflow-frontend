import React from "react";
import { motion } from "framer-motion";
import {
  Heart,
  ArrowRight,
  Building2
} from "lucide-react";

const CTASection = () => {
  return (
    <section className="relative overflow-hidden py-32 bg-gradient-to-b from-white to-red-50">

      {/* Background Decoration */}

      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-red-100 blur-3xl opacity-40"></div>

      <div className="absolute -bottom-40 -right-40 w-[450px] h-[450px] rounded-full bg-pink-100 blur-3xl opacity-40"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="
            bg-white
            rounded-[40px]
            border
            border-gray-100
            shadow-[0_20px_60px_rgba(0,0,0,0.08)]
            p-12
            lg:p-20
            text-center
          "
        >

          {/* Badge */}

          <div className="inline-flex items-center gap-3 bg-red-50 rounded-full px-6 py-3 mb-8">

            <Heart
              className="text-red-600"
              size={20}
            />

            <span className="font-semibold text-red-600">
              Join the LifeFlow Community
            </span>

          </div>

          {/* Heading */}

          <h2 className="text-5xl lg:text-6xl font-black text-gray-900 leading-tight">

            Together,

            <span className="block text-red-600">

              We Can Save Lives.

            </span>

          </h2>

          {/* Description */}

          <p className="max-w-3xl mx-auto mt-8 text-xl leading-9 text-gray-600">

            LifeFlow connects compassionate donors, trusted hospitals
            and communities through one intelligent platform,
            ensuring that no patient has to wait for blood
            during a medical emergency.

          </p>

          {/* Buttons */}

          <div className="flex flex-wrap justify-center gap-6 mt-14">

            <motion.button
              whileHover={{
                scale: 1.05,
                y: -3
              }}
              whileTap={{
                scale: 0.97
              }}
              className="
                bg-red-600
                hover:bg-red-700
                text-white
                px-8
                py-4
                rounded-xl
                font-semibold
                flex
                items-center
                gap-3
                transition-all
                shadow-lg
              "
            >
              Become a Donor

              <ArrowRight size={20} />

            </motion.button>

            <motion.button
              whileHover={{
                scale: 1.05,
                y: -3
              }}
              whileTap={{
                scale: 0.97
              }}
              className="
                border-2
                border-red-600
                text-red-600
                hover:bg-red-600
                hover:text-white
                px-8
                py-4
                rounded-xl
                font-semibold
                flex
                items-center
                gap-3
                transition-all
              "
            >

              <Building2 size={20} />

              Register Hospital

            </motion.button>

          </div>

        </motion.div>

      </div>

    </section>
  );
};

export default CTASection;