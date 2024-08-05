"use client";

import React, { FC, ReactNode, useReducer, useState, useEffect, useLayoutEffect } from 'react'
import { useGameContext } from '../context/GameContext';
import { GameReducer } from '../reducers/GameReducer';
import { SpaceProps } from '../lib/Types';

{/*
    Space Component

    This component is responsible for rendering the spaces on the board
    and holds the Pieces.

    Space will be responsible for comparing moves between 
    Piece siblings.

    Add selected: boolean
*/}

const Space = ( props: SpaceProps ) => {
  const [child, setChild] = useState<ReactNode | null>(null);
  const { state, dispatch } = useGameContext();
  const { board } = state;
  const { row, col } = props;

  {/* 
    If selected === null the clicked space needs to have a child (piece

    else if selected !== null
      this could be done three ways
        1. check if space is empty or piece in space is opposite color, then check moves[]
        2. check moves[] and trust that that algorithm makes proper checks (check)
        3. both
  */}

  const handleClick = () => {
    if (state.selectedSquare !== null) {
      dispatch({ type: 'MOVE_PIECE', payload: [props.row, props.col] })
    }
  }

  return (
    <div className={`w-24 h-24 border-2 border-black ${props.selected? 'bg-blue-500': ''}`} onClick={handleClick}>
        { props.children }
    </div>
  )
}

export default Space