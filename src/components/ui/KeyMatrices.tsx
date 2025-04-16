import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

type BoxType = {
  title: string;
  value: string;
};

// Reusable hover effect wrapper
const HoverWrapper = ({
  children,
  index,
  hoveredIndex,
  setHoveredIndex,
}: {
  children: React.ReactNode;
  index: number;
  hoveredIndex: number | null;
  setHoveredIndex: React.Dispatch<React.SetStateAction<number | null>>;
}) => (
  <div
    className="relative group cursor-pointer"
    onMouseEnter={() => setHoveredIndex(index)}
    onMouseLeave={() => setHoveredIndex(null)}
  >
    <AnimatePresence>
      {hoveredIndex === index && (
        <motion.span
          layoutId="hoverBackground"
          className="absolute inset-0 block bg-neutral-200/60 dark:bg-slate-800/50 rounded-xl z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.2 } }}
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
        />
      )}
    </AnimatePresence>
    <div className="relative z-10">{children}</div>
  </div>
);

const KeyMatrices = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const boxes: BoxType[] = [
    { title: "Active Certificates", value: "120+" },
    { title: "Pending Requests", value: "35" },
    { title: "Verified Issuers", value: "22" },
    { title: "Revoked Certificates", value: "10" },
    { title: "Total Categories", value: "8" },
    { title: "System Uptime", value: "99.9%" },
  ];

  return (
    <section className="w-full py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Key Matrices</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {boxes.map((box, idx) => (
          <HoverWrapper
            key={idx}
            index={idx}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
          >
            <div className="matrix-box p-6 bg-white dark:bg-slate-900 shadow-md rounded-xl transition-all duration-300 hover:shadow-xl">
              <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                {box.title}
              </h2>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {box.value}
              </p>
            </div>
          </HoverWrapper>
        ))}
      </div>
    </section>
  );
};

export default KeyMatrices;
