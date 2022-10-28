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

const Modal = ({ handleClose, setDifficulty }) => {
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
          <p className="font-bold text-4xl py-4 text-white">
            Select the diffculty level:
          </p>

          <div className="flex flex-col justify-center items-start relative right-[160px]">
            <label className="control control-radio">
              Easy
              <input
                onChange={() => setDifficulty(0)}
                type="radio"
                name="radio"
              />
              <div className="control_indicator"></div>
            </label>
            <label className="control control-radio">
              Medium
              <input
                onChange={() => setDifficulty(1)}
                type="radio"
                name="radio"
              />
              <div className="control_indicator"></div>
            </label>
            <label className="control control-radio">
              Hard
              <input
                onChange={() => setDifficulty(2)}
                type="radio"
                name="radio"
              />
              <div className="control_indicator"></div>
            </label>
          </div>

          <motion.button
            onClick={() => {
              navigate("/game");
            }}
            className="relative top-[5rem]"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <img src={"./images/5-02.png"} alt="tag" width={180} height={170} />
            <p className="z-21 relative bottom-[3.6rem] font-black text-[26px]">
              Start
            </p>
          </motion.button>
        </div>
 
        <div className="z-22 absolute right-[650px] top-[200px] h-[350px] w-[400px]">
          <img src={"./images/NicePng_character.png"} alt="tag" />
        </div>
      </motion.div>
    </Backdrop>
  );
};

export default Modal;
