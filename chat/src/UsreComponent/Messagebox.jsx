import React, { Suspense, useEffect, useRef, useState } from 'react'

import { IoMdSend } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { FaVideo } from "react-icons/fa";
import { FaImage } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import { FaPlus } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { FaArrowLeft } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from 'react-router-dom';
import Avatar from './Avatar';
import moment from 'moment'
const Left = React.lazy(() => import('./Left'));

function Messagebox() {

  const sokectConnection = useSelector(state => state?.user?.sokectConnection)
  const params = useParams()
  const user = JSON.parse(localStorage.getItem('userdata'))


  const [userData, setUserData] = useState({
    _id: '',
    fullname: '',
    email: '',
    profileimg: '',
    online: false

  })
  //  console.log("parmad",params.id);

  useEffect(() => {
    if (sokectConnection) {
      sokectConnection.emit('message-page', params.id)


      sokectConnection.emit('seen',params.id)
      sokectConnection.on('message-user', (data) => {
        // console.log("userDetails",data);
        setUserData(data)

      })

      sokectConnection.on('message', (data) => {
        console.log("new message", data);
        setAllmessages(data)
      })
    }
  }, [sokectConnection, params?.id])





  const uploadRefer = useRef(null)
  const uploadRefer1 = useRef(null)

  const openfolder = (e) => {
    e.preventDefault()
    e.stopPropagation()
    uploadRefer.current.click()
  }
  const openfolder1 = (e) => {
    e.preventDefault()
    e.stopPropagation()
    uploadRefer1.current.click()
  }
  const [opaneImageVideoUpload, setOpaneImageVideoUpload] = useState(false)
  const [loading, setLoading] = useState(false)
  const currentMessage = useRef(null)
  const [allmessages, setAllmessages] = useState([])
  const [messages, setMessages] = useState({
    text: '',
    imageUrl: '',
    videoUrl: ''
  })

  useEffect(() => {
    if (currentMessage.current) {
      currentMessage.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }

  }, [allmessages])

// handel file function
  let convertToBase64=(file)=>{
     return new Promise((resolve,reject)=>{
      const reader= new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
     })
  }



  let handleImageVideoUpload = () => {
    setOpaneImageVideoUpload(prv => !prv)
  }

  // upload image
  const uploadImage = (e) => {
    setLoading(true)
    let file = e.target.files[0]
   
    setMessages(prv => {
      return {
        ...prv,
        imageUrl:file
      }
    })
    setOpaneImageVideoUpload(false)
    setLoading(false)


  }
  // upload video
  const uploadVideo = (e) => {
    setLoading(true)
    let file = e.target.files[0]


    setMessages(prv => {
      return {
        ...prv,
        videoUrl:file
      }
    })
    setOpaneImageVideoUpload(false)
    setLoading(false)

  }

  // handle clear image
  const handleclearimage = () => {
    setMessages(prv => {
      return {
        ...prv,
        imageUrl: ''
      }
    })
  }

  // handle clear image
  const handleclearvideo = () => {
    setMessages(prv => {
      return {
        ...prv,
        videoUrl: ''
      }
    })

  }


  // handle form data
  const handleform = async(e) => {
    e.preventDefault()
    
    
    if (messages.text || messages.imageUrl || messages.videoUrl) {
      let fdata={
        sender: user?._id,
        receiver: params?.id,
        text: messages.text,
        mesByUserId: user?._id
      }
      if (messages.imageUrl) {
        fdata.imageUrl = await convertToBase64(messages.imageUrl);
      }
    
      if (messages.videoUrl) {
        fdata.videoUrl = await convertToBase64(messages.videoUrl);
      }
      // console.log( fdata);
      if (sokectConnection) {
        sokectConnection.emit('new message', fdata)
      }
    }


    setMessages({
      text: '',
      imageUrl: '',
      videoUrl: ''
    })
  }


  return (

    <>
      <div className='  w-[100%] h-screen flex justify-between flex-col messagebox'>

        <header className='h-16  col-2 md:w-[100%] sm:w-[100%] flex flex-col justify-between  lg:w-[100%] xl:w-[100%]  2xl:w-[100%] bg-white'>
          <div className=' w-full h-full bg-slate-200 '>
            <div className='h-full flex rounded-full p-0 items-center '>

              <Link to='/dashborad'>
                <FaArrowLeft className='ms-3' size={20} />
              </Link>
              <div className='ml-6'>

                <Avatar
                  width={50}
                  height={50}
                  imgurl={userData?.profileimg}
                  name={userData?.fullname}
                  userId={userData?._id}
                />

              </div>
              <div className='ms-4'>
                <h1 className='text-lg font-semibold text-ellipsis line-clamp-1'>{userData.fullname}</h1>
                {
                  !userData.online ? <p className='text-sm font-light text-slate-700'>Offline</p>
                    : <p className='text-sm font-light text-green-600'>Online</p>
                }

              </div>
              <div className=' absolute right-5 cursor-pointer hover:text-blue-400'>
                <BsThreeDotsVertical size={25} />
              </div>
            </div>
          </div>
        </header>
        {/* show all messages */}
        <section className='h-full overflow-x-hidden overflow-y-scroll  bg-slate-200 bg-opacity-50'>




          {/* all message show */}

          <div className='flex flex-col gap-2 py-2 mx-2' ref={currentMessage}>
            {
              allmessages.map((msg, index) => {

                return (

                  <div key={index} className={` p-1 py-1  rounded w-fit max-w-md  ${user._id === msg.mesByUserId ? "ml-auto bg-teal-300" : "bg-white"}`}>
                    <div className='w-full'>
                      {msg.imgUrl && (
                        <img src={`..backend/public/uploads/${msg.imgUrl}`}
                          className='w-full h-full object-scale-down'
                        />
                      )}
                    </div>
                    <div className='w-full'>
                      {msg.videoUrl && (
                        <img src={`..backend/public/uploads/${msg.videoUrl}`}
                          className='w-full h-full object-scale-down'
                        />
                      )}
                    </div>
                    
                    
                    <p className='px-2'>{msg.text}</p>
                    <p className='text-xs ml-auto w-fit'>{moment(msg.createdAt).format('hh:mm')}</p>
                  </div>
                )
              })
            }
          </div>

          {/* Upload Image display */}
          {
            messages.imageUrl && (
              <div className='w-full h-full sticky bottom-0 bg-slate-700 bg-opacity-30 flex justify-center items-center rounded overflow-hidden '>

                <div className='w-fit absolute top-3 right-3  cursor-pointer hover:text-red-600' onClick={handleclearimage}>
                  <IoMdClose size={20} />
                </div>
                <div className='bg-white p-3'>
                  <img src={URL.createObjectURL(messages.imageUrl)} alt="uploadImage"
                    className=' aspect-video w-full h-full max-w-sm m-2 object-scale-down'
                  />
                </div>

              </div>
            )
          }

          {/* Upload video display */}
          {
            messages.videoUrl && (
              <div className='w-full h-full sticky bottom-0 bg-slate-700 bg-opacity-30 flex justify-center items-center rounded overflow-hidden '>

                <div className='w-fit absolute top-3 right-3  cursor-pointer hover:text-red-600' onClick={handleclearvideo}>
                  <IoMdClose size={20} />
                </div>
                <div className='bg-white p-3'>
                  <video src={URL.createObjectURL(messages.videoUrl)} alt="uploadVideo"
                    className=' aspect-video w-full h-full max-w-sm m-2 object-scale-down'
                    controls
                    muted
                    autoPlay
                  />
                </div>

              </div>
            )
          }
          {
            loading && (
              <div role="status">
                <svg aria-hidden="true" class="w-15 h-15 sticky bottom-0 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span class="sr-only">Loading...</span>
              </div>
            )
          }
        </section>
        {/* send input*/}
        <section className='h-16 bg-white flex items-center px-4'>
          <div className=' relative '>
            <button onClick={handleImageVideoUpload} className='flex justify-center items-center w-11 h-11 rounded-full hover:bg-blue-500 hover:text-white'>
              <FaPlus size={20} />
            </button>

            {/* video && image */}

            {
              opaneImageVideoUpload && (
                <div className='bg-white shadow  rounded absolute bottom-14 w-36 p-2'>
                  <form onSubmit={handleform} >
                    <lable onClick={openfolder} htmlFor='uploadImage' className='flex items-center p-2 gap-3 px-2 cursor-pointer hover:bg-slate-200 rounded-md'>
                      <div className='text-blue-400'>
                        <FaImage size={18} />
                      </div>
                      <p className='text-xl'>Image</p>
                    </lable>
                    <lable htmlFor='uploadVideo' onClick={openfolder1} className='flex items-center p-2 gap-3 px-2 cursor-pointer hover:bg-slate-200 rounded-md'>
                      <div className='text-purple-500'>
                        <FaVideo size={18} />
                      </div>
                      <p className='text-xl'>Video</p>
                    </lable>

                    <input type="file"
                      id='uploadImage'
                      onChange={uploadImage}
                      className=' hidden'
                      ref={uploadRefer}
                    />

                    <input type="file"
                      id='uploadVideo'
                      onChange={uploadVideo}
                      className=' hidden'
                      ref={uploadRefer1}
                    />

                  </form>

                </div>
              )
            }

          </div>
          {/* input box */}

          <form className='h-full w-full flex gap-2' onSubmit={handleform}>
            <input
              type="text" className=' 
        h-full py-1 px-4 outline-none w-full text-xl'
              placeholder='type here message'
              value={messages.text}
              onChange={(e) => {
                const { name, value } = e.target;
                setMessages(prv => {
                  return {
                    ...prv,
                    text: value
                  }
                })
              }}
            />
            <button className='text-blue-500 hover:text-blue-700'>
              <IoMdSend size={28} />
            </button>
          </form>


        </section>


      </div>
    </>
  )
}

export default React.memo(Messagebox)
