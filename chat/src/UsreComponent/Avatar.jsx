import React from 'react'
import { PiUserCircle } from "react-icons/pi";
import { useSelector } from 'react-redux';


let Avatar=({userId,name,imgurl,width,height,size})=> {


const Onlineuser=useSelector(state=>state?.user?.onlineUser)
// console.log(Onlineuser);

    let avatarname=''
    if(name){
      let splitname=  name.split(" ")
        if(splitname.length >1){
            avatarname=splitname[0][0]+splitname[1][0]
        }else{
            avatarname=splitname[0][0]
        }
    }


    let bg=[
        'bg-slate-200',
        'bg-teal-200',
        'bg-red-200',
        'bg-green-200',
        'bg-yellow-200',
        'bg-orange-200',
    ]

    const rendomNumer=Math.floor( Math.random() * 5)

    const isOnline=Onlineuser.includes(userId)
  return (
    <div className={`text-slate-800   text-center  rounded-full relative shadow border text-xl font-bold p-0 ${bg[rendomNumer]}`}  style={{width:1+width+'px',height:1+height+'px'}}>
    <div className={`text-slate-800 overflow-hidden  text-center  rounded-full relative shadow border text-xl font-bold `}  style={{width:width+'px',height:height+'px'}}>
        {
            imgurl?(
                <img 
                src={`/uploads/${imgurl}`}
                width={width}
                height={10}
                className="rounded-full"
               
                />
            ):(
               name? (<div style={{width:width+'px',height:height+'px'}} className='overflow-hiddin rounded-full mt-1'>
           {avatarname}
                </div>
               ):(
                <PiUserCircle 
             size={size}
                
                />
               )

            )

            
        }
     
    </div>
     {
         isOnline&&(
            <div className='bg-green-600 p-1 absolute bottom-1 rounded-full  z-999   right-0 '></div>
         )
      }
    </div>
  )
}

export default React.memo(Avatar)
