import { Routes , Route } from "react-router-dom"
import HomePage from "./Pages/HomePage"
import SignUpPage from "./Pages/SignUpPage"
import LoginPage from "./Pages/LoginPage"
import Navbar from "./components/Navbar"

function App() {
  
  return (
    <div className="min-h-screen bg-gray-200 text-white relative overflow-hidden">
    <Navbar/>
    <Routes>
      <Route path='/' element={<HomePage/>}></Route>
      <Route path='/signup' element={<SignUpPage/>}></Route>
      <Route path='/login' element={<LoginPage/>}></Route>
    </Routes>
    </div>
    
  )
}

export default App
