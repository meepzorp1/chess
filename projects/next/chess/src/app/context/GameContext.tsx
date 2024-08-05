"use client";

{/* 
    Chess Game Context

    Main purpose of this context is to provide the game state and dispatch function 
    for use amongst sibling components.
*/}

import React, { createContext, useContext, useReducer, FC, ReactNode, Dispatch } from 'react';
import { GameReducer } from '../reducers/GameReducer';
import { GameState, GameAction } from '../lib/Types';

{/*
    Game Context

    This context will provide the game state and dispatch function to sibling components.

    initial state is a two dimensional array holding piece object positions
    turn is a string value of 'white' or 'black'

    change selectedSquare to be handled locally
*/}

{/* initial state */}
const initialState = {
    board: [
        [{ type: 'rook', color: 'black' }, { type: 'knight', color: 'black' }, { type: 'bishop', color: 'black' }, { type: 'queen', color: 'black' }, 
            { type: 'king', color: 'black' }, { type: 'bishop', color: 'black' }, { type: 'knight', color: 'black' }, { type: 'rook', color: 'black' }],
        [{ type: 'pawn', color: 'black', hasMoved: false }, { type: 'pawn', color: 'black', hasMoved: false }, { type: 'pawn', color: 'black', hasMoved: false },
            { type: 'pawn', color: 'black', hasMoved: false }, { type: 'pawn', color: 'black', hasMoved: false }, { type: 'pawn', color: 'black', hasMoved: false }, 
            { type: 'pawn', color: 'black', hasMoved: false }, { type: 'pawn', color: 'black', hasMoved: false }],
        Array(8).fill(null),
        Array(8).fill(null),
        Array(8).fill(null),
        Array(8).fill(null),
        [{ type: 'pawn', color: 'white', hasMoved: false }, { type: 'pawn', color: 'white', hasMoved: false }, { type: 'pawn', color: 'white', hasMoved: false }, 
            { type: 'pawn', color: 'white', hasMoved: false }, { type: 'pawn', color: 'white', hasMoved: false }, { type: 'pawn', color: 'white', hasMoved: false }, 
            { type: 'pawn', color: 'white', hasMoved: false }, { type: 'pawn', color: 'white', hasMoved: false }],
        [{ type: 'rook', color: 'white' }, { type: 'knight', color: 'white' }, { type: 'bishop', color: 'white' }, { type: 'queen', color: 'white' }, 
            { type: 'king', color: 'white' }, { type: 'bishop', color: 'white' }, { type: 'knight', color: 'white' }, { type: 'rook', color: 'white' }]
    ],
    turn: 'white',
    selectedSquare: null
};

{/* Game Context */}

const GameContext = createContext<{
    state: GameState;
    dispatch: Dispatch<GameAction>;
}>({
    state: initialState,
    dispatch: () => undefined
});

{/* Game Provider */}

export const GameProvider: FC<{ children: ReactNode}> = ({ children }) => {
    const [state, dispatch] = useReducer(GameReducer, initialState);

    return (
        <GameContext.Provider value={{ state, dispatch }}>
            {children}
        </GameContext.Provider>
    );
};

{/* Custom Hook */}

export const useGameContext = () => useContext(GameContext);