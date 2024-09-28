import React from 'react'

function Button({
    children,
    className='',
    bgColor= 'bg-blue-400',
    textColor='text-white',
    type="button",
    ...props
}) {
  return (
    <button className={`px-4 py-2 rounded-lg ${className} ${bgColor} ${textColor}`} {...props}>
      {children}
    </button>
  )
}

export default Button