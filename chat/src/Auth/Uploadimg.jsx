import { Password } from '@mui/icons-material'
import { nativeSelectClasses } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'


function Uploadimg() {

 let {id}= useParams()
 let navigate=useNavigate()

  const[img ,setImg]=useState('')
    const[mess,setMess]=useState('')
let formcontrol=async(e)=>{
    e.preventDefault()
    let image=((img.size)/(1024))
if(image>=100){
    alert('image size  not valid 100k')
}else{
  let fdata=new FormData()
  fdata.append('img',img)
;


  fetch(`http://localhost:5001/uploadimg/${id}`,{
    method:'PUT',
    body:fdata
  }).then((respons)=>{return respons.json()}).then((data)=>{
    console.log(data);
    if(data.status===200){
      setMess(data.message)
      navigate('/')
    }else{
      setMess(data.message)
    }
   })
   
}}
    
  return (
    <>
         <div className= ' login w-screen shadow-lg h-screen  rounded-lg flex  justify-center items-center' >
        
        <div className=' bg-white w-[400px] h-100% shadow-lg  rounded-lg'>
            <div className="headline text-center mt-10 font-semibold">
        <h1 className="text-4xl font-normal">Welcome</h1>
        <p className="text-2xl font-light mb-1 ">Sing up to get started</p>
        </div>
        <p className='px-3'>{mess}</p>
             <div className='w-[100%] h-[100px] flex justify-center'>
              {img?<img src={URL.createObjectURL(img)} className='w-[100px] rounded-full' alt="" />:<img src='/media/avatar-svgrepo-com.png' className='w-[100px]' alt="" />}  
             </div>
          <form action="" className="mx-10 my-2" onSubmit={(e)=>{formcontrol(e)}}>
           <input type='file' name='img' onChange={(e)=>{setImg(e.target.files[0])}}/>
            <button className='w-full bg-blue-400 mt-2 p-2 rounded-lg' >Upload</button>
          </form>
        </div>
       </div>
    </>
  )
}

export default Uploadimg
