import React from 'react'

export default function Alert({bgColor, msg}) {
  return (
    <div className={`p-4 mb-4 w-[25%] mx-auto text-sm rounded-lg text-white bg-${bgColor}-400`} role="alert">
        <span className="font-medium">{msg}</span>
    </div>
  )
}
