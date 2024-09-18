import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  console.log(import.meta.env.VITE_PRODUCT_ID)
  return (
    <>
       <h1 className="text-3xl font-bold underline">
        Mega blog app with appwrite
    </h1>
    </>
  )
}

export default App
