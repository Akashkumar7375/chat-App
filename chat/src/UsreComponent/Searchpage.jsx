import React, { useEffect, useState } from 'react'
import { CiSearch } from "react-icons/ci";
import Usersearch from './Usersearch';
import { ImCancelCircle } from "react-icons/im";

function Searchpage({onclose}) {


    const[searchuser,setSerachuser]=useState([])
    const[loading,setLoading]=useState(false)
    const[search,setSearch]=useState('')

   

  let handleSearch=(e)=>{
       
    setLoading(true)
    const inputdata={search}; 
  
    fetch(`http://localhost:5001/user/usersearch`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(inputdata)
  }).then((respons)=>{ return respons.json()}).then((data)=>{
   
    if(data.status===200){
        setSerachuser(data.data)
        setLoading(false)
       
    }
  })
}

useEffect(()=>{
    handleSearch()
},[search]) 
    return (
        <div className=' fixed top-0 bottom-0  left-0 right-0 bg-gray-600  bg-opacity-40 p-2'>
          <button onClick={onclose} className='text-2xl float-end'>
          <ImCancelCircle />
          </button>
            <div className=' w-full max-w-lg mx-auto rounded mt-10 '>
                <div className=' bg-white rounded h-14 overflow-hidden flex '>
                    <div   className='h-14 w-full overflow-hidden flex' >
                    <input type="text"
                        placeholder='Search user by name ,email ....'
                        className='w-full  py-1 outline-none h-full px-4'
                         onChange={(e)=>{setSearch(e.target.value)}}
                         value={search}
                    />
                    <div className='h-14 w-14 flex justify-center items-center'>
                        <CiSearch size={25} />
                    </div>
                    </div>
                </div>

                {/*dispaly search user  */}
                <div className='bg-white mt-2 w-full p-4 rounded'>
                    {
                          searchuser.length===0 && !loading &&(
                            <p className='text-center text-slate-500'>no user found !</p>
                          )
                    }
                    {
                        loading &&(
                            <div className
                            ="border border-blue-300 shadow rounded-md p-4  w-full mx-auto">
  <div className
  ="animate-pulse flex space-x-4">
    <div className
    ="rounded-full bg-slate-700 h-10 w-10"></div>
    <div className
    ="flex-1 space-y-6 py-1">
      <div className
      ="h-2 bg-slate-700 rounded"></div>
      <div className
      ="space-y-3">
        <div className
        ="grid grid-cols-3 gap-4">
          <div className
          ="h-2 bg-slate-700 rounded col-span-2"></div>
          <div className
          ="h-2 bg-slate-700 rounded col-span-1"></div>
        </div>
        <div className
        ="h-2 bg-slate-700 rounded"></div>
      </div>
    </div>
  </div>
</div>
                        )
                    }
                    {
                        searchuser.length!==0 && !loading && (
                            searchuser.map((user,index)=>{
                             
                                return(
                                    <Usersearch key={user._id} user={user} onclose={onclose}/>
                                )
                              
                            })
                        )
                    }

                </div>
            </div>
        </div>
    )
}

export default React.memo(Searchpage)
