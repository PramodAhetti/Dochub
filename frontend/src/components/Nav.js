import React from 'react'
import { Outlet,Link, useNavigate} from 'react-router-dom'

export default function Nav() {
 let navigate=useNavigate();
  return (

    <div className='NewPost'>
    
        <Link className='NewNear' to='/new'>New</Link>
        <Link className='NewNear'  to='/near'>List</Link>

      <Outlet />
    </div>
  )
}
