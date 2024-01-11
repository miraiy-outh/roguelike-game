import { TGameCeil, TGameField } from "./types";

const MIN_ROOM_COUNT = 8;
const MIN_ROOM_SIZE = 3;
const MAX_ROOM_SIZE = 8;

export function generateField() {
  let heroPosition = { x: 0, y: 0 };
  const width = 40;
  const height = 24;

  const location: TGameField = [];

  for (let i = 0; i < height; i++) {
    location.push(new Array<TGameCeil>(width).fill({ type: "wall" }));
  }

  function createRoom(
    x: number,
    y: number,
    roomWidth: number,
    roomHeight: number
  ) {
    for (let i = y; i < y + roomHeight; i++) {
      for (let j = x; j < x + roomWidth; j++) {
        location[i][j] = { type: "floor" };
      }
    }
  }

  const roomCount = Math.floor(Math.random() * MIN_ROOM_COUNT) + 5;

  const rooms = [];
  for (let i = 0; i < roomCount; i++) {
    const roomWidth = Math.floor(Math.random() * (MAX_ROOM_SIZE - MIN_ROOM_SIZE + 1)) + MIN_ROOM_SIZE;
    const roomHeight = Math.floor(Math.random() * (MAX_ROOM_SIZE - MIN_ROOM_SIZE + 1)) + MIN_ROOM_SIZE;
    const roomX = Math.floor(Math.random() * (width - roomWidth - 1)) + 1;
    const roomY = Math.floor(Math.random() * (height - roomHeight - 1)) + 1;

    createRoom(roomX, roomY, roomWidth, roomHeight);
    rooms.push({ x: roomX, y: roomY, width: roomWidth, height: roomHeight });
  }

  for (let i = 0; i < rooms.length - 1; i++) {
    const currentRoom = rooms[i];
    const nextRoom = rooms[i + 1];

    const currentCenterX = Math.floor(currentRoom.x + currentRoom.width / 2);
    const currentCenterY = Math.floor(currentRoom.y + currentRoom.height / 2);
    const nextCenterX = Math.floor(nextRoom.x + nextRoom.width / 2);
    const nextCenterY = Math.floor(nextRoom.y + nextRoom.height / 2);

    for (
      let x = Math.min(currentCenterX, nextCenterX);
      x <= Math.max(currentCenterX, nextCenterX);
      x++
    ) {
      location[currentCenterY][x] = { type: "floor" };
    }

    for (
      let y = Math.min(currentCenterY, nextCenterY);
      y <= Math.max(currentCenterY, nextCenterY);
      y++
    ) {
      location[y][nextCenterX] = { type: "floor" };
    }
  }

  let enemyCount = 0;
  while (enemyCount < 10) {
    const randomX = Math.floor(Math.random() * width);
    const randomY = Math.floor(Math.random() * height);
    if (location[randomY][randomX].type === "floor") {
      location[randomY][randomX] = { type: "enemy", hp: 100 };
      enemyCount++;
    }
  }

  let swordCount = 0;
  while (swordCount < 2) {
    const randomX = Math.floor(Math.random() * width);
    const randomY = Math.floor(Math.random() * height);
    if (location[randomY][randomX].type === "floor") {
      location[randomY][randomX] = { type: "sword" };
      swordCount++;
    }
  }

  let potionCount = 0;
  while (potionCount < 10) {
    const randomX = Math.floor(Math.random() * width);
    const randomY = Math.floor(Math.random() * height);
    if (location[randomY][randomX].type === "floor") {
      location[randomY][randomX] = { type: "potion" };
      potionCount++;
    }
  }

  let heroPlaced = false;
  while (!heroPlaced) {
    const randomX = Math.floor(Math.random() * width);
    const randomY = Math.floor(Math.random() * height);
    if (location[randomY][randomX].type === "floor") {
      console.log(randomX, randomY);
      location[randomY][randomX] = { type: "hero", hp: 100 };
      heroPosition.x = randomX;
      heroPosition.y = randomY;
      heroPlaced = true;
    }
  }

  return { field: location, heroPosition };
}

export function isWall(field: TGameField, x: number, y: number) {
  if (field[y][x].type === "wall") {
    return true;
  }

  return false;
}