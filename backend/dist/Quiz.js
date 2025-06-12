"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quiz = void 0;
const IoManager_1 = require("./managers/IoManager");
const PROBLEM_TIME_S = 20;
class Quiz {
    constructor(roomId) {
        this.roomId = roomId;
        this.hasStarted = false;
        this.problems = [];
        this.activeProblem = 0;
        this.users = [];
        this.currentState = "not_started";
        console.log("room created");
        setInterval(() => {
            this.debug();
        }, 10000);
    }
    debug() {
        console.log("----debug----");
        console.log(this.roomId);
        console.log(JSON.stringify(this.problems));
        console.log(this.users);
        console.log(this.currentState);
        console.log(this.activeProblem);
    }
    addProblem(problem) {
        this.problems.push(problem);
        console.log(this.problems);
    }
    start() {
        this.hasStarted = true;
        // const io = IoManager.getIo();
        console.log("inside start");
        this.setActiveProblem(this.problems[0]);
    }
    setActiveProblem(problem) {
        console.log("set active problem");
        this.currentState = "question";
        problem.startTime = new Date().getTime();
        problem.submissions = [];
        IoManager_1.IoManager.getIo().emit("CHANGE_PROBLEM", {
            problem,
        });
        // IoManager.getIo().to(this.roomId).emit("problem", {
        //   problem,
        // });
        // Todo: clear this if function moves ahead
        setTimeout(() => {
            this.sendLeaderboard();
        }, PROBLEM_TIME_S * 1000);
    }
    sendLeaderboard() {
        console.log("send leaderboard");
        this.currentState = "leaderboard";
        const leaderboard = this.getLeaderboard();
        IoManager_1.IoManager.getIo().to(this.roomId).emit("leaderboard", {
            leaderboard,
        });
    }
    next() {
        console.log("inside next");
        this.activeProblem++;
        const problem = this.problems[this.activeProblem];
        console.log("problem is here" + problem);
        if (problem) {
            // problem.startTime = new Date().getTime();
            this.setActiveProblem(problem);
            console.log("problem is here" + problem);
        }
        else {
            // send final results here
            IoManager_1.IoManager.getIo().emit("QUIZ_END", {
                problem,
            });
            // this.activeProblem--;
        }
    }
    genRandomString(length) {
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let result = "";
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }
    addUser(name) {
        const id = this.genRandomString(7);
        this.users.push({
            id,
            name,
            points: 0,
        });
        return id;
    }
    submit(userId, roomId, problemId, submission) {
        const problem = this.problems.find((x) => x.id === problemId);
        const user = this.users.find((x) => x.id === userId);
        if (!problem || !user) {
            return;
        }
        const existingSubmission = problem.submissions.find((x) => x.userId === userId);
        if (existingSubmission) {
            return;
        }
        problem.submissions.push({
            problemId,
            userId,
            isCorrect: problem.answer === submission,
            optionSelected: submission,
        });
        user.points +=
            1000 -
                (500 * (new Date().getTime() - problem.startTime)) / PROBLEM_TIME_S;
    }
    getLeaderboard() {
        return this.users
            .sort((a, b) => (a.points < b.points ? 1 : -1))
            .splice(0, 20);
    }
    getCurrentState() {
        if (this.currentState === "not_started") {
            return {
                type: "not_started",
            };
        }
        if (this.currentState === "ended") {
            return {
                type: "ended",
                leaderboard: this.getLeaderboard(),
            };
        }
        if (this.currentState === "leaderboard") {
            return {
                type: "leaderboard",
                leaderboard: this.getLeaderboard(),
            };
        }
        if (this.currentState === "question") {
            const problem = this.problems[this.activeProblem];
            return {
                type: "question",
                problem,
            };
        }
    }
}
exports.Quiz = Quiz;
