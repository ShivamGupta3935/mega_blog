import React,{useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Protector({children, authentication=true}) {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
       if (authentication && authStatus !== authentication) {
          navigate('/login')
       }else if(!authentication && authentication !== authStatus){
          navigate('/')
       }
       setLoader(false)
    },[authStatus, navigate, authentication])

  return (
    <div>Protector</div>
  )
}

export default Protector