import { useSelector } from "react-redux";
import { fieldSelector } from "../services/selectors/field-selectors";
import { GameCeil } from "./game-ceil";


export function GameField() {
  const field = useSelector(fieldSelector);
  console.log(field)

  const ceils = field.map((row) => {
    return row.map((ceil) => {
      return <GameCeil entity={ceil}></GameCeil>;
    })
  })

  return <div className="field">{ceils}</div>;
}
