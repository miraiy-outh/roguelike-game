import { useEffect } from "react";
import { useDispatch } from "./redux-hooks";
import { HERO_ATTACK, HERO_MOVE } from "../services/constants/game-constants";

export function useKeyboardManager() {
    const dispatch = useDispatch();
    useEffect(() => {
        function keyPressed(event: KeyboardEvent) {
            if (event.key === 'w' || event.key === 'ц') {
                dispatch({ type: HERO_MOVE, direction: "up" });
            }
            if (event.key === 'a' || event.key === 'ф') {
                dispatch({ type: HERO_MOVE, direction: "left" })
            }
            if (event.key === 's' || event.key === 'ы') {
                dispatch({ type: HERO_MOVE, direction: "down" })
            }
            if (event.key === 'd' || event.key === 'в') {
                dispatch({ type: HERO_MOVE, direction: "right" })
            }
            if (event.code === 'Space') {
                dispatch({ type: HERO_ATTACK })
            }
        }
        window.addEventListener('keydown', keyPressed);
        return () => {
            window.removeEventListener('keydown', keyPressed);
        }
    }, [])
}