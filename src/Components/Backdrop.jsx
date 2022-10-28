import React from "react";
import { motion } from "framer-motion";

const Backdrop = ({ onClick, children }) => {
  return (
    <motion.div
      className="absolute top-0 left-0 h-full w-full bg-[#000000e1] flex items-center justify-center overflow-y-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;
