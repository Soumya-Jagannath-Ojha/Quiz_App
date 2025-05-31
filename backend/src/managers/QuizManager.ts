import { Quiz } from "../Quiz";
import { IoManager } from "./IoManager";

export class QuizManager {
    private quizes: Quiz[];

    constructor(){
        this.quizes = [];
    }

    public start(roomId: string){
        const io = IoManager.getIo();
        const quiz = this.quizes.find(x => x.roomId === roomId);
        quiz.start();
    }

    public next(roomId: string){
        const io = IoManager.getIo();
        io.to(roomId).emit({
            type: "START_ROOM",
        })
    }
    addUser(roomId:string, name: string){
        return this.getQuiz(roomId)?.addUser(name);
    }
    submit(userId: string, roomId: string, problemId: string, submission: 0 | 1 | 2 | 3){
        this.getQuiz(roomId)?.submit(userId, roomId, problemId, submission);
    }

    getQuiz(roomId: string){
        return this.quizes.find(x => x.roomId === roomId)?? null;
    }

    getCurrentState(roomId: string){
        const quiz = this.quizes.find(x => x.roomId === roomId);
        if(!quiz){
            return null;
        }

        return quiz.getCurrentState();
    }


}