export type ChessPiece = {
    type: string;
    color: string;
    row: number;
    col: number;
    hasMoved?: boolean;
    moves?: number[][];
};
export type GameAction = {
    type: string;
    payload: number[] | null;
    moves?: number[][];
};
export type GameState = {
    board: (ChessPiece | null)[][];
    turn: string;
    selectedSquare: number[] | null;
    moves?: number[][] | null;
};
export type SpaceProps = {
    row: number;
    col: number;
    selected?: boolean;
    children: React.ReactNode;
};