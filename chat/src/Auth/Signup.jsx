import { Password } from '@mui/icons-material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Signup() {

  const[form ,setForm]=useState({
    
        fullname:'',
        email:'',
        password:''
    })
    const[mess,setMess]=useState('')
   
let formcontrol=async(e)=>{
  
    e.preventDefault()
    try{
   let fdata=form

   
   await fetch(`http://localhost:5001/signup`,{
    method:'POST',
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(fdata)
   }).then((respons)=>{
     return respons.json()
   }).then((data)=>{
    console.log(data);
    if(data.status===201){
      setMess(data.message)
      
    }else{
      setMess(data.message)
    }
   })
  }catch(error){
    console.log("error" ,error.message);
   }
}

    
  return (
    <>
         <div className= ' login w-screen h-screen shadow-lg  rounded-lg flex  justify-center items-center' >
        
        <div className=' bg-white w-[400px] h-[500px] shadow-lg  rounded-lg'>
            <div className="headline text-center mt-10 font-semibold">
        <h1 className="text-4xl font-normal">Welcome</h1>
        <p className="text-2xl font-light mb-1 ">Sing up to get started</p>
        </div>
        <p className='px-3 text-center'>{mess}</p>
          <form action="" className="mx-10 mt-2" onSubmit={(e)=>{formcontrol(e)}}>

          <label className="block mt-2">
      <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
        Full Name
      </span>
      <input type="text" name="fullname" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Full Name"  value={form.name} onChange={(e)=>{setForm({...form ,fullname:e.target.value})}}/>
    </label>

          <label className="block mt-2">
      <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
        Email
      </span>
      <input type="email" name="email" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="you@example.com"  value={form.email} onChange={(e)=>{setForm({...form ,email:e.target.value})}}/>
    </label>
    <label className="block mt-2">
      <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
        Password
      </span>
      <input type="password" name="password" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="password"  value={form.password} onChange={(e)=>{setForm({...form ,password:e.target.value})}}/>
    </label>
    
    <button className=" rounded-full border-none bg-blue-500 hover:bg-blue-800 px-7 py-2 mt-4  text-white text-center">Sign up</button>
    <div className="mt-2">Alredy have an account?: <Link to='/' className="text-blue-700 underline cursor-pointer">Sign in</Link></div>
    
          </form>
        </div>
       </div>
    </>
  )
}

export default Signup
