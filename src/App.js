import { useState, useEffect, useCallback } from "react";
import { Game } from "js-chess-engine";
import "./App.css";
import io from "socket.io-client";

// const game1 = new Game();

const socket = io("https://online-chess-back-end.herokuapp.com/");

function App() {
  const [game, setGame] = useState(new Game());
  const [room, setRoom] = useState(455);
  const [boardArray2, setBoardArray2] = useState({});
  const [difficulty, setDifficulty] = useState(0);
  const [counter, setCounter] = useState(0);
  const [counter2, setCounter2] = useState(0);
  const sendMessage = async () => {
    // await delay(1000);
    const currBoardArray=await boardArray2;
    console.log("Send message array")
    console.log(currBoardArray);
    // await delay(1000);
    const data = {
      room: room,
      game: await game,
      boardArray2: currBoardArray
    };
    await socket.emit("send_message", data);
  };

  // useEffect(() => {
  //   sendMessage();
  // },[boardArray2])

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };
  const forceUpdate = useCallback((boardArray) => setBoardArray2({ ...boardArray }), []);

  // let keys = Object.keys(boardArray2);
  let board =  game.exportJson().pieces;

  async function setCurrBoard() {
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
      board = await game.exportJson().pieces;
      // console.log(board)
      for (let j = 1; j <= 8; j++) {
        let piece = board[xaxis[i] + yaxis[j]];
        if (piece) {
          boardArray[xaxis[i] + yaxis[j]] = piece;
        } else {
          boardArray[xaxis[i] + yaxis[j]] = " ";
        }
      }
    }
    // await setBoardArray2(await { ...boardArray });
    await forceUpdate(boardArray);

    // keys = await Object.keys(boardArray2);
    // await delay(500);
  }

  const [possibleMoves, setPossibleMoves] = useState([]);
  const [fromPosition, setfromPosition] = useState("");

  function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  const tempFn = async (x, y) => {
    if (possibleMoves.length > 0 && possibleMoves.includes(x)) {
      game.move(fromPosition, x);
      boardArray2[x] = boardArray2[fromPosition];
      boardArray2[fromPosition] = " ";

      await setCurrBoard();
      // await delay(500);
      await setCurrBoard();
      setfromPosition("");
      // game.aiMove(difficulty);
      // sendMessage(boardArray2);
      // setCurrBoard();
      // sendMessage();
      setPossibleMoves([...[]]);
    } else if (possibleMoves.length > 0) {
      setPossibleMoves([...[]]);
    } else {
      setPossibleMoves([...game.moves(x)]);
      setfromPosition(x);
    }
    setCounter(counter + 1);
    setCounter2(counter2 + 1);
    await setCurrBoard();

  };

  useEffect(() => {
    // delay(500);
    joinRoom();
    setCurrBoard();
  }, []);

  useEffect(() => {

    async function temp() {
      await setCurrBoard();
    }
    temp();
    // delay(500);

  }, [counter2]);

  useEffect( () => {

    async function temp(){
      await setCurrBoard();
      // delay(500);
      await sendMessage();
    }
    temp();
    // delay(500);

  }, [counter]);

  useEffect(() => {

    socket.on("receive_board", async (data) => {
      setGame(await new Game(data.game.board.configuration));
      setBoardArray2(await data.boardArray2);
      setCounter2(counter2 + 1);
      console.log("Received message");
      console.log(data);
      console.log(boardArray2);
    });
  }, [socket]);

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
      <div className="flex h-full">
        <div className="basis-1/4 left-bar"></div>
        <div className="basis-1/2 w-fit px-20   -z-0 ">
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
                boardArray2={boardArray2}
                possibleMoves={possibleMoves}
                tempFn={tempFn}
              ></Board>
            </div>
          </div>
        </div>
        <div className="my-6  h-[60px] basis-1/2 right-bar">
          <div
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
          </div>
        </div>
      </div>
    </div>
  );
}
const Board = ({ boardArray2, tempFn, possibleMoves }) => {
  let x = [8, 7, 6, 5, 4, 3, 2, 1];
  let y = ["A", "B", "C", "D", "E", "F", "G", "H"];
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
          className={
            "flex-auto select-none relative z-20  m-[1px] " +
            (possibleMoves.includes(s + p) && "bg-[#6f69]")
          }
          onClick={() => tempFn(s + p, boardArray2[s + p])}
        >
          {boardArray2[s + p] !== " " && (
            <img
              key={s + p}
              draggable={false}
              src={"./images/new_images/" + str + boardArray2[s + p] + ".png"}
              className="z-10 select-none top-[-1rem] absolute drag pointer-events-none "
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
export default App;
