import React from "react";
import { motion } from "framer-motion";
import {
  Hospital,
  Bell,
  Search,
  HeartHandshake,
  ArrowDown
} from "lucide-react";

const steps = [
  {
    icon: Hospital,
    title: "Hospital Creates Request",
    description:
      "A verified hospital raises an emergency blood request with patient details and urgency."
  },
  {
    icon: Bell,
    title: "Instant Notifications",
    description:
      "Compatible donors nearby receive real-time alerts within seconds."
  },
  {
    icon: Search,
    title: "Smart Matching",
    description:
      "LifeFlow intelligently filters eligible donors based on blood group, availability, and location."
  },
  {
    icon: HeartHandshake,
    title: "Successful Donation",
    description:
      "The donor connects with the hospital, completes the donation, and saves a life."
  }
];

const HowItWorks = () => {
  return (
    <section className="py-32 bg-gradient-to-b from-white to-red-50">

      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >

          <p className="uppercase tracking-[0.35em] text-red-600 font-bold mb-5">

            HOW IT WORKS

          </p>

          <h2 className="text-5xl font-black text-gray-900">

            Blood Donation

            <span className="block text-red-600">

              Made Intelligent

            </span>

          </h2>

          <p className="text-gray-600 mt-8 text-xl max-w-3xl mx-auto leading-9">

            LifeFlow automates every step of emergency blood
            coordination, ensuring faster response, verified
            donors and seamless hospital communication.

          </p>

        </motion.div>

        <div className="flex flex-col items-center">

          {steps.map((step, index) => {

            const Icon = step.icon;

            return (

              <React.Fragment key={index}>

                <motion.div

                  initial={{ opacity: 0, y: 40 }}

                  whileInView={{ opacity: 1, y: 0 }}

                  viewport={{ once: true }}

                  transition={{ delay: index * 0.15 }}

                  whileHover={{
                    scale: 1.03,
                    y: -8
                  }}

                  className="
                  bg-white
                  rounded-[30px]
                  shadow-[0_20px_60px_rgba(0,0,0,0.08)]
                  p-10
                  w-full
                  max-w-5xl
                  flex
                  gap-8
                  items-center
                "

                >

                  <div className="
                    w-20
                    h-20
                    rounded-3xl
                    bg-red-100
                    flex
                    items-center
                    justify-center
                    shrink-0
                  ">

                    <Icon
                      className="text-red-600"
                      size={38}
                    />

                  </div>

                  <div>

                    <h3 className="text-2xl font-black">

                      {step.title}

                    </h3>

                    <p className="text-gray-600 leading-8 mt-4">

                      {step.description}

                    </p>

                  </div>

                </motion.div>

                {index !== steps.length - 1 && (

                  <motion.div

                    animate={{
                      y: [0, 8, 0]
                    }}

                    transition={{
                      repeat: Infinity,
                      duration: 2
                    }}

                    className="py-6"

                  >

                    <ArrowDown
                      size={36}
                      className="text-red-500"
                    />

                  </motion.div>

                )}

              </React.Fragment>

            );

          })}

        </div>

      </div>

    </section>
  );
};

export default HowItWorks;