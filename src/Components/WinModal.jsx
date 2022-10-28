import { motion } from "framer-motion";
import Backdrop from "./Backdrop";
import { useNavigate } from "react-router-dom";
import "../App.css";
import "../index.css";

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const WinModal = ({ handleClose }) => {
  const navigate = useNavigate();

  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        // drag
        onClick={(e) => e.stopPropagation()}
        className="modal p-[100px] flex items-center justify-center z-20"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="flex flex-col items-center justify-center relative top-[4rem]">
          <p className="font-bold text-4xl py-4 text-white">Game over</p>

          <p className="font-bold text-2xl py-4 text-orange-300"> You Win!!!</p>

          <motion.button
            onClick={() => {
              navigate("/");
            }}
            className="relative top-[5rem]"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <img src={"./images/5-02.png"} alt="tag" width={180} height={170} />
            <p className="z-21 relative bottom-[3.6rem] font-black text-[26px]">
              New Game
            </p>
          </motion.button>
        </div>

        <div className="z-22 absolute right-[650px] top-[200px] h-[350px] w-[400px]">
          <img src={"./images/Knight-Warrior.png"} alt="tag" />
        </div>
      </motion.div>
    </Backdrop>
  );
};

export default WinModal;
