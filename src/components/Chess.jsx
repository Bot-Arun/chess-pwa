import { useState, useEffect } from "react";
import { Game } from "js-chess-engine";
import "../App.css";
import { motion, AnimatePresence } from "framer-motion";

import WinModal from "./WinModal";
import LoseModal from "./LoseModal";
import StartModal from "./StartModal";
import InstructionModal from "./InstructionModal";

let game = new Game();

function Chess({ difficulty }) {
  const [boardArray2, setBoardArray2] = useState({});

  // eslint-disable-next-line no-unused-vars
  let keys = Object.keys(boardArray2);
  let board = game.exportJson().pieces;

  const soundEn = 'UklGRnwFAABXQVZFZm10IBAAAAABAAEAQB8AAIA+AAACABAAZGF0YYgEAAANAG4A5AAmAO4ANAHfAM0AsACXAOMAQwEDAVUAzwC8AP0A0gClAPwA/QBxAFsAXADEAC4BtQDrAC4BNgEbAhUEfQjzEMQcQSzAOrpEOEeNPXYdmerdxeG0uqearpSzbLRfvMjRZPUpJrNTF3Izbw9dsDnNFxjy3doAzTrQU9IW12HTpdhu30brKPVm/+QMWBjJHh0bZBQADoYGRvy+9ATvROs76Lvgitcg08DV49+u8xwLoyD+Lm0xaC1VI30ZsRQeDcj/oO7B2A7IM776vv3Kp+BL9d4LNBoPIzAmNy61Mjc2RzawMgQnrxiQCDf37Omb4ararNZW1zPbu+Ii7Mr4AgcpFt0j0i0mMEUqNB2oDHH9Tu2X4rnYHtKizCvM09K23p7wWQVRGDIlEyiHJd0dYRAoB74At/q294/10/E38BLvCfCm9C79MAX0C2QPmRCKD8kObwxuCNYD3v1g+LryKuzF5+jlFObN6ATwA/et/i4FmAi0DE0PZBEPEi4SUg9tCpIELv+b+db08/EW8avxSvKz8lTzh/Rs9uT4Ovud/ab/igDPARICXgJCAocBYQG6AL//Sf+//2cBhQNoBpwJkAw3DtEO9Q2HDL4J/QR7/3v6UPUg8A3tcOr+6T/rHu7A8mv5pv8uBpwKlgzTDaINBAzMCXAGhAKo/9v8qvo8+f74K/mr+f/5Kvr/+c75GPk3+Lr3i/cL+OX4P/p5+139wv/9AUUEOQbRB3YIFQjxBtYFiQR7A2ICAAH+/s78PPp49wH10fIP8eTvOu9d77TwVfLQ9A33evnt+3D+rgE4BHoFbAYUBhwGPgXCBFQD3wAj/1z9DPyc+yX8Bv5D/xYA8f+n/nr9E/zt+gj6w/nf+fP5hfo6+7/86v5wAbEDqAWMBuYGPQczB8IGIgYFBSQDbQFPAKP/gP6f/Y79Of38/Qr/RAAoAUECAgPqAgcD+QJ+A/wCigL7AToB8QC7AFsBRwLlAiQD9QLRApsCOQLlAfgAGwD7/iP+xv2n/ev9y/6S/vr9Q/1w/Hf8p/xQ/Mr8Pf3q/T3/IAFAAzYEGQTyA9oDbwO0AqoBrQBD/6f9evy3++L6AftO+9j79/t9+7/63/m8+LL3HPfu9uX2U/fC9xz5LPsg/cH+BwAxAf0BGgI7An8CRAKxAqMCGQJaAY8Ae/9T/nX9SPxC+5f6JPrp+av5afm7+RT6WPoS+7z7nPyI/aL+yf+zAJEBgwJVA9YD+wOTA1sDqQJoAqQB+QCFAOH/Fv/3/Rb9avzs+/L7Gvxf/J/8jPx8/Jz8C/1F/eb9zf51/2kAcgEZAmMCowJyAhkCygEsAVUAj//i/mP+x/1u/XH9wf00/oD+Pf7G/c/97f0L/lT+nP70/uH+nf65/h3/uv/k/7X/Zf8F/1P++P2k/TH9wvxL/Mf7Yftb+4n77vsy/D78rPxD/Xf90/1l/qP+GP9m//L/sgAoAUUBZgG2AZIB0QE3AqUC1wLFAtcCmwL5Ad0B1AGAAd4BDwI3Am0CnAKsAmkC4AFaAYsAFQBi/2j/IP+8/kxJU1RUAAAASU5GT0lOQU0YAAAAY2hlc3NfbW92ZV9vbl9hbGFiYXN0ZXIASUFSVAYAAABtaDJvAABJQ1JEBgAAADIwMTYAAElHTlIMAAAAU291bmQgQ2xpcAAAaWQzIGwAAABJRDMEAEAAAABhAAAADAEgBQsuT0NfVENPTgAAAAsAAABTb3VuZCBDbGlwVElUMgAAABgAAABjaGVzc19tb3ZlX29uX2FsYWJhc3RlclREUkMAAAAFAAAAMjAxNlRQRTEAAAAFAAAAbWgybwA='
  const moveSound = new Audio(`data:audio/wav;base64,${soundEn}`)

  const [modalOpen, setModalOpen] = useState(false);
  const open = () => setModalOpen(true);
  const close = () => setModalOpen(false);

  const [coord, setCoord] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);

  function setCurrBoard() {
    let boardArray = {};
    let xaxis = {
      1: "A",
      2: "B",
      3: "C",
      4: "D",
      5: "E",
      6: "F",
      7: "G",
      8: "H",
    };
    let yaxis = {
      1: "1",
      2: "2",
      3: "3",
      4: "4",
      5: "5",
      6: "6",
      7: "7",
      8: "8",
    };

    for (let i = 1; i <= 8; i++) {
      board = game.exportJson().pieces;
      for (let j = 1; j <= 8; j++) {
        let piece = board[xaxis[i] + yaxis[j]];
        if (piece) {
          boardArray[xaxis[i] + yaxis[j]] = piece;
        } else {
          boardArray[xaxis[i] + yaxis[j]] = " ";
        }
      }
    }

    setBoardArray2({ ...boardArray });
    keys = Object.keys(boardArray2);
    // console.log(board);
  }

  const [isFinished, setIsFinished] = useState(false);
  const [checkmate, setCheckmate] = useState(false);
  const [currTurn, setCurrTurn] = useState("white");

  const [startmodal, setStartmodal] = useState(1);

  useEffect(() => {
    setCurrBoard();
    console.log("Check-Mate : " + checkmate + "\n Is-Finished : " + isFinished);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [possibleMoves, setPossibleMoves] = useState([]);
  const [fromPosition, setfromPosition] = useState("");

  const [white, setWhite] = useState("");
  const [black, setBlack] = useState("");
  const [history, setHistory] = useState("");

  const [aiMove, setAiMove] = useState(true);
  const [aiPosi, setAiPosi] = useState({});
  const [click, setClick] = useState(true);
  const [beginAnimation, setBeginAnimation] = useState(false);

  function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  const getLastMove = () => {
    const A = game.getHistory();
    const B = game.exportJson();
   if (A[A.length - 1].configuration.turn === "black")
      setWhite(white + "\t" + A[A.length - 1].from + "-" + A[A.length - 1].to);
    else
      setBlack(black + "\t" + A[A.length - 1].from + "-" + A[A.length - 1].to);

    setIsFinished(B.isFinished);
    setCheckmate(B.checkMate);
    setCurrTurn(B.turn);
    if(B.checkMate) {
      setBlack("");
      setWhite("");
      game=new Game();
    }
  };

  useEffect(() => {
    const f1 = async () => {
      if (game.getHistory().length === 0 || !click) return;
      setClick(false);
      game.aiMove(difficulty);
      var from = game.getHistory()[game.getHistory().length - 1]?.from;
      var to = game.getHistory()[game.getHistory().length - 1]?.to;
      console.log(from, to);
      var box1 = document.getElementById(from).getBoundingClientRect();
      var box2 = document.getElementById(to).getBoundingClientRect();
      setAiPosi({
        x1: box1.left,
        y1: box1.top,
        x2: box1.left,
        y2: box1.top,
        from: from,
        delay: 0,
      });
      await delay(500);
      setAiPosi({
        x1: box1.left,
        y1: box1.top,
        x2: box2.left,
        y2: box2.top,
        from: from,
        delay: 0.5,
      });
      await delay(1000);
      await moveSound.play();
      setCurrBoard();
      getLastMove();

      setClick(true);
      setAiPosi({});
    };
    f1();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aiMove]);

  const tempFn = async (x, coin, str) => {
    var box = document.getElementById(x).getBoundingClientRect();
    // console.log(x.top,x.left);
    if (!click) {
      return;
    }

    setClick(false);
    if (possibleMoves.length > 0 && possibleMoves.includes(x)) {
      setBeginAnimation(!beginAnimation);
      console.log("Possible Moves", possibleMoves);
      // console.log(fromPosition + " " + x);

      console.log(game.getHistory());

      setHistory(history + "  " + fromPosition + "-" + x);
      setCoord({ x: box.left, y: box.top });
      await delay(1000);
      game.move(fromPosition, x);
      await moveSound.play();
      console.log(game.exportJson().pieces);
      setCurrBoard();
      getLastMove();
      setfromPosition("");

      setCurrTurn("black");
      console.log(
        "Before Ai -- Check-Mate : " +
          checkmate +
          "\nIs-Finished : " +
          isFinished +
          "\nCurrent Turn: " +
          currTurn
      );
      // console.log(game.getHistory());
      setPossibleMoves([...[]]);
      setClick(true);
      setAiMove(!aiMove);
      // getLastMove();
    } else if (str === "w" && game.moves(x).length > 0) {
      setBeginAnimation(true);
      setCoord({ x: box.left, y: box.top });
      setfromPosition(x);
      setPossibleMoves([...game.moves(x)]);
      setClick(true);
    }
    //   console.log("Possible Moves", possibleMoves);
    setClick(true);
  };

  return (
    <div
      className=" h-screen -z-50 "
      style={{
        backgroundImage: 'url("./images/Background.jpg")',
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "100% 100%",
      }}
    >
      {aiPosi.x1 !== undefined && (
        <motion.div
          className="draggable absolute "
          initial={{ opacity: 1, y: aiPosi.y1, x: aiPosi.x1, zIndex: 100 }}
          animate={{
            opacity: 1,
            y: aiPosi.y2,
            x: aiPosi.x2,
            transition: { duration: aiPosi.delay },
          }}
        >
          <div className="bg-rd-500 w-12 h-12">
            <img
              draggable={false}
              src={
                "./images/new_images/" +
                (boardArray2[aiPosi.from]?.toUpperCase() ===
                boardArray2[aiPosi.from]
                  ? "w"
                  : "b") +
                boardArray2[aiPosi.from] +
                ".png"
              }
              className="z-[100] select-none top-[-1rem] absolute drag pointer-events-none "
              alt=""
            />
          </div>
        </motion.div>
      )}
      {possibleMoves.length > 0 && (
        <motion.div
          className="draggable absolute "
          initial={{ opacity: 1, y: 0, x: 0, zIndex: 100 }}
          animate={{
            opacity: 1,
            y: coord.y,
            x: coord.x,
            transition: { duration: beginAnimation ? 0 : 0.5 },
          }}
          onClick={() => setIsVisible(!isVisible)}
        >
          <div className="bg-rd-500 w-12 h-12">
            <img
              key={fromPosition}
              draggable={false}
              src={
                "./images/new_images/" +
                (boardArray2[fromPosition]?.toUpperCase() ===
                boardArray2[fromPosition]
                  ? "w"
                  : "b") +
                boardArray2[fromPosition] +
                ".png"
              }
              className="z-[100] select-none top-[-1rem] absolute drag pointer-events-none "
              alt=""
            />
          </div>
        </motion.div>
      )}
      <div className="flex h-full">

        {/* TESTING  */}
        <div className="basis-1/4 left-bar">
          {/* <button
            onClick={() => {
              modalOpen ? close() : open();
            }}
          >
            Click
          </button> */}
        </div>

        {/* CHESSBOARD */}
        <div className="basis-1/2 w-fit px-20 -z-0 ">
          <div
            className=" w-[34rem]  h-[37rem]  pl-[12%] pr-[13%] pt-[4rem] pb-[10.2rem] "
            style={{
              backgroundImage: 'url("./images/chessboard-02.png")',
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "100% 100%",
            }}
          >
            <div className="bg-rd-400 h-[100%]   flex-col  ">
              <Board
                fromPosition={fromPosition}
                boardArray2={boardArray2}
                possibleMoves={possibleMoves}
                tempFn={tempFn}
                coord={coord}
                aiPosi={aiPosi}
                setCoord={setCoord}
                setBeginAnimation={setBeginAnimation}
                beginAnimation={beginAnimation}
              ></Board>
            </div>
          </div>
        </div>

        <div className="my-6  h-[100vh] basis-1/2 right-bar">

          {/* MOVES PLAYED */}
          <div
            className="h-[40vh] py-[30px] px-[90px] font-semibold text-lg text-white"
            style={{
              background:
                'transparent url("./images/difficulty-level.png") no-repeat center center',
              backgroundSize: "cover",
            }}
          >
            <div className="my-6 h-[140px] grid grid-cols-2 gap-10 overflow-x-hidden">
              <div>
                <h1 className="font-semibold text-amber-300">White Moves:</h1>
                {black}
              </div>
              <div>
                <h1 className="font-semibold text-amber-300">Black Moves:</h1>
                {white}
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {startmodal === 1 && <StartModal setStartmodal={setStartmodal} />}
        {startmodal === 2 && <InstructionModal setStartmodal={setStartmodal} />}
        {checkmate &&
          (currTurn === "black" ? (
            <WinModal modalopen={modalOpen} handleClose={close} />
          ) : (
            <LoseModal modalopen={modalOpen} handleClose={close} />
          ))}
      </AnimatePresence>
    </div>
  );
}

const Board = ({
  boardArray2,
  tempFn,
  possibleMoves,
  fromPosition,
  aiPosi,
  setBeginAnimation,
  setCoord,
}) => {
  let x = [8, 7, 6, 5, 4, 3, 2, 1];
  let y = ["A", "B", "C", "D", "E", "F", "G", "H"];
  // console.log("board arr", boardArray2);
  var X = x.map((p) => {
    var Y = y.map((s) => {
      var str = "b";
      if (boardArray2[s + p]?.toUpperCase() === boardArray2[s + p]) {
        str = "w";
      }
      return (
        <div
          key={s}
          draggable={false}
          id={s + p}
          className={
            "flex-auto select-none relative z-20  m-[1px] " +
            (possibleMoves.includes(s + p) && "bg-[#6f69]")
          }
          onClick={(e) => {
            tempFn(s + p, boardArray2[s + p], str);
          }}
        >
          {boardArray2[s + p] !== " " &&
            s + p !== aiPosi.from &&
            (fromPosition !== s + p || possibleMoves.length === 0) && (
              <img
                key={s + p}
                draggable={false}
                src={"./images/new_images/" + str + boardArray2[s + p] + ".png"}
                className="z-10 select-none top-[-1rem] absolute drag pointer-events-none "
                alt=""
              />
            )}
        </div>
      );
    });
    return (
      <div key={p} className="flex h-[12.5%] relative flex-auto w-full ">
        {Y}
      </div>
    );
  });
  return <>{X}</>;
};

export default Chess;
