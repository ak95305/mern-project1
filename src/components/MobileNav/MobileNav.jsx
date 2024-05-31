import React, { useState } from 'react'
import './mobileNav.css'
import { createPortal } from 'react-dom'

function MobileNav() {
  const [open, setOpen] = useState(false);

  const navMenu = (
    <nav className='py-4 d-md-none d-block'>
      <div className="container">
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="logo mb-3 d-flex align-items-center justify-content-between">
              LOGO
              <button className='btn btn-primary btn-sm' onClick={()=>{setOpen(!open)}}>{open ? "❌" : "🍔"}</button>
            </div>
          </div>
          <div className={`col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ${open ? '' : 'd-none'}`}>
            <ul className="">
              <li className='mb-2'>Home</li>
              <li className='mb-2'>About</li>
              <li className='mb-2'>Contact</li>
              <li className='mb-2'>Profile</li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )

  return createPortal(navMenu, document.getElementById("mobile_menu"))
}

export default MobileNav