import React from 'react'

export default function Noteitem(props) {
  const {title, description, tag, date} = props.note;
  return (
    <div className='card max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 relative p-2'>
        <h1 className='title mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white'>{title}</h1>
        <p className='desc mb-2 font-normal text-gray-700 dark:text-gray-400 overflow-hidden'>{description}</p>
        <div className='w-full flex align-center justify-between'>
            <span>{date}</span>
            <span>{tag}</span>
        </div>
    </div>
  )
}
