import { Routes, Route } from "react-router-dom";
import Connection from "./components/Connection";
import Body from "./Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Feed from "./components/Feed";
import Requests from "./components/Requests";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Body />}>
          <Route path="/" element={<Feed />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
          <Route path="connection" element={<Connection />} />
          <Route path="requests" element={<Requests />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
