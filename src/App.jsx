import { Routes, Route } from "react-router-dom";
import Connection from "./components/Connection";
import Body from "./Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Feed from "./components/Feed";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Body />}>
          <Route path="/" element={<Feed />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
          <Route path="connection" element={<Connection />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
