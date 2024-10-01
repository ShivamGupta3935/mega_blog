import React from 'react'
import appwriteService from '../appwrite/database'
import { Link } from 'react-router-dom'

export default function PostCard({$id, title, featuredImage}) {
  return (
    <Link to={`/post/${$id}`}>
      <div className='w-full p-3 rounded-xl bg-gray-100'> 
         <div className='w-full mb-4 justify-center'> 
          <img src={appwriteService.getFilePreview(featuredImage)} alt={title} />
         </div>
         <h2 className='font-bold rounded-xl'>{title}</h2>
      </div>
    </Link>
  )
}
