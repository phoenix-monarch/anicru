import React from 'react'

const WatchNow = ({buttonFunction, BtnName}) => {
  return (
    <button onClick={buttonFunction} >
        {BtnName}
    </button>
  )
}

export default WatchNow