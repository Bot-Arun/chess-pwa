import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "./Modal";

const Home = ({setDifficulty}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const open = () => setModalOpen(true);
  const close = () => setModalOpen(false);

  return (
    <div
      className="h-screen bg-cover bg-center flex justify-center items-center"
      style={{
        backgroundImage: "url('./images/peakpx-2.jpg')",
      }}
    >
      <motion.button
        // drag
        onClick={() => {
          modalOpen ? close() : open();
        }}
        className="relative top-[25%]"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <img src={"./images/2-02.png"} alt="tag" />
        <p className="z-10 relative bottom-[5.6rem] font-black text-[30px]">
          New Game
        </p>
      </motion.button>

      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {modalOpen && <Modal modalopen={modalOpen} handleClose={close} setDifficulty={setDifficulty}/>}
      </AnimatePresence>
    </div>
  );
};

export default Home;
