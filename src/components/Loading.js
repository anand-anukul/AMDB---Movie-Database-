import React from 'react'
import Loader from "../Loading.gif"
const Loading = () => {
  return (
    <div className='w-screen h-screen flex justify-center items-center bg-black'>
      <img src={Loader} alt='' className='object cover h-[50%] bg-black'></img>
    </div>
  )
}

export default Loading
