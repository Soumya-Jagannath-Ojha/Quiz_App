import React from 'react'

const QuizControls = ({socket, roomId}: {socket: any, roomId: string}) => {
  return (
    <div>
        QuizControls
        <button onClick={()=>{
            socket.emit("next", {
                roomId,
                
            })
        }}>

        </button>
    </div>
  )
}

export default QuizControls