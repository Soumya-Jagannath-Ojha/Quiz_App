import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./Components/Admin";
import User from "./Components/User";

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Admin />}>
          <Route path="/admin"  element={<Admin />} />
          <Route path="/user"  element={<User />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App
