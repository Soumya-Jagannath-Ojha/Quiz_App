import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import CreateProblem from "./CreateProblem";
import QuizControls from "./QuizControls";


const Admin = () => {

  const [socket, setSocket] = useState<null | any>(null);
  const [quizId, setQuizId] = useState("");
  const [roomId, setRoomId] = useState("");
  const [answer, setAnswer] = useState(0);


  useEffect(()=>{
    const socket = io("http://localhost:3000");
    setSocket(socket);
    socket.on("connect", ()=>{
      // alert("connected")
      console.log(socket.id);
      socket.emit("joinAdmin",{
        password: "ADMIN_PASSWORD"
      })
    })
  },[])


  if(!quizId){


  return (
    <div>
        <input type="text" onChange={(e)=>{
          setRoomId(e.target.value)
        }} name="" id="" />
        <br /> <br />
        <button onClick={()=>{
          socket.emit("createQuiz",{
            roomId
          });
          setQuizId(roomId);
        }}>Create room</button>
    </div>

  )
}


return <div>
  <CreateProblem roomId={quizId} socket={socket}/>
  <QuizControls socket={socket} roomId={roomId}/>

</div> 
  }

export default Admin