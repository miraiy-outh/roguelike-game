import { useSelector } from "react-redux";
import { fieldSelector } from "../services/selectors/field-selectors";
import { GameCeil } from "./game-ceil";


export function GameField() {
  const field = useSelector(fieldSelector);

  const ceils = field.map((row, i) => {
    return row.map((ceil, j) => {
      return <GameCeil key={`${i}-${j}`} entity={ceil}></GameCeil>;
    })
  })

  return <div className="field">{ceils}</div>;
}
