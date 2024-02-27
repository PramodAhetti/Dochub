import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './components/login'
import Home from "./components/home";
import Report from "./components/report";
import Newpost from './components/newpost'
import Nav from "./components/Nav";
import About from "./components/about"
import Signup from "./components/signup"
function App() {
  return (
    <div className="App">
      <BrowserRouter className="App">
        <Nav></Nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/near" element={<Report/>} />
          <Route path="/new" element={<Newpost />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
