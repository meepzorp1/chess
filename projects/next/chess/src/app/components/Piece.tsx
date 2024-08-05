"use client";

import React, { useState, useEffect } from 'react'
import { ChessPiece } from '../lib/Types'
import * as SVG from '../lib/PieceSVG'
import { useGameContext } from '../context/GameContext';
import { getMoves } from '../util/moves';

{/*
    Piece Component

    This component is responsible for rendering the chess pieces on the board.

    The Piece component will receive the following props:
    - type: string
    - color: string
    - hasMoved: boolean

    Calculates and passes 'moves' prop to the Space component.
    The 'moves' prop is an array of numbers that represent the possible moves for the selected piece.
    The 'moves' prop is calculated by the getMoves function in the lib/Chess.ts file.

    Extra credit: Make Pieces draggable.
    highlight the possible moves when a piece is selected.
    bounce animation when a piece is selected.
    animate the piece to the new position when moved.

*/}


const Piece = (props: ChessPiece) => {
  const [svg, setSvg] = useState<React.ReactNode | null>(null);
  const [moves, setMoves] = useState<number[][]>([]);
  const { state, dispatch } = useGameContext();
  const { board } = state;

  useEffect(() => {
    switch (props.type) {
      case 'pawn':
        setSvg(SVG.pawn)
        break;
      case 'rook':
        setSvg(SVG.rook)
        break;
      case 'knight':
        setSvg(SVG.knight)
        break;
      case 'bishop':
        setSvg(SVG.bishop)
        break;
      case 'queen':
        setSvg(SVG.queen)
        break;
      case 'king':
        setSvg(SVG.king)
        break;
      default:
        setSvg(null)
    }
  }, [])

  useEffect(() => {
    setMoves(getMoves(board, props.type, props.row, props.col, props.color, props.hasMoved));
  }, [board]);
  useEffect(() => {
    console.log();
  }, [moves]);

  const handleClick = () => {
    if (props.color === state.turn) {
      dispatch({ type: 'SELECT_SQUARE', payload: [props.row, props.col], moves: getMoves(board, props.type, props.row, props.col, props.color, props.hasMoved)})
      } 
  }
  
  return (
    <div className={`${props.color} h-full p-4`} onClick={handleClick}>{svg}</div>
  )
}

export default Piece