import { Password } from "@mui/icons-material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import {  useDispatch } from 'react-redux'
import { setToken, setUser } from "../redux/user/useSlice";
import toast, { Toaster } from 'react-hot-toast';

function Login() {
       const dispatch=useDispatch()
       
      //  const[user, setUser]=useState()
      //  console.log(user );
      //  const[token, setToken]=useState()
      const navigate=useNavigate()
      const [mess,setMess]=useState('')
    const[fdata,setFdata]=useState({
        email:'',
        password:''
    })

    function formcontrol(e){
        e.preventDefault();
        let fromdata=fdata

        fetch(`http://localhost:5001/login`,{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(fromdata)
        }).then((respons)=>{return respons.json()}).then((data)=>{
         if(data.status===200){
        //  console.log(data);
          dispatch(setUser(data.Apidata))
          dispatch(setToken(data.token))
          localStorage.setItem('token',JSON.stringify(data.token))
          localStorage.setItem('userdata',JSON.stringify(data.Apidata))
          toast.success("successuffuly",{
            position:"top-center"
          })
          navigate('/dashborad')
         
          
         }else{
          setMess(data.message)
         }
        })
    }


  return (
   
    <div className= ' login h-screen container-fluid shadow-lg  rounded-lg flex  justify-center items-center' >
        
    <div className=' bg-white w-[400px] h-[500px] shadow-lg  rounded-lg'>
        <div className="headline text-center mt-10 font-semibold">
    <h1 className="text-4xl font-normal">Welcome</h1>
    <p className="text-2xl font-light mb-1 ">Sing in to get explored</p>
    </div>
    <p className='px-3 text-center'>{mess}</p>
      <form action="" className="m-10" onSubmit={(e)=>{formcontrol(e)}}>
      <label className="block">
  <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
    Email
  </span>
  <input type="email" name="email" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="you@example.com" value={fdata.email}  onChange={(e)=>{setFdata({...fdata,email:e.target.value})}} />
</label>
<label className="block mt-1">
  <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
    Password
  </span>
  <input type="password" name="password" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="password"value={fdata.password}  onChange={(e)=>{setFdata({...fdata,password:e.target.value})}} />
</label>

<button className=" rounded-full ... bg-blue-500 hover:bg-blue-800 px-7 py-2 mt-5  text-white text-center">Sign in</button>
<div className="mt-5">Did not have an account?: <Link to='/signup' className="text-blue-700 underline cursor-pointer">Sign up</Link></div>

      </form>
    </div>
    <Toaster/>
   </div>
  
  )
}

export default Login
