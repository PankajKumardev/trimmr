import React from 'react'

const error = ({message}) => {
  return (
    <span className='text-sm text-red-400'>{message}</span>
  )
}

export default error