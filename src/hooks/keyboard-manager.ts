import { useEffect } from "react";
import { useDispatch } from "./redux-hooks";
import { HERO_MOVE } from "../services/constants/game-constants";

export function useKeyboardManager() {
    const dispatch = useDispatch();
    useEffect(() => {
        function keyPressed(event: KeyboardEvent) {
            if (event.key === 'w') {
                dispatch({ type: HERO_MOVE, direction: "up" });
            }
            if (event.key === 'a') {
                dispatch({ type: HERO_MOVE, direction: "left" })
            }
            if (event.key === 's') {
                dispatch({ type: HERO_MOVE, direction: "down" })
            }
            if (event.key === 'd') {
                dispatch({ type: HERO_MOVE, direction: "right" })
            }
        }
        window.addEventListener('keydown', keyPressed);
        return () => {
            window.removeEventListener('keydown', keyPressed);
        }
    }, [])
}