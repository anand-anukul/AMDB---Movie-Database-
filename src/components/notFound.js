import React from 'react'
import notfound from "../giphy.gif"
const NotFound = () => {
  return (
    <div className='w-screen h-screen flex justify-center items-center bg-black'>
      <img src={notfound} alt='not found' className='object cover h-[50%] bg-black'></img>
    </div>
  )
}

export default NotFound
