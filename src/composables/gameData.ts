import { ref, watch } from "vue";

const gameName = ref("");
const userName = ref("");
const revealScore = ref(false);

const fibonacci = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89];

interface userType {
  id: string
  room: string
  score: number
  username: string
}

const userList = ref<userType[]>([]);
const roomValue = ref<string | null>(null);
let currentPosition = ref(0);
let currentScore = ref<number | null>(null);
const positioning = ref<userType[][]>([[], [], []]);

export function useGameData() {

  function positionUser(user: any) {
    if (currentPosition.value === 1 && positioning.value[1].length === 2) {
      currentPosition.value++;
    }
    positioning.value[currentPosition.value].push(user);
    if (currentPosition.value === 2) {
      if (positioning.value[1].length === 1) {
        currentPosition.value = 1;
      } else {
        currentPosition.value = 0;
      }
    } else {
      currentPosition.value++;
    }
  }
  
  return {
    fibonacci,
    userList,
    gameName,
    userName,
    positioning,
    revealScore,
    positionUser,
    currentScore,
    roomValue,
  };
}
