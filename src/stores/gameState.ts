import { defineStore } from 'pinia';

import _ from 'lodash';
import assert from 'assert';

const storeID = 'gameState';

const players = [0, 1] as const;
type Player = typeof players[number];
const isPlayer = (x: any): x is Player => players.includes(x);

export const NUM_ROWS = 4 as const;
export const NUM_SIZES = 4 as const;
export const NUM_PLAYERS = 2 as const;
export const NUM_RESERVE_STACKS = 3 as const;
const rowIndices = [...Array(NUM_ROWS).keys()] as const;
type RowIndex = typeof rowIndices[number];
const isRow = (x: any): x is RowIndex => rowIndices.includes(x);

export const NUM_COLS = 4 as const;
const colIndices = [...Array(NUM_COLS).keys()] as const;
type ColIndex = typeof colIndices[number];
const isCol = (x: any): x is ColIndex => colIndices.includes(x);

const size = [...Array(NUM_SIZES).keys()] as const;
type Size = typeof size[number];
const isSize = (x: any): x is Size => size.includes(x);

interface Coords {
  row: RowIndex;
  col: ColIndex;
}
type Area = 'board' | 'reserves';
interface Loc {
  area: Area;
  coords: Coords;
}
type OptionalPlayer = Player | undefined;
type Space = [OptionalPlayer, OptionalPlayer, OptionalPlayer, OptionalPlayer];
type Row = [Space, Space, Space, Space];
type Board = [Row, Row, Row, Row];

type Reserve = [Space, Space, Space];
type Reserves = [Reserve, Reserve];
export interface IGameState {
  currentPlayer: number;
  selectedSpace: Loc | undefined;
  board: Board;
  reserves: Reserves;
}

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

export const useUserStore = defineStore({
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
      if (loc.area === 'board') {
        return state.board[loc.coords.row][loc.coords.col][size];
      } else {
        console.assert(loc.area === 'reserves'); //Todo figure out which assert
        return state.reserves[loc.coords.row][loc.coords.col][size];
      }
    },
    getLargestPiece: (state) => (loc: Loc) => {
      assert(2 == 2);
      let space = undefined;
      if (loc.area === 'board') {
        space = state.board[loc.coords.row][loc.coords.col];
      } else {
        assert(loc.area === 'reserves');
        space = state.reserves[loc.coords.row][loc.coords.col];
      }

      const largestSize = _.findLastIndex(
        space,
        (owner: OptionalPlayer) => owner !== undefined
      );
      return { size: largestSize, owner: space[largestSize] };
    },
    getLegalMoves(state) {
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
          return (
            coords.row >= 0 &&
            coords.col >= 0 &&
            coords.row < NUM_ROWS &&
            coords.col < NUM_ROWS
          );
        });
        const legalMoves = neighboringCoords.map((coords) => ({
          area: 'board',
          coords,
        }));
        console.log(legalMoves);
        return legalMoves;
      }

      return []; // Todo add legal moves from reserves
    },
  },
  actions: {
    movePiece(start: Loc, dest: Loc, size: Size) {
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

export type UserStore = ReturnType<typeof useUserStore>;
