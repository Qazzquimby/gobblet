import { defineStore } from 'pinia';

import _ from 'lodash';
import {
  Area,
  Board,
  Coords,
  IGameState,
  isPlayer,
  Loc,
  NUM_COLS,
  NUM_PLAYERS,
  NUM_RESERVE_STACKS,
  NUM_ROWS,
  NUM_SIZES,
  OptionalPlayer,
  Player,
  Reserves,
  Size,
} from 'components/models';

const storeID = 'gameState';

const board: Board = Array.from(Array(NUM_ROWS), () => {
  return Array.from(Array(NUM_COLS), () => {
    return new Array<Player | undefined>(NUM_SIZES).fill(undefined);
  });
}) as Board;
// Temporary setup
board[0][2][0] = 0;
board[1][1][1] = 1;

const reserves: Reserves = Array.from(Array(NUM_PLAYERS), () => {
  return Array.from(Array(NUM_RESERVE_STACKS), () => {
    return Array<Player | undefined>(NUM_SIZES).fill(undefined);
  });
}) as Reserves;
reserves.forEach((playerReserve, player) => {
  if (isPlayer(player)) {
    playerReserve.forEach((stack) => {
      stack.fill(player);
    });
  }
});

export const useGameStateStore = defineStore({
  id: storeID,

  state: (): IGameState => {
    return {
      currentPlayer: 0,
      selectedSpace: undefined,
      board: board,
      reserves: reserves,
    };
  },
  getters: {
    getPiece: (state) => (loc: Loc, size: Size) => {
      switch (loc.area) {
        case 'board':
          return state.board[loc.coords.row][loc.coords.col][size];
        case 'reserves':
          return state.reserves[loc.coords.row][loc.coords.col][size];
      }
    },
    getLargestPiece: (state) => (loc: Loc) => {
      let space;
      switch (loc.area) {
        case 'board':
          space = state.board[loc.coords.row][loc.coords.col];
          break;
        case 'reserves':
          space = state.reserves[loc.coords.row][loc.coords.col];
          break;
      }

      const largestSize = _.findLastIndex(
        space,
        (owner: OptionalPlayer) => owner !== undefined
      );
      if (largestSize === -1) {
        return undefined;
      } else {
        return { size: largestSize, owner: space[largestSize] };
      }
    },
    legalMoves(state) {
      const selectedSpace = state.selectedSpace;

      if (selectedSpace === undefined) {
        return [];
      }

      if (selectedSpace.area === 'board') {
        const coords = selectedSpace.coords;
        const offsets = [-1, +1];
        const directions = ['row', 'col'] as const;
        let neighboringCoords: Coords[] = [];
        for (const offset of offsets) {
          for (const direction of directions) {
            neighboringCoords.push({
              ...coords,
              [direction]: coords[direction] + offset,
            });
          }
        }
        neighboringCoords = neighboringCoords.filter((coords) => {
          const rowInBounds = coords.row >= 0 && coords.row < NUM_ROWS;
          const colInBounds = coords.col >= 0 && coords.col < NUM_ROWS;
          return rowInBounds && colInBounds;
        });
        const legalMoves = neighboringCoords.map((coords) => ({
          area: 'board',
          coords,
        }));
        return legalMoves;
      }

      return []; // Todo add legal moves from reserves
    },
  },
  actions: {
    movePiece({ start, dest, size }: { start: Loc; dest: Loc; size: Size }) {
      const startPieceOwner = this.getPiece(start, size);
      if (startPieceOwner === undefined) {
        throw `Trying to move piece that doesn't exist. start: ${start}, size: ${size}`;
      }

      const endPiece = this.getPiece(dest, size);
      if (endPiece !== undefined) {
        throw `Trying to move piece to occupied location. dest: ${dest}, Size: ${size}`;
      }

      if (dest.area === 'reserves') {
        throw new Error('Trying to move piece into reserves.');
      }

      this.setPiece(start.area, start.coords, size, undefined);
      this.setPiece('board', dest.coords, size, startPieceOwner);
    },
    setPiece(area: Area, coords: Coords, size: Size, owner: OptionalPlayer) {
      if (area === 'board') {
        this.board[coords.row][coords.col][size] = owner;
      } else if (area === 'reserves') {
        this.reserves[coords.row][coords.col][size] = owner;
      }
    },
    setSelectedSpace(selectedSpace: Loc) {
      this.selectedSpace = selectedSpace;
    },
    setCurrentPlayer(newPlayer: Player) {
      this.currentPlayer = newPlayer;
    },
  },
});

export type GameStateStore = ReturnType<typeof useGameStateStore>;
