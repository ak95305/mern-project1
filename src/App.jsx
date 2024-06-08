import { useCallback, useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import MobileNav from './components/MobileNav/MobileNav'
import { AuthContext } from './components/Utils/contexts/auth-context'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import UserPlaces from './scenes/UserPlaces/UserPlaces.jsx';
import UsersListing from './scenes/UserListing/UsersLIsting.jsx';
import CreatePlace from './scenes/Place/CreatePlace.jsx';
import EditPlace from './scenes/Place/EditPlace.jsx';
import Login from './scenes/Auth/Login.jsx';
import Signup from './scenes/Auth/Signup.jsx'
import { CookiesProvider, useCookies } from 'react-cookie'

function App({children}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [cookie, setCookie, removeCookie] = useCookies(['user', 'user-token'])
  
  const login = useCallback((formData) => {
    setIsLoggedIn(true);
  }, [])

  const logout = useCallback(() => {
    removeCookie('user')
    removeCookie('user-token')
    setIsLoggedIn(false);
  }, [])

  useEffect(()=>{
    if(cookie.user){
      setUser(cookie.user)
    }

    if(cookie['user-token']){
      setUserToken(cookie['user-token'])
    }

    if(cookie.user && cookie['user-token']){
      setIsLoggedIn(true)
    }
  }, [])
  
  let routes;
  if(isLoggedIn){
    routes = (
      <Routes>
        <Route path="/" element={<UsersListing />} />
        <Route path="/users" element={<UsersListing />} />
        <Route path="/user/:id" element={<UserPlaces />} />
        <Route path="/create-place" element={<CreatePlace />} />
        <Route path="/place/:id" element={<EditPlace />} />
        <Route path="*" element={<Navigate to="/users" />} />
      </Routes>
    );
  } else {
    routes = (
    <Routes>
      <Route path="/" element={<UsersListing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
    )
  }

  return (
    <CookiesProvider>
      <AuthContext.Provider value={{isLoggedIn, login, logout, user, userToken}}>
        <BrowserRouter>
          <Header />
          <MobileNav />
          
          {routes}
          
        </BrowserRouter>
      </AuthContext.Provider>
    </CookiesProvider>
  )
}

export default App
