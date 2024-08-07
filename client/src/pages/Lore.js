import React from "react";
import { motion } from "framer-motion";

const loreData = {
  title: "History of the Final Fantasy Franchise",
  introduction: `Vivi Ornitier is a beloved character from Final Fantasy IX, known
              for his iconic black mage appearance, featuring a wide-brimmed
              hat, glowing yellow eyes, and a timid, innocent demeanor. Despite
              his youthful and somewhat naive nature, Vivi grapples with
              profound existential questions about life, death, and his purpose.`,
  sections: [
    {
      title: "Creation",
      content:
        " Vivi was created in the Black Mage Village, a secretive place where Black Mages are produced as weapons of war. These Black Mages are manufactured using mist, a substance that pervades the world of Final Fantasy IX and has various mystical properties. Unlike other Black Mages, Vivi was an early prototype, which is why he possesses a more developed consciousness and a soul. This gives him a sense of individuality and self-awareness, setting him apart from the other Black Mages, who mostly function as emotionless soldiers.",
    },
    {
      title: "Early Life",
      content: `After his creation, Vivi somehow ended up in the care of a Qu named Quan, who found him wandering alone in the wilderness. Quan, a member of a species known for their insatiable appetite, initially took Vivi in, believing that he could eventually eat him. However, over time, Quan grew attached to Vivi, raising him as a grandson. Vivi was unaware of his true origins and believed himself to be a regular, albeit peculiar, child.`,
    },
    {
      title: "Journey to Alexandria",
      content: `After Quan's passing, Vivi continued to live in Quan's Dwelling, a secluded area where he spent most of his time alone. His journey truly begins when he leaves his home and travels to Alexandria to see a play by Tantalus, a famous theater troupe. This event leads him to join Zidane and the other characters in their adventure, where he slowly uncovers the truth about his origins and the fate of the Black Mages.`,
    },
  ],
};

const Lore = () => {
  return (
    <div className="flex flex-col mt-6">
      <div className="ml-6">
        <motion.h1
          className="text-4xl font-bold mb-6 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {loreData.title}
        </motion.h1>

        <motion.p
          className="text-lg text-gray-700 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <div className="relative">
            <img
              src="/images/Vivi.webp"
              className="float-left w-60 h-auto mr-4 mb-2"
              alt="Vivi"
            />
            <h2 className="text-5xl font-semibold mb-4">Vivi Ornitier</h2>
            <p className="text-lg text-gray-700">{loreData.introduction}</p>
          </div>
        </motion.p>

        {loreData.sections.map((section, index) => (
          <motion.div
            key={index}
            className="mb-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: index * 0.5 }}
          >
            <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
            <p className="text-gray-600">{section.content}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Lore;
