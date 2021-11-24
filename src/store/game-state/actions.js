export function movePiece(context, { start, dest, size }) {
  const startPieceOwner = context.getters.getPiece(start, size);
  if (startPieceOwner === undefined) {
    throw `Trying to move piece that doesn't exist. start: ${start}, size: ${size}`;
  }

  const endPiece = context.getters.getPiece(dest, size);
  if (endPiece !== undefined) {
    throw `Trying to move piece to occupied location. dest: ${dest}, Size: ${size}`;
  }

  context.commit("setPiece", {
    loc: start,
    size: size,
    owner: undefined,
  });
  context.commit("setPiece", {
    loc: dest,
    size: size,
    owner: startPieceOwner,
  });
}
