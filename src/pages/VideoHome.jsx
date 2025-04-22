import React from 'react'
import { useState,  useCallback } from 'react'
import { useNavigate } from 'react-router-dom';
const VideoHome = () => {
    const [value,setValue]= useState("");

    const navigate= useNavigate()
    const handleJoinRoom= useCallback(()=>{
        navigate(`/room/${value}`);
    },[navigate,value])
  return (
    <div>
      <input 
      type='text' 
      placeholder='Enter Room Code'
      value={value}
      onChange={(e)=>{setValue(e.target.value)}}
      />
      <button onClick={handleJoinRoom}>Join</button>
    </div>
  )
}

export default VideoHome
