import { useSelector } from "react-redux";
import { gameStatusSelector } from "../services/selectors/field-selectors";

export function GameEnd() {
    const gameStatus = useSelector(gameStatusSelector);
    return <>
        {gameStatus === "play" ? null : <div className="end-window">
            <div className="end-text">{gameStatus}</div>
        </div>}
    </>

}