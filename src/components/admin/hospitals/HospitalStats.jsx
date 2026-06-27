import {
  Building2,
  BadgeCheck,
  Clock3,
  Ban,
} from "lucide-react";

const HospitalStats = ({ hospitals = [] }) => {

  const cards = [
    {
      title: "Registered",
      value: hospitals.length,
      icon: Building2,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Verified",
      value: hospitals.filter(
        (hospital) => hospital.isVerified
      ).length,
      icon: BadgeCheck,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      title: "Pending",
      value: hospitals.filter(
        (hospital) =>
          !hospital.isVerified &&
          !hospital.isBlocked
      ).length,
      icon: Clock3,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      title: "Blocked",
      value: hospitals.filter(
        (hospital) => hospital.isBlocked
      ).length,
      icon: Ban,
      color: "text-red-600",
      bg: "bg-red-50",
    },
  ];

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

      {cards.map((card) => {

        const Icon = card.icon;

        return (

          <div
            key={card.title}
            className="
              bg-white
              rounded-3xl
              border
              border-gray-200
              p-7
              shadow-sm
              hover:shadow-lg
              hover:-translate-y-1
              transition-all
            "
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-xs uppercase tracking-[0.25em] text-gray-400 font-black">
                  {card.title}
                </p>

                <h2 className="text-5xl font-black mt-5">
                  {card.value}
                </h2>

              </div>

              <div
                className={`
                  w-16
                  h-16
                  rounded-2xl
                  flex
                  items-center
                  justify-center
                  ${card.bg}
                `}
              >

                <Icon
                  className={card.color}
                  size={28}
                />

              </div>

            </div>

          </div>

        );

      })}

    </div>
  );
};

export default HospitalStats;