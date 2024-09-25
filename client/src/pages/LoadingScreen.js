import React from "react";
import { motion } from "framer-motion";

const LoadingScreen = () => {
  return (
    <div
      className="flex flex-col items-center justify-center h-screen text-white"
      style={{
        backgroundImage: "url('/images/loading-2.jpeg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        fontFamily: "Quicksand, sans-serif",
        position: "relative",
      }}
    >
      <div className="flex flex-col items-center space-y-2 mb-5">
        <motion.div
          style={{
            width: "80%",
            height: "10px",
            backgroundColor: "#d3d3d3",
            borderRadius: "10px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <motion.div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "beige",
              borderRadius: "10px",
            }}
            animate={{ x: ["-100%", "0%"] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          />
        </motion.div>
      </div>
      <div className="absolute bottom-5 right-0 flex items-center">
        <motion.div
          style={{
            width: "25px",
            height: "25px",
            border: "4px solid beige",
            borderTop: "4px solid transparent",
            borderRadius: "50%",
            marginRight: "10px",
          }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        />
        <p
          className="text-xl font-bold"
          style={{
            color: "beige",
            textShadow: "2px 2px 4px #000000",
            marginRight: "15px",
          }}
        >
          Now Loading...
        </p>
        <img src="/images/kupo.gif" alt="Kupo" className="w-24 h-24" />
      </div>
    </div>
  );
};

export default LoadingScreen;
