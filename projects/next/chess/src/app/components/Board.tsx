"use client";

import React, { useEffect } from 'react'
import { useGameContext } from '../context/GameContext';
import Space from './Space';
import Piece from './Piece';
import { GameState, GameAction, ChessPiece } from '../lib/Types';

{/*
    Board Component

    This component is responsible for rendering the game board and the pieces on it.

*/}

const Board = () => {
    const { state } = useGameContext();
    const { board } = state;
    const [selectedRow, selectedCol] = state.selectedSquare || [null, null];

    useEffect(() => {
console.log('board changed')
    }, [state.board]);

    return (
        <div>
            {
                board.map((row, rowIndex) => (
                    <div className='flex' key={rowIndex}>
                        {row.map((space, colIndex) => (
                            <div key={colIndex} className={(rowIndex+colIndex)%2 === 0? 'bg-[#444]': 'bg-[#aaa]'}>

{/*
    Space Component? Piece component
    
    does Space or Piece need the onClick event?
    
    Piece props are named space here because the not every space has a piece.
*/}

                                <Space row={rowIndex} col={colIndex} selected={selectedRow === rowIndex && selectedCol === colIndex }>{space ? <Piece {...space} row={rowIndex} col={colIndex} /> : null}</Space>
                            </div>
                        ))}
                    </div>
                ))
            }
        </div>
    )
}

export default Board