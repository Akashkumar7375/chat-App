import React,{ Suspense, useEffect, useId, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { useLocation, useNavigate } from 'react-router-dom';
import io from 'socket.io-client'
import { setOnlineUser ,setSocketConnection} from '../redux/user/useSlice';
import Messagebox from './Messagebox';

const Left=React.lazy(()=>import('./Left'));



function Dashborad() {

    const[userdata,setUserdata]=useState('')
    const user=useSelector(state=>state?.user) 
    const data=useSelector(state=>state.user?.onlineUser)
    let token=JSON.parse(localStorage.getItem('token'))
    var navigate=useNavigate()
    let dispatch=useDispatch()
  
    // console.log(user);
 // connect socket

  useEffect(()=>{
  let token=JSON.parse(localStorage.getItem('token'))

    const socketConnection=io('http://localhost:5001',{
      auth:{
      token:token
      }
    })

    socketConnection.on("onlineUser",(data)=>{
      dispatch(setOnlineUser(data))
    })

    dispatch(setSocketConnection(socketConnection))
    return()=>{
      socketConnection.disconnect()
    }
  },[])

 const location=useLocation()

//  console.log(id);
        let urlid=location.pathname===`/dashborad`
       
        useEffect(()=>{
          var userdatalocal=JSON.parse(localStorage.getItem('userdata'))
          if(userdatalocal){
            setUserdata(userdatalocal)
          }
      },[user])
     
      if(!token){
        navigate('/dashborad/')
      }else{

     
          return (
            <>
              <div className='w-[100%]  h-screen flex'>
                <div className={`col-1 sm:w-[100%] md:w-[60%] lg:w-[40%] xl:w-[38%] ${!urlid && "hidden"}  lg:block`}>
                  <Suspense fallback={<p>Loading....</p>}> 
                         <Left />
                         </Suspense>
                         
                         </div>
                        
                         
                  <div className={`${urlid && 'hidden'} bg-slate-300 text-3xl md:w-[100%] sm:w-[100%] flex flex-col justify-center items-center  lg:w-[80%] xl:w-[62%] `}>

                      <Messagebox/>
                
                  </div>
                
              </div>
            </>
          )
      }
       
}

export default React.memo(Dashborad)
