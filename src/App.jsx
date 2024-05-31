import './App.css'
import Header from './components/Header/Header'
import MobileNav from './components/MobileNav/MobileNav'

function App({children}) {
  return (
    <>
      <Header />
      <MobileNav />
      
      {children}

    </>
  )
}

export default App
