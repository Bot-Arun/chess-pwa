import { useState, useEffect } from "react";
import { Game } from "js-chess-engine";
import './App.css'
import  io  from "socket.io-client";

const game1 = new Game();

const socket = io("http://localhost:3001")

function App() {
  const [game, setGame] = useState(game1);
  const [room, setRoom] = useState(243);
  const [boardArray2, setBoardArray2] = useState({});
  const [difficulty, setDifficulty] = useState(0);

  useEffect(() => {
    joinRoom();
    setCurrBoard();
  }, []);
  
  useEffect(() => {
    socket.on("receive_board",(data)=>{
      console.log(data.game);
      setGame(new Game(data.game.board.configuration))
      setCurrBoard();
      // setBoardArray2({ ...data.boardArray2 });
      console.log("In receive board use Effect");
      console.log(data.boardArray2);
    })
  }, [socket])

  const sendMessage = () => {
    console.log("In send Message function");
    socket.emit("send_message", { game,boardArray2, room });
  }; 

  // useEffect(() => {
  //   sendMessage();
  // },[boardArray2])


  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };


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

  const [possibleMoves, setPossibleMoves] = useState([]);
  const [fromPosition, setfromPosition] = useState("");

  const tempFn = (x, y) => {
    if (possibleMoves.length > 0 && possibleMoves.includes(x)) {
      console.log('possilbe Moves',possibleMoves);
      console.log(fromPosition + " " + x);
      game.move(fromPosition, x);
      // console.log(game.exportJson().pieces);
      setCurrBoard();
      console.log("Done");
      setfromPosition("");
      // game.aiMove(difficulty);
      // sendMessage(boardArray2);
      // setCurrBoard();
      sendMessage();
      setPossibleMoves([...[]]);
    } else if (possibleMoves.length > 0) {
      setPossibleMoves([...[]]);
    } 
    else {
      console.log(x + " " + y);
      setPossibleMoves([...game.moves(x)]);
      setfromPosition(x);
      console.log('possilbe Moves',possibleMoves);
    }
  };


  return (  
    <div className=" h-screen -z-50 " style={{backgroundImage:'url("./images/Background.jpg")',backgroundRepeat:'no-repeat',backgroundPosition:'center',backgroundSize:'100% 100%'}} >
      <div className='flex h-full'>
         <div className='basis-1/4 left-bar' >
         </div>
         <div className='basis-1/2 w-fit px-20   -z-0 '  >
          <div className=' w-[34rem]  h-[37rem]  pl-[12%] pr-[13%] pt-[4rem] pb-[10.2rem] ' style={{  backgroundImage:'url("./images/chessboard-02.png")',backgroundRepeat:'no-repeat', backgroundPosition:'center' , backgroundSize:'100% 100%'}} >
            <div className='bg-rd-400 h-[100%]   flex-col  '  >
                <Board boardArray2={boardArray2} possibleMoves={possibleMoves} tempFn={tempFn} ></Board>
            </div>
          </div>
         </div>
         <div className='my-6  h-[60px] basis-1/2 right-bar' >
         <div className="flex flex-col justify-center items-start h-[40vh]" style={{background:'transparent url("./images/difficulty-level.png") no-repeat center center',backgroundSize:"cover"}}>
          <label className="control control-radio">
            Easy
            <input onChange={()=>setDifficulty(0)} type="radio" name="radio" />
            <div className="control_indicator"></div>
          </label>
          <label className="control control-radio">
              Medium
              <input onChange={()=>setDifficulty(1)} type="radio" name="radio" />
              <div className="control_indicator"></div>
          </label>
          <label className="control control-radio">
              Hard
              <input onChange={()=>setDifficulty(2)} type="radio" name="radio" />
              <div className="control_indicator"></div>
          </label>
         </div>
         </div>
      </div>
    </div>
  );
}
const Board = ({boardArray2,tempFn,possibleMoves}) => {
  let x = [8 , 7 ,6 ,5 ,4 ,3 ,2 ,1];
  let y = ["A","B","C","D","E","F","G","H"]
  console.log('board arr',boardArray2)
  var X = x.map( p =>  {
    var Y = y.map(s => {
      var str = 'b';
      if ((boardArray2[s +p])?.toUpperCase() ===boardArray2[s +p]) {
        str = 'w';
      }
      return (
      <div  key={s} draggable={false} className={'flex-auto select-none relative z-20  m-[1px] '+ (possibleMoves.includes(s+p) && "bg-[#6f69]")} onClick={()=> tempFn(s+p, boardArray2[s+p])} >
        {boardArray2[s +p] !==" " && <img key={s+p} draggable={false} src={'./images/new_images/'+str+boardArray2[s +p]+'.png'} className='z-10 select-none top-[-1rem] absolute drag pointer-events-none '/>} 
      </div>
      )
    })
  return ( 
       <div key={p} className='flex h-[12.5%] relative flex-auto w-full '>{Y}</div>
    )
  } )
  return (
    <>{X}</>
  )

}
export default App;