export const getPiece = (state) => (loc, size)  => {
  return state.board[loc.row][loc.col][size]
}
