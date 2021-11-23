export function setPiece (state, {loc, size, owner}) {
  state.board[loc.row][loc.col][size] = owner
}
