import { useEffect } from "react";
import { useDispatch } from "./hooks/redux-hooks";
import { GAME_INIT } from "./services/constants/game-constants";
import { GameField } from "./components/game-field";
import { useKeyboardManager } from "./hooks/keyboard-manager";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: GAME_INIT,
    });
  }, [dispatch]);

  useKeyboardManager()
  return (
    <>
      <GameField />
    </>
  );
}

export default App;
