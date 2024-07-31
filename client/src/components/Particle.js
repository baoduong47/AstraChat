import React from "react";
import { motion } from "framer-motion";

const colors = ["#FFD700", "#FFEC8B", "#FFFACD", "#FFFFFF"];
const generateRandomColor = () =>
  colors[Math.floor(Math.random() * colors.length)];

const sizes = [10, 15, 20, 25];
const generateRandomSize = () =>
  sizes[Math.floor(Math.random() * sizes.length)];

const generateRandom = (min, max) => Math.random() * (max - min) + min;

const generateRandomDelay = (min, max) => Math.random() * (max - min) + min;

const Particle = React.memo(() => {
  const size = generateRandomSize();
  const duration = generateRandom(6, 8);
  const delay = generateRandomDelay(0, 5);
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        backgroundColor: generateRandomColor(),
        left: `${generateRandom(0, 100)}%`,
        bottom: "0%",
        filter: "blur(4px)",
        opacity: 0.7,
        willChange: "transform, opacity",
      }}
      initial={{ opacity: 0, y: 0, x: 0 }}
      animate={{
        opacity: [0, 0.7, 0],
        y: -800,
        x: [
          0,
          generateRandom(-10, 10),
          generateRandom(-5, 5),
          generateRandom(-8, 8),
          0,
        ],
      }}
      transition={{
        duration,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
        delay,
      }}
    />
  );
});

const Particles = ({ count = 50 }) => {
  return (
    <div className="fixed bottom-0 left-0 w-full h-full overflow-hidden pointer-events-none">
      {[...Array(count)].map((_, i) => (
        <Particle key={i} />
      ))}
    </div>
  );
};

export default Particles;
