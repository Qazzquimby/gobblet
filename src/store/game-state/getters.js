import _ from "lodash";
import { NUM_ROWS_COLS } from "src/store/game-state/constants";

export const getPiece = (state) => (loc, size) => {
  if (loc.area === "board") {
    return state.board[loc.coords.row][loc.coords.col][size];
  } else if (loc.area === "reserves") {
    return state.reserves[loc.coords.row][loc.coords.col][size];
  } else {
    throw `Bad area given ${loc.area}`;
  }
};

export const getLargestPiece = (state) => (loc) => {
  let space = undefined;
  if (loc.area === "board") {
    space = state.board[loc.coords.row][loc.coords.col];
  } else if (loc.area === "reserves") {
    space = state.reserves[loc.coords.row][loc.coords.col];
  } else {
    throw `Bad area given ${loc.area}`;
  }

  const largestSize = _.findLastIndex(space, (owner) => owner !== undefined);
  return { size: largestSize, owner: space[largestSize] };
};

export function getLegalMoves(state) {
  const selectedSpace = state.selectedSpace;

  if (selectedSpace === undefined) {
    return [];
  }

  if (selectedSpace.area === "board") {
    const coords = selectedSpace.coords;
    const offsets = [-1, +1];
    const directions = ["row", "col"];
    let neighboringCoords = [];
    for (const offset of offsets) {
      for (const direction of directions) {
        neighboringCoords.push({
          ...coords,
          [direction]: coords[direction] + offset,
        });
      }
    }
    neighboringCoords = neighboringCoords.filter((coords) => {
      return (
        coords.row >= 0 &&
        coords.col >= 0 &&
        coords.row < NUM_ROWS_COLS &&
        coords.col < NUM_ROWS_COLS
      );
    });
    const legalMoves = neighboringCoords.map((coords) => ({
      area: "board",
      coords,
    }));
    console.log(legalMoves);
    return legalMoves;
  }

  return []; // Todo add legal moves from reserves
}
