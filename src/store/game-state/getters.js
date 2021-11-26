import _ from "lodash";

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
