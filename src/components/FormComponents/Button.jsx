import React from 'react'

function Button({ children, disabled, type, className }) {
  return (
    <button className={`btn btn-${type} ${className}`} disabled={disabled}>{children}</button>
  )
}

export default Button