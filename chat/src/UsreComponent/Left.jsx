import React, { Suspense, useCallback, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Avatar from '../UsreComponent/Avatar'
import { useDispatch, useSelector } from 'react-redux'
import { logout, setOnlineUser } from '../redux/user/useSlice'
import Editeprofile from './Editeprofile'
import Searchpage from './Searchpage'
import { FiArrowUpLeft } from "react-icons/fi";
import { FaVideo } from "react-icons/fa";
import { FaImage } from "react-icons/fa";
const MyAccount = React.lazy(() => import('./MyAccount'))


function Left() {

  // console.log("left");
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [userdata, setUserdata] = useState('')
  const [editepage, setEditepage] = useState(false)
  const [alluser, setAlluser] = useState([])
  const user = useSelector(state => state?.user)

  const sokectConnection = useSelector(state => state?.user?.sokectConnection)


  useEffect(() => {
    let userdatalocal = JSON.parse(localStorage.getItem('userdata'))
    if (userdatalocal) {
      setUserdata(userdatalocal)
    }
    if (sokectConnection) {
      sokectConnection.emit('sidebar', userdatalocal?._id)

      sokectConnection.on('converstion', (data) => {
        console.log("converstion", data);

        const ConverstionUserData = data.map((converstionUser, index) => {


          if (converstionUser?.sender?._id === converstionUser?.receiver?._id) {
            return {
              ...converstionUser,
              userDetails: converstionUser.sender
            }
          } else if (converstionUser?.receiver?._id !== userdatalocal?._id) {
            return {
              ...converstionUser,
              userDetails: converstionUser.receiver
            }
          } else {
            return {
              ...converstionUser,
              userDetails: converstionUser.sender
            }
          }

        })
        setAlluser(ConverstionUserData)


      })
    }
  }, [user, sokectConnection])




  let Logout = () => {
    dispatch(logout())
    localStorage.removeItem('token')
    localStorage.removeItem('userdata')

    navigate('/')

  }

  // searchpage

  const [searchpage, setSearchpage] = useState(false)

  let fusecall = useCallback(() => {
    return setSearchpage(false)
  })

  return (
    <>
      <div className=' p-0 flex flex-col flex-wrap w-full'>
        <div className=' p-0  sm:h-[100vh] sm:w-[100vw] sm:flex lg:w-[85vw] xl:w-[100vw]   text-slate-700'>
          <div className=' bg-slate-300 sm:w-[13%] md:w-[10%] lg:w-[7%] xl:w-[5%] flex sm:flex-col ps-0 justify-between h-full mt-0'>
            <div className='icons text-center pt-10 h-[22.7%]  flex flex-col items-center '>
              <NavLink className={({ isActive }) => `text-xl text-slate-700 hover:bg-slate-400 hover:text-slate-700 rounded w-full cursor-pointer ${isActive && "bg-slate-400"}`}>
                <i className="bi bi-chat-dots-fill " title='chat'></i>
              </NavLink>

              <div onClick={() => { setSearchpage(true) }} className='text-xl  hover:bg-slate-400 mt-3 w-full cursor-pointer'>
                <i className="bi bi-person-plus-fill   text-xl mt-3"></i>
              </div>

            </div>
            <div className=' flex justify-end items-center pb-4 flex-col'>
              <button
                onClick={() => { setEditepage(true) }}
              >
                <Avatar
                  width={45}
                  height={45}
                  size={45}
                  name={userdata.fullname}
                  imgurl={userdata.profileimg}
                  userId={userdata?._id}
                />
              </button>
              <div className='hover:bg-slate-400 w-full flex justify-center mt-3'>
                <button onClick={(e) => { Logout(e) }} className='hover:text-slate-700  '>
                  <i className="bi bi-box-arrow-left text-xl  "></i>
                </button>
              </div>
            </div>
          </div>

          <div className='sm:w-[100%] md:w-[40%] lg:[5%] xl:w-[33%] border
            h-screen pl-1  bg-slate-100'>
            <Suspense fallback={<h1>loading.....</h1>}>
              <MyAccount data={userdata} />

              <div className='bg-slate-100 h-[69vh] overflow-x-hidden overflow-y-auto scrollbar'>
                <h1 className='font-bold text-2xl '>Messages</h1>

                <div>

                  <div className='text-center mt-10'>
                    {

                      alluser.length === 0 && (
                        <div>
                          <div className='flex justify-center items-center my-4 text-slate-500'>
                            <FiArrowUpLeft size={50} />
                          </div>
                          <p className='text-lg text-center text-slate-400'>Explore users to start <br /> a conversation with</p>
                        </div>
                      )
                    }

                    {
                      alluser.map((conv, index) => {
                        return (
                          <NavLink to={`/dashborad/${conv?.userDetails?._id}`} key={conv?._id} className='flex items-center gap-2 bg-slate-300 mt-2 hover:bg-slate-400 rounded-full p-2 cursor-pointer bor' >
                            <div>
                              <Avatar
                                imgurl={conv?.userDetails?.profileimg}
                                name={conv?.userDetails?.fullname}
                                width={40}
                                height={40}
                              />
                            </div>
                            <div className=' text-left'>
                              <h3 className='text-ellipsis font-semibold text-base line-clamp-1 m-0'>{conv?.userDetails?.fullname}</h3>
                              <div className='text-slate-600 text-sm flex items-center gap-1'>

                                <div className='flex items-center gap-1'>
                                  {
                                    conv.lastMsg?.imgUrl && (
                                      <div className='flex items-center gap-1'>
                                        <span><FaImage size={18} /></span>
                                        {!conv?.lastMsg?.text && <span>Image</span>}
                                      </div>
                                    )
                                  }
                                  {
                                    conv.lastMsg?.videoUrl && (
                                      <div className='flex items-center gap-1'>
                                        <span><FaImage size={18} /></span>
                                        {!conv?.lastMsg?.text && <span>Video</span>}
                                      </div>
                                    )
                                  }
                                </div>

                                <p className='text-ellipsis line-clamp-1'>{conv?.lastMsg?.text}</p>
                              </div>
                            </div>
                            {
                              Boolean(conv?.unseenMesaage) && (
                                <p className='text-xs w-8 h-8 flex justify-center items-center relative right-3 ml-auto p-1 bg-blue-600 text-white font-semibold rounded-full'>{conv?.unseenMesaage}</p>

                              )
                            }


                          </NavLink>
                        )
                      })
                    }

                  </div>
                </div>

              </div>

            </Suspense>

          </div>
          <div className='bg-slate-300 text-3xl md:w-[100%] sm:w-[100%] flex flex-col justify-center items-center  lg:w-[100%] xl:w-[62%]'>

            <h1>Chat App</h1>
            <p>Select user to send message</p>
          </div>

        </div>
        {/* edite parofile page */}
        {
          editepage && (
            <Editeprofile onclose={() => setEditepage(false)} data={userdata} />
          )
        }
      </div>


      {/* // searchpage contect */}

      <div >
        {
          searchpage && (
            <Searchpage onclose={fusecall} />
          )
        }
      </div>
    </>
  )
}

export default React.memo(Left)
