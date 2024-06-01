import { useCallback, useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import MobileNav from './components/MobileNav/MobileNav'
import { AuthContext } from './components/Utils/contexts/auth-context'
import { BrowserRouter, Navigate, Route, RouterProvider, Routes, createBrowserRouter } from 'react-router-dom';
import UserPlaces from './scenes/UserPlaces/UserPlaces.jsx';
import UsersListing from './scenes/UserListing/UsersLIsting.jsx';
import CreatePlace from './scenes/Place/CreatePlace.jsx';
import EditPlace from './scenes/Place/EditPlace.jsx';
import Login from './scenes/Auth/Login.jsx';

function App({children}) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  
  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, [])

  const logout = useCallback(() => {
    setIsLoggedIn(false);
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
      <Route path="/users" element={<UsersListing />} />
      <Route path="/user/:id" element={<UserPlaces />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
    )
  }

  return (
    <AuthContext.Provider value={{isLoggedIn, login, logout}}>
      <BrowserRouter>
        <Header />
        <MobileNav />
        
        {routes}
        
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App
