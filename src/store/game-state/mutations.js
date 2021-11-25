export function setPiece(state, { loc, size, owner }) {
  state.board[loc.row][loc.col][size] = owner;
}

export function setSelectedSpace(state, selectedSpace) {
  state.selectedSpace = selectedSpace;
}

export function setCurrentPlayer(state, newPlayer) {
  state.currentPlayer = newPlayer;
}
