import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WinModal from "./WinModal";
import LoseModal from "./LoseModal";
import { Game } from "js-chess-engine";

const game = new Game();

function Chess({ difficulty }) {
  const [boardArray2, setBoardArray2] = useState({});

  const [modalOpen, setModalOpen] = useState(false);
  const open = () => setModalOpen(true);
  const close = () => setModalOpen(false);

  // eslint-disable-next-line no-unused-vars
  let keys = Object.keys(boardArray2);
  let board = game.exportJson().pieces;

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
  // const [currTurn, setCurrTurn] = useState("white");
  useEffect(() => {
    // console.log(difficulty);
    setCurrBoard();
    console.log("Check-Mate : " + checkmate + "\n Is-Finished : " + isFinished);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [possibleMoves, setPossibleMoves] = useState([]);
  const [fromPosition, setfromPosition] = useState("");
  const [white, setWhite] = useState("");
  const [black, setBlack] = useState("");

  function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  const getLastMove = () => {
    const A = game.getHistory();
    const B = game.exportJson();
    console.log(B);
    // console.log(
    //   "Moves made : " + A[A.length - 1].from + " " + A[A.length - 1].to
    // );
    if (A[A.length - 1].configuration.turn === "black")
      setWhite(white + "\t" + A[A.length - 1].from + "-" + A[A.length - 1].to);
    else
      setBlack(black + "\t" + A[A.length - 1].from + "-" + A[A.length - 1].to);
    // const check_Mate = B.checkMate;
    // const is_Finished = B.isFinished;
    // console.log(A[A.length - 1].configuration);
    setIsFinished(B.isFinished);
    setCheckmate(B.checkMate);
    // setCurrTurn(B.turn);
  };

  const tempFn = async (x, coin) => {
    // console.log(game.exportJson());
    if (possibleMoves.length > 0 && possibleMoves.includes(x)) {
      // console.log("Possible Moves", possibleMoves);
      // console.log(fromPosition + " " + x);

      game.move(fromPosition, x);
      // console.log(game.exportJson().pieces);
      setCurrBoard();
      getLastMove();
      // console.log("Done");
      setfromPosition("");
      

      await delay(1500);
      // setCurrTurn("black");
      game.aiMove(difficulty);
      setCurrBoard();
      getLastMove();
      setPossibleMoves([...[]]);
    } else if (possibleMoves.length > 0) {
      setPossibleMoves([...[]]);
    } else {
      //x,y
    
      setPossibleMoves([...game.moves(x)]);
      setfromPosition(x);
      console.log("possilbe Moves", possibleMoves);
    }
  };

  return (
    <div
      className=" h-screen text-center -z-50 "
      style={{
        backgroundImage: "url('./images/Background/Background.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "100% 100%",
      }}
    >
      <div className="flex h-full">
        <div className="basis-1/4 left-bar">
          <button
            onClick={() => {
              modalOpen ? close() : open();
            }}
          >
            Click
          </button>
        </div>

        {/* CHESSBOARD */}
        <div className="basis-1/2 w-fit px-20 -z-0 ">
          <div
            className=" w-[50rem] pl-[12%] pr-[13%] pt-[5.9rem] py-[15.4rem] "
            style={{
              backgroundImage: 'url("./images/chessboard-02.png")',
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "100% 100%",
            }}
          >
            <div className="bg-rd-400 h-[100%] flex-col">
              <Board
                boardArray2={boardArray2}
                possibleMoves={possibleMoves}
                tempFn={tempFn}
              />
            </div>
          </div>
        </div>

        <div className="my-6 h-[100vh] basis-1/2 right-bar">
          {/* DIFFICULTY LEVEL */}
          {/* <div
            className="flex flex-col justify-center items-start h-[40vh]"
            style={{
              background:
                'transparent url("./images/difficulty-level.png") no-repeat center center',
              backgroundSize: "cover",
            }}
          >
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
          </div> */}

          {/* MOVES PLAYED */}
          <div
            className="flex flex-col justify-center items-center h-[40vh] px-[90px] font-semibold text-lg text-white"
            style={{
              background:
                'transparent url("./images/difficulty-level.png") no-repeat center center',
              backgroundSize: "cover",
            }}
          >
            <div className="grid grid-cols-2 gap-10">
              <div className="">
                <h1 className="font-semibold text-amber-300">White Moves:</h1>
                {black}
              </div>
              <div className="">
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
        {checkmate && <LoseModal modalopen={modalOpen} handleClose={close} />}
      </AnimatePresence>
    </div>
  );
}

const Board = ({ boardArray2, tempFn, possibleMoves }) => {
  let x = [8, 7, 6, 5, 4, 3, 2, 1];
  let y = ["A", "B", "C", "D", "E", "F", "G", "H"];
  // console.log("board A", boardArray2);

  // const [coord, setCoord] = useState({ xCoord: 0, yCoord: 0 });
  // const getCoord = (e) => {
  //   setCoord({ xCoord: e.screenX, yCoord: e.screenY });
  // };

  var X = x.map((p) => {
    var Y = y.map((s) => {
      return (
        <div
          key={s}
          draggable={false}
          className={
            "flex-auto select-none relative z-20 m-[1px] " +
            (possibleMoves.includes(s + p) && "bg-[#6f69]")
          }
          onClick={(e) => {
            // getCoord(e);
            tempFn(s + p, boardArray2[s + p]);
          }}
        >
          {boardArray2[s + p] !== " " && (
            <div>
              <img
                key={s + p}
                draggable={false}
                src={"./images/new_images/" + str + boardArray2[s + p] + ".png"}
                className="z-10 select-none top-[-1rem] absolute drag pointer-events-none"
                alt=""
              />
            </div>
          )}
          {/* {coord.xCoord + " " + coord.yCoord} */}
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
