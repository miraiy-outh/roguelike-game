import { GAME_INIT, HERO_ATTACK, HERO_MOVE } from "../constants/game-constants";
import { checkFullHP, findEnemies, findEnemiesAround, findHeroAround, findNextCeil, generateField, getHero, isEnemy, isPotion, isSword, isWall, isZeroHP } from "../helpers";
import { TGameField } from "../types";

type TGameState = {
  field: TGameField,
  heroX: number,
  heroY: number,
  gameStatus: "play" | "win" | "lose"
};

type TGameInitAction = {
  type: typeof GAME_INIT;
};

type THeroMoveAction = {
  type: typeof HERO_MOVE;
  direction: "up" | "down" | "right" | "left"
};

type THeroAttackAction = {
  type: typeof HERO_ATTACK;
};

type TGameActions = TGameInitAction | THeroMoveAction | THeroAttackAction;

const defaultState: TGameState = {
  field: [],
  heroX: 0,
  heroY: 0,
  gameStatus: "play"
};

const POTION_HP = 50;
const SWORD_ATTACK = 35;

export function gameReducer(state = defaultState, action: TGameActions) {
  switch (action.type) {
    case GAME_INIT: {
      const { field, heroPosition } = generateField();
      const { x, y } = heroPosition;
      return {
        ...state,
        field,
        heroX: x,
        heroY: y
      };
    }

    case HERO_MOVE: {
      let gameStatus = state.gameStatus;
      let heroX = state.heroX;
      let heroY = state.heroY;
      let newHeroX = state.heroX;
      let newHeroY = state.heroY;

      switch (action.direction) {
        case "up": {
          newHeroY--;
          break;
        }

        case "down": {
          newHeroY++;
          break;
        }

        case "left": {
          newHeroX--;
          break;
        }

        case "right": {
          newHeroX++;
          break;
        }

        default:
          break;
      }

      if (isWall(state.field, newHeroX, newHeroY) || isEnemy(state.field, newHeroX, newHeroY)) {
        return state;
      }

      let newField = state.field.map(function (arr) {
        return arr.map(ceil => ceil);
      });

      const hero = getHero(state.field, heroX, heroY);

      if (isPotion(state.field, newHeroX, newHeroY)) {
        hero.hp += POTION_HP;
        hero.hp = checkFullHP(hero.hp);
      }

      if (isSword(state.field, newHeroX, newHeroY)) {
        hero.attack += SWORD_ATTACK;
      }

      newField[newHeroY][newHeroX] = hero;
      newField[heroY][heroX] = { type: "floor" };

      const enemiesCoordinate: { x: number, y: number }[] = findEnemies(newField);
      enemiesCoordinate.forEach((enemyCoordinate) => {
        const newEnemyCoordinate: { xEnemy: number, yEnemy: number } = findNextCeil(newField, enemyCoordinate.x, enemyCoordinate.y, newHeroX, newHeroY);
        const enemy = newField[enemyCoordinate.y][enemyCoordinate.x];
        if (findHeroAround(newField, enemyCoordinate.x, enemyCoordinate.y)) hero.hp -= 10;
        newField[enemyCoordinate.y][enemyCoordinate.x] = { type: "floor" };
        newField[newEnemyCoordinate.yEnemy][newEnemyCoordinate.xEnemy] = enemy;
      })

      if (isZeroHP(hero.hp)) {
        newField[heroY][heroX] = { type: "floor" };
        gameStatus = "lose"
      }

      if (!findEnemies(newField)) gameStatus = "win"

      return {
        ...state,
        field: newField,
        heroX: newHeroX,
        heroY: newHeroY,
        gameStatus
      }
    }

    case HERO_ATTACK: {
      let gameStatus = state.gameStatus;
      let heroX = state.heroX;
      let heroY = state.heroY;

      const enemiesCoordinate: { x: number, y: number }[] = findEnemiesAround(state.field, heroX, heroY);
      if (enemiesCoordinate.length === 0) return state;

      let newField = state.field.map(function (arr) {
        return arr.map(ceil => ceil);
      });

      let hero = getHero(state.field, heroX, heroY);

      hero.hp -= 10 * enemiesCoordinate.length;
      if (isZeroHP(hero.hp)) {
        newField[heroY][heroX] = { type: "floor" };
        gameStatus = "lose"
      }
      else newField[heroY][heroX] = hero;

      enemiesCoordinate.forEach((enemyCoordinate) => {
        let ceil = newField[enemyCoordinate.y][enemyCoordinate.x];

        if (ceil.type === "enemy") {
          ceil.hp -= hero.attack;
          if (isZeroHP(ceil.hp)) ceil = { type: "floor" };
        }

        newField[enemyCoordinate.y][enemyCoordinate.x] = ceil;
      })

      if (findEnemies(newField).length === 0) gameStatus = "win"

      return {
        ...state,
        field: newField,
        gameStatus
      }

    }

    default:
      return state;
  }
}
