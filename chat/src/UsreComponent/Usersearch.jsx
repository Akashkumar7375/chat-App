import React from 'react'
import Avatar from './Avatar'
import { Link } from 'react-router-dom'

function Usersearch({user, onclose}) {
  
  return (
    <Link to={`/dashborad/${user?._id}`} onClick={onclose} className='flex item-cenetr gap-3 p-2 lg:p-4 border border-transparent border-slate-200 hover:border-teal-300' >
    <div>
      <Avatar
      width={40}
      height={40}
      name={user?.fullname}
      userId={user?._id}
      />
    </div>
    <div>
    <div className=' font-semibold  text-ellipsis line-clamp-1'>
    {user.fullname}
    </div>
    <p className=' text-sm text-ellipsis line-clamp-1'>{user.email}</p>
    </div>
    </Link>

  )
}

export default React.memo(Usersearch)
