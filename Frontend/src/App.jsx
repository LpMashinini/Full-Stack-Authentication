import {Routes,Route} from "react-router-dom"
import Home from "./Components/Home"
import Register from "./Components/Register"
import Login from "./Components/Login"



const App = () => {

  return (

    <>

      <Routes>
        <Route path="/"element={<Home/>}></Route>
        <Route path="/register"element={<Register/>}></Route>
        <Route path="/login"element={<Login />}></Route>
      </Routes>

    </>

  )

}

export default App
