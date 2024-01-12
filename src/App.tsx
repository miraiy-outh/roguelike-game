import { useEffect } from "react";
import { useDispatch } from "./hooks/redux-hooks";
import { GAME_INIT } from "./services/constants/game-constants";
import { GameField } from "./components/game-field";
import { useKeyboardManager } from "./hooks/keyboard-manager";
import { GameEnd } from "./components/game-end";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: GAME_INIT,
    });
  }, [dispatch]);

  useKeyboardManager()
  return (
    <div className="container">
      <GameEnd />
      <GameField></GameField>
    </div>
  );
}

export default App;
