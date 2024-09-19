import { Carousel } from "flowbite-react";
import { motion } from "framer-motion";
import { useEffect } from "react";

const ArtworkCarousel = () => {
  const artworks = [
    {
      src: "/images/ff-artwork.webp",
      title: "Final Fantasy Artwork 1",
      description: "A beautiful scene from Final Fantasy.",
    },
    {
      src: "/images/ff16-risingtide.jpg",
      title: "Final Fantasy 16 Artwork",
      description: "Rising Tide",
    },
    {
      src: "/images/ff16-art.jpg",
      title: "Final Fantasy Artwork 2",
      description: "A majestic portrayal of a Final Fantasy character.",
    },
    {
      src: "/images/ffart3.jpeg",
      title: "Final Fantasy Artwork 3",
      description: "An epic battle scene from Final Fantasy.",
    },
    {
      src: "/images/ff16-art3.webp",
      title: "Final Fantasy 16 Artwork",
      description: "Clive and Jill",
    },
  ];

  return (
    <Carousel className="w-[350px] h-auto mt-10 relative" indicators={false}>
      {artworks.map((artwork, index) => (
        <div
          key={index}
          className="relative w-[350px] h-auto overflow-hidden rounded-lg"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-full h-full relative"
          >
            <img
              src={artwork.src}
              className="w-full h-auto object-cover"
              alt={artwork.title}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white p-4 opacity-0 hover:opacity-100 transition-opacity duration-300"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            >
              <h3 className="text-lg font-semibold ml-3">{artwork.title}</h3>
              <p className="text-sm ml-3 mb-1">{artwork.description}</p>
            </motion.div>
          </motion.div>
        </div>
      ))}
    </Carousel>
  );
};

export default ArtworkCarousel;
