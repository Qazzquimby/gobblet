export const getPiece = (state) => (loc, size) => {
  return state.board[loc.row][loc.col][size];
};

export const getLargestPiece = (state) => (loc) => {
  const space = state.board[loc.row][loc.col];
  const largestSize = _.findLastIndex(space, (owner) => owner !== undefined);
  return { size: largestSize, owner: space[largestSize] };
};
