import React, { useEffect, useState } from 'react'
import Avatar from './Avatar'
import { useSelector } from 'react-redux'

function MyAccount({data}) {

  // console.log("my account");




  return (
    <section id='myaccount'>
      <div className='container px-2'>
        <div className='row '>
          <div className='col-md-12 flex'>
        
                <div className='profilr border  border-blue-700 p-1 mt-4 rounded-full w-[80px]  h-[80px]'>
                <Avatar 
                imgurl={data.profileimg}
                width={70}
                height={70}
                size={70}
                />
                </div>
                <div className='m-6'>
                    <h1 className='text-2xl font-bold'>{data.fullname}</h1>
                    <p className='text-lg font-light'>My Account</p>
                </div>
               </div>
               <div>

            
    </div>
          </div>
        </div>
     
    </section>
  
       
  )
}

export default React.memo(MyAccount)
