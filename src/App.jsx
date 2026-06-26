import { Routes, Route } from "react-router-dom";
import Connection from "./components/Connection";
import Body from "./Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Feed from "./components/Feed";
import Requests from "./components/Requests";
import SignUp from "./components/SignUp";
import Premium from "./components/Premium";
import Orders from "./components/Orders";
import Chats from "./components/Chats";
import axios from "axios";
import { BASE_URL } from "./utils/constents";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./utils/userSlice";
import { useNavigate } from "react-router-dom";
import { PaymentSuccess, PaymentCancel } from "./components/PaymentStatus";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const fetchUser = async () => {
    try {
      if (user) return;
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });

      dispatch(addUser(res.data.data));
    } catch (err) {
      if (err.response && err.response.status === 401) {
        navigate("/login");
      }
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <>
      <Routes>
        <Route element={<Body />}>
          <Route path="/" element={<Feed />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
          <Route path="connection" element={<Connection />} />
          <Route path="requests" element={<Requests />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="premium" element={<Premium />} />
          <Route path="success" element={<PaymentSuccess />} />
          <Route path="cancel" element={<PaymentCancel />} />
          <Route path="orders" element={<Orders />} />
          <Route path="chats/:chatUserId" element={<Chats />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
