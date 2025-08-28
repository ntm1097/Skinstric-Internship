import React from 'react'
import squareBox from '../Assets/Squarebox.svg'

const RotatingSquares = () => {
  return (
    <>
                  <img className='square__one' src={squareBox} alt="" />
                  <img className='square__two' src={squareBox} alt="" />
                  <img className='square__three' src={squareBox} alt="" />
    </>
  )
}

export default RotatingSquares