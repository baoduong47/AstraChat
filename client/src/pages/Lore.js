import React from "react";
import { motion } from "framer-motion";

const loreData = {
  title: "Chronicles of Eorzea",
  introduction:
    "Welcome to the world of Eorzea, a realm steeped in magic, history, and myth. Here, heroes are forged in the fires of war, alliances are tested, and the fate of the world hangs by a thread. Discover the tales of legendary warriors, ancient gods, and the eternal struggle between light and darkness.",
  sections: [
    {
      title: "The World of Eorzea",
      content:
        "Eorzea is a vast and diverse continent, home to a myriad of races, cultures, and landscapes. From the bustling city-states of the Hyur to the mysterious forests of the Elezen, each region holds its own secrets and stories.",
    },
    {
      title: "City-States of Eorzea",
      content: `Eorzea is home to several powerful city-states, each with its own unique culture and history:
            - **Ul’dah**: A desert city rich in culture and wealth, ruled by a powerful merchant class.
            - **Limsa Lominsa**: A maritime city known for its fierce pirates and formidable navy.
            - **Gridania**: A city nestled within the dense forests, where the inhabitants live in harmony with nature.`,
    },
    {
      title: "Legendary Heroes",
      content: `Eorzea has been protected by many legendary heroes throughout history. Among the most revered are:
            - **Cloud Strife**: A former soldier who wields a giant sword and fights to protect the planet.
            - **Tifa Lockhart**: A martial artist with a kind heart, fighting alongside Cloud to bring peace.
            - **Tidus**: A skilled blitzball player who journeys through the world of Spira to save it from destruction.`,
    },
  ],
};

const Lore = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        className="text-4xl font-bold mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }} // Increased animation duration
      >
        {loreData.title}
      </motion.h1>

      <motion.p
        className="text-lg text-gray-700 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }} // Increased animation duration
      >
        {loreData.introduction}
      </motion.p>

      {loreData.sections.map((section, index) => (
        <motion.div
          key={index}
          className="mb-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: index * 0.5 }} // Increased duration and added delay for staggering
        >
          <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
          <p className="text-gray-600">{section.content}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default Lore;
