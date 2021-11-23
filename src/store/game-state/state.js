import {NUM_ROWS_COLS} from 'src/store/game-state/constants';

export default function() {
  return {
    board: Array.from(Array(NUM_ROWS_COLS),
      _ => Array(NUM_ROWS_COLS).fill([0, 0, undefined, 1])),
    reserves: [],
  };
}
