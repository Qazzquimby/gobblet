export function setPiece(state, { area, coords, size, owner }) {
  if (area === "board") {
    state.board[coords.row][coords.col][size] = owner;
  } else if (area === "reserves") {
    state.reserves[coords.row][coords.col][size] = owner;
  }
}

export function setSelectedSpace(state, selectedSpace) {
  state.selectedSpace = selectedSpace;
}

export function setCurrentPlayer(state, newPlayer) {
  state.currentPlayer = newPlayer;
}
