import {
  NUM_PLAYERS,
  NUM_RESERVE_STACKS,
  NUM_ROWS_COLS,
  NUM_SIZES,
} from "src/store/game-state/constants";

const board = Array.from(Array(NUM_ROWS_COLS), (_) =>
  Array.from(Array(NUM_ROWS_COLS), (_) => Array(NUM_SIZES).fill(undefined))
);
// Temporary setup
board[0][2][0] = 0;
board[1][1][1] = 1;

const reserves = Array.from(Array(NUM_PLAYERS), (_) =>
  Array.from(Array(NUM_RESERVE_STACKS), (_) => Array(NUM_SIZES).fill(undefined))
);
reserves.forEach((playerReserve, player) => {
  playerReserve.forEach((stack) => {
    stack.fill(player);
  });
});

export default function () {
  return {
    currentPlayer: 0,
    selectedSpace: undefined,
    board: board,
    reserves: reserves,
  };
}
