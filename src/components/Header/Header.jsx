import React from 'react'
import './header.css'

function Header() {
  return (
    <>
      <header className='py-4 d-none d-md-block'>
        <div className="container">
          <div className="row">
            <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12">
              <div className="logo">
                LOGO
              </div>
            </div>
            <div className="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-12">
              <ul className="d-flex align-items-center gap-5 justify-content-end">
                <li><a href="/">Home</a></li>
                <li><a href="/users">Users</a></li>
                <li><a className="btn-primary" href="/create-place">Create Place</a></li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header