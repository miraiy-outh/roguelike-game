import { RootState } from "../store";

export function fieldSelector(state: RootState) {
  return state.gameData.field;
}
