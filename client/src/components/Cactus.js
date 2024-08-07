import { motion } from "framer-motion";
import { useState } from "react";

const Cactus = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  const messages = [
    "1000 Needles!",
    "Sharp and ready!",
    "You can't outrun me!",
    "Desert sprinter!",
    "Ready to sting!",
    "Speed demon!",
    "Feeling prickly?",
    "Watch out for my needles!",
    "Cactuar dash!",
    "Try and catch me!",
    "Cactuar power!",
    "Always on point!",
  ];

  const handleCactusClick = () => {
    setIsVisible(true);
    setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
  };

  return (
    <div className="relative">
      <motion.div
        className="cactus-container fixed bottom-0 left-5"
        initial={{ rotate: 0 }}
        animate={{ rotate: 0 }}
        whileHover={{
          rotate: [0, -15, 0],
          transition: {
            duration: 1.5,
            ease: "easeInOut",
            repeat: Infinity,
          },
        }}
        onClick={handleCactusClick}
      >
        <img src="/images/cactus.png" className="w-20 h-auto" alt="Cactus" />
        {isVisible && (
          <div className="cactus-bubble absolute bottom-32 left-24 translate-y-full -translate-x-10 bg-white border border-gray-300 rounded-lg p-2 shadow-lg inline-block min-w-[100px] max-w-[120px] whitespace-normal">
            <p className="text-xs text-gray-700 text-center">
              {messages[messageIndex]}
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Cactus;
