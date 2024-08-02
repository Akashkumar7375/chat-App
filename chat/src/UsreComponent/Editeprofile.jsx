import React, { useEffect, useRef, useState } from 'react'
import Avatar from './Avatar'
import Divder from './Divder'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../redux/user/useSlice'
import toast, { Toaster } from 'react-hot-toast';


function Editeprofile({onclose,data}) {

  let id=data._id
  const dispatch=useDispatch()
  
  
  
  const[fullname,setFullname]=useState('')
  const[img,setImg]=useState('')

    useEffect(()=>{
      setFullname(data.fullname)
      setImg(data.profileimg)
    },[data])



   let uploadRefer=useRef(null)
 
    // Usage example
   
    const openfolder=(e)=>{
      e.preventDefault()
      e.stopPropagation()
      uploadRefer.current.click()
    }
  
   let handleImage=(e)=>{
    const file=e.target.files[0]
      setImg(file)
   }
   
  
let handlecontrol= async(e)=>{
  e.preventDefault()
  e.stopPropagation()

  const formData=new FormData()
  formData.append('fullname',fullname)
  formData.append('img',img)


  fetch(`http://localhost:5001/updateprofile/${id}`,{
    method:"PUT",
    body:formData
  }).then((respons)=>{ return respons.json()}).then((responsdata)=>{
console.log(responsdata);
if(responsdata.status===200){
       localStorage.setItem('userdata',JSON.stringify(responsdata.ApiData))
       dispatch(setUser(responsdata.ApiData))
       onclose(false)
       toast.success("user Successufully",{
        position:"top-center",
       
       })
    
       


}else{
  toast.error(responsdata.message)
}
  }).catch((error)=>{
    console.log(error.message);
  })





}

  return (
    <div className='flex justify-center items-center  fixed top-0 bottom-0 left-0 right-0 bg-gray-600  bg-opacity-40'>
     <div className='bg-white p-4 py-6 m-1 rounded w-full max-w-sm'>
           <h1 className=' font-semibold'>Profile Details</h1>
           <p className='text-sm'>Edit user Details</p>
           <form 
           className='mt-3'
            onSubmit={handlecontrol}>
            <div className='flex flex-col gap-2'>
              <label >Name</label>
              <input type="text" name='name' id='name'
               className='w-full py-1 px-2 focus:outline-teal-300'
               value={fullname}
              onChange={(e)=>{setFullname(e.target.value)}}
              />
            </div>
            <div>
              <div>Profile:</div>
              <div className=' flex items-center gap-3'>
                <Avatar
                width={60}
                height={60}
                name={data.name}
                imgurl={data.profileimg}
                size={60}
                />
                <label htmlFor='profile_pic'>
                <div onClick={openfolder} className=' font-semibold cursor-pointer'>Change Profile</div>
                <input type="file"
                name='img'
                className=' hidden'
                onChange={handleImage}
                ref={uploadRefer}
                />
               </label>
              </div>
            </div>
            <Divder/>
            <div className='flex gap-2 w-fit ml-auto mt-3'>
            <button onClick={onclose} className=' border-spacing-2 border-teal-600 border text-teal-600 px-4 py-1 rounded hover:bg-teal-600 hover:text-white
            '>Cancel</button>
            <button onClick={handlecontrol} type='submit' className=' bg-teal-600 text-white border text-primary px-4 py-1 rounded hover:bg-teal-700' >Save</button>
            </div>
           </form>
          
     </div>
     <Toaster/>
    </div>
  )
}

export default React.memo(Editeprofile)
