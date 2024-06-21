import { useGameData } from "./gameData";
const { addUsers, positioning } = useGameData();

import { useSocket } from '../composables/useSocket';


// export function openConnection() {
//   socket.on("connect", () => {
//     console.log("Connected");
//   });

//   socket.on("disconnect", () => {
//     console.log("disconnect");
//   });

//   socket.on("userList", (users) => {
//     console.log("userList = ", users);

//     addUsers(users);
//   });

//   socket.on("joined", (users) => {
//     console.log("joined = ", users);

//     addUsers(users);
//   });

//   socket.on("userScore", (score) => {
//     console.log(positioning.value);
//     console.log(score);
//   });

//   function joinRoom(room: string, username: string) {
//     socket.emit("joinRoom", room, username);
//   }

//   function sendMessage(room: string, msg: number) {
//     socket.emit("setScore", { room: room, msg: msg });
//   }

//   return {
//     joinRoom,
//     sendMessage,
//   };
// }
