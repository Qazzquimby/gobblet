import { NUM_ROWS_COLS, NUM_SIZES } from "src/store/game-state/constants";

const board = Array.from(Array(NUM_ROWS_COLS), (_) =>
  Array.from(Array(NUM_ROWS_COLS), (_) => Array(NUM_SIZES).fill(undefined))
);
// Temporary setup
board[0][0][0] = 0;
board[1][1][1] = 1;

export default function () {
  return {
    currentPlayer: 0,
    selectedSpace: undefined,
    board: board,
    reserves: [],
  };
}
