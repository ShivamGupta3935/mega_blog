import React, {forwardRef, useId} from 'react'

const Input = forwardRef(function Input({
    label,
    type="text",
    className= '',
    ...props
}, ref){
    const Id = useId();
  return(
     <div className='w-full'>
          {
            label && <label
            className='inline-block mb-1 pl-1'
            htmlFor={id}>
             {label}
            </label>
          }
          <input type={text} className={`px-3 py-2 bg-white text-black outline-none focus:bg-gray-50 duration-200 border-gray-200 w-full ${className}`} 
          ref={ref} 
          {...props}
          id={Id}
          />

     </div>
  )
})

export default Input