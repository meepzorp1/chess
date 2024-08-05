{/* 
    Game Reducer

    This reducer will handle all game actions.
*/}

import { ChessPiece, GameAction, GameState } from '../lib/Types';

export const GameReducer = (state: GameState, action: GameAction) => {
    switch (action.type) {
        case 'SELECT_SQUARE':
            console.log(action);
            return { ...state, selectedSquare: action.payload, moves: action.moves };
        case 'MOVE_PIECE':
            if (action.payload !== null) {
                if (state.moves?.some(move => action?.payload && action?.payload[0] !== null && action?.payload[1] !== null && move[0] === action.payload[0] && move[1] === action.payload[1])) {
                    if (state.selectedSquare !== null) {
                        let newBoard = state.board.map(row => [...row]);
                        let piece:ChessPiece = { ...state.board[state.selectedSquare[0]][state.selectedSquare[1]] as ChessPiece };
piece.hasMoved = true;
let turn = state.turn === 'white' ? 'black' : 'white';


                        newBoard[action.payload[0]][action.payload[1]] = piece;
                        newBoard[state?.selectedSquare[0]][state.selectedSquare[1]] = null;
                        return { ...state, board: newBoard, turn: turn, selectedSquare: null, moves: null };

                    }

                    {/* move it */}
                }
            }


        default:
            return state;
    }
};