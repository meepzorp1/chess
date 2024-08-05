import React from 'react'
import Board from './components/Board'

{/*
    Chess Game Layout

    Gutters are for Chess pieces that are captured.

    Extra credit: Make Pieces smaller in Gutter.
*/}

const Gutter = () => {

    return (
        <div>Gutter</div>
    )
}

const Chess = () => {

  return (
    <div className='p-8 flex w-full h-screen justify-between'>
      <Gutter />
      <Board />
      <Gutter />
    </div>
  )
}

export default Chess