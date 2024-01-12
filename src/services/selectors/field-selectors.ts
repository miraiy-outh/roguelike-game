import { RootState } from "../store";

export function fieldSelector(state: RootState) {
  return state.gameData.field;
}

export function gameStatusSelector(state: RootState) {
  return state.gameData.gameStatus;
}
