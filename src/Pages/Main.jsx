import React from 'react'
import Nav from '../Components/Nav'
import MainTitle from '../Components/MainTitle'

const Main = () => {
  return (
    <div>
      <Nav logoType='locationintro' showButton={true} />
      <MainTitle />
    </div>
  )
}

export default Main