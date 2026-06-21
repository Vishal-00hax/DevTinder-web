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
import { PaymentSuccess, PaymentCancel } from "./components/PaymentStatus";

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
          <Route path="signup" element={<SignUp />} />
          <Route path="premium" element={<Premium />} />
          <Route path="success" element={<PaymentSuccess />} />
          <Route path="cancel" element={<PaymentCancel />} />
          <Route path="orders" element={<Orders />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
