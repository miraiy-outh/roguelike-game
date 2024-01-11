import { GAME_INIT, HERO_MOVE } from "../constants/game-constants";
import { generateField, isWall } from "../helpers";
import { TGameField } from "../types";

type TGameState = {
  field: TGameField,
  heroX: number,
  heroY: number
};

type TGameInitAction = {
  type: typeof GAME_INIT;
};

type THeroMoveAction = {
  type: typeof HERO_MOVE;
  direction: "up" | "down" | "right" | "left"
};

type TGameActions = TGameInitAction | THeroMoveAction;

const defaultState: TGameState = {
  field: [],
  heroX: 0,
  heroY: 0
};

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

      if (isWall(state.field, newHeroX, newHeroY)) {
        return state;
      }

      let newField = state.field.map(function (arr) {
        return arr.map(ceil => ceil);
      });

      const hero = newField[heroY][heroX];
      newField[newHeroY][newHeroX] = hero;
      newField[heroY][heroX] = { type: "floor" }

      return {
        ...state,
        field: newField,
        heroX: newHeroX,
        heroY: newHeroY
      }
    }

    default:
      return state;
  }
}
