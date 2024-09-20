import React from "react";
import { motion } from "framer-motion";

const AnimatedText = ({ text, delay = 0 }) => {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay,
      },
    },
  };

  const child = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
  };

  return (
    <motion.span
      variants={container}
      initial="hidden"
      animate="visible"
      className="inline"
    >
      {words.map((word, index) => (
        <motion.span key={index} variants={child} className="inline">
          {word}&nbsp;
        </motion.span>
      ))}
    </motion.span>
  );
};

export default AnimatedText;
