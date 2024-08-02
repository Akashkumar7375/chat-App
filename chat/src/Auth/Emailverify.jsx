import React from 'react'
import { Link, useParams } from 'react-router-dom'

function Emailverify() {
   const {id}= useParams()

   fetch(`http://localhost:5001/emailverifyy/${id}`,{
    method:"PUT",
   }).then((res)=>{return res.json}).then((data)=>{
    console.log(data);
   })

  return (
  <section>
     <h1>Your Email Has been Verified</h1>
    <Link to={`/uploadimg/${id}`} className='text-blue-800 underline'>please login</Link>
       
  </section>
  )
}

export default Emailverify
