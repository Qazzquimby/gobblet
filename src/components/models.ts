export const NUM_PLAYERS = 2 as const;
const players = [0, 1] as const;
export type Player = typeof players[number];
export const isPlayer = (x: any): x is Player => players.includes(x);

export const NUM_SIZES = 4 as const;

export const NUM_RESERVE_STACKS = 3 as const;

export const NUM_ROWS = 4 as const;
const ROW_INDICES = [...Array(NUM_ROWS).keys()] as const;
type RowIndex = typeof ROW_INDICES[number];
const isRow = (x: any): x is RowIndex => ROW_INDICES.includes(x);

export const NUM_COLS = 4 as const;
const COL_INDICES = [...Array(NUM_COLS).keys()] as const;
type ColIndex = typeof COL_INDICES[number];
const isCol = (x: any): x is ColIndex => COL_INDICES.includes(x);

const SIZES = [...Array(NUM_SIZES).keys()] as const;
export type Size = typeof SIZES[number];
const isSize = (x: any): x is Size => SIZES.includes(x);

export interface Coords {
  row: RowIndex;
  col: ColIndex;
}

export type Area = 'board' | 'reserves';

export interface Loc {
  area: Area;
  coords: Coords;
}

export type OptionalPlayer = Player | undefined;
type Space = [OptionalPlayer, OptionalPlayer, OptionalPlayer, OptionalPlayer];
type Row = [Space, Space, Space, Space];
export type Board = [Row, Row, Row, Row];
type Reserve = [Space, Space, Space];
export type Reserves = [Reserve, Reserve];

export interface IGameState {
  currentPlayer: number;
  selectedSpace: Loc | undefined;
  board: Board;
  reserves: Reserves;
}
