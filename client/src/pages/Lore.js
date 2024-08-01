import React from "react";
import { motion } from "framer-motion";

const loreData = {
  title: "History of the Final Fantasy Franchise",
  introduction:
    "Final Fantasy is a legendary video game franchise that has captivated millions of players worldwide. Since its inception in 1987, the series has become synonymous with epic storytelling, groundbreaking visuals, and unforgettable characters. This page chronicles the evolution of Final Fantasy, highlighting its most iconic titles and moments.",
  sections: [
    {
      title: "The Origins",
      content:
        "Final Fantasy was created by Hironobu Sakaguchi and first released in 1987 by Square (now Square Enix). Initially developed as a last-ditch effort to save the company, the game was a surprise success, leading to a long-running series that continues to this day.",
    },
    {
      title: "Iconic Titles",
      content: `Over the years, many titles in the Final Fantasy series have become iconic:
            - **Final Fantasy VII**: Released in 1997, it revolutionized the RPG genre with its 3D graphics, cinematic cutscenes, and deep narrative.
            - **Final Fantasy X**: The first game in the series to feature voice acting and fully 3D environments, it was released in 2001 and remains a fan favorite.
            - **Final Fantasy XIV**: Originally launched in 2010 and later relaunched as "A Realm Reborn" in 2013, it is a massively multiplayer online game that continues to evolve with new expansions.`,
    },
    {
      title: "Legendary Characters",
      content: `Final Fantasy has introduced many memorable characters who have become icons in gaming:
            - **Cloud Strife**: The protagonist of Final Fantasy VII, known for his iconic Buster Sword and complex character arc.
            - **Tifa Lockhart**: A skilled martial artist and loyal companion of Cloud, she is a key character in Final Fantasy VII.
            - **Tidus**: The main character of Final Fantasy X, who embarks on a journey to save the world of Spira.`,
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
