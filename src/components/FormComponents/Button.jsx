import React from 'react'

function Button({ children, disabled }) {
  return (
    <button className='btn-primary' disabled={disabled}>{children}</button>
  )
}

export default Button