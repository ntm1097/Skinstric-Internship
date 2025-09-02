import React from 'react'
import PhotoScan from "../Assets/camera-svg.svg"
import RotatingSquares from '../Components/RotatingSquares'
import BetterResults from '../Components/BetterResults'

const CameraSetup = () => {
  return (
     <>
     <div className='camera__setup'>
          <RotatingSquares />
          <img src={PhotoScan} alt="" />
          <h2>SETTING UP CAMERA...</h2>
          <BetterResults variant="camera--setup" />
      </div>
      
      </>
  )
}

export default CameraSetup