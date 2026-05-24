import NavBar from "./NavBar"
import {Routes,Route} from 'react-router-dom';
import {Link} from 'react-router-dom';
import Body from "./Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Footer from "./Footer";

function App() {

  return (
    <>   
      <NavBar />
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
