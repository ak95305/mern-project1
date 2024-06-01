import React, { useContext } from 'react'
import './header.css'
import fontawesome from '@fortawesome/fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { AuthContext } from '../Utils/contexts/auth-context';

function Header() {
  const auth = useContext(AuthContext);

  const logoutHandler = () => {
    if(confirm("Are you sure you want to logout?")){
     auth.logout(); 
    }
  }

  return (
    <>
      <header className='py-4 d-none d-md-block'>
        <div className="container">
          <div className="row">
            <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12">
              <a href="/">
                <div className="logo">
                  LOGO
                </div>
              </a>
            </div>
            <div className="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-12">
              <ul className="d-flex align-items-center gap-5 justify-content-end">
                <li><a href="/">Home</a></li>
                <li><a href="/users">Users</a></li>
                {
                  auth.isLoggedIn && <li><a className="btn btn-primary" href="/create-place">Create Place</a></li>
                }

                {
                  !auth.isLoggedIn && <li><a className="login_btn" href="/login"><FontAwesomeIcon icon={faUser} /> Login</a></li>
                }
                {
                  auth.isLoggedIn && <li><button className="btn btn-danger" onClick={logoutHandler}>Logout</button></li>
                }
              </ul>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header