# Reusable Test Mode

Use `ReusableTestMode` as the base screen for any belt.

```jsx
import { useNavigate } from "react-router-dom";
import { ReusableTestMode } from "../components/test-mode";
import movesData from "../data/your-belt-moves.json";

function YourBeltTestModeScreen() {
  const navigate = useNavigate();

  return (
    <ReusableTestMode
      moveSections={movesData}
      onExit={() => navigate("/")}
      title="Your Belt Test Mode"
      jumpButtonLabel="Jump to Advanced"
      completionHeading="Great work."
      getJumpIndex={(moves) => moves.findIndex((move) => move.bold)}
    />
  );
}
```

`moveSections` expects:
- `[{ label: string, moves: [{ name: string, note?: string, youtube?: string, ... }] }]`

Optional props:
- `voiceCommands`: override regex patterns for `next`, `previous`, and `exit`.
- `defaultMoveDescription`: fallback note text.
