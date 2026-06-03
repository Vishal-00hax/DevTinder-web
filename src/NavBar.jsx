import BrandLogo from "./components/BrandLogo";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useLogout from "./hooks/useLogout";

function NavBar() {
  const user = useSelector((store) => store.user);
  //console.log("User from NavBar:", user);
  const handleLogout = useLogout();

  return (
    <div className="navbar bg-base-100 shadow-sm px-2 sm:px-4">
      {/* LEFT SIDE */}
      <div className="flex-1">
        <Link to="/" className="text-xl font-bold">
          <BrandLogo />
        </Link>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-none">
        {!user ? (
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
        ) : (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full overflow-hidden">
                <img
                  alt="User Avatar"
                  src={
                    user.photoUrl ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-50 w-48 sm:w-52 p-2 shadow"
            >
              <li className="menu-title">
                <span className="text-xs sm:text-sm line-clamp-2">
                  Welcome {user.firstName} {user.lastName}
                </span>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/connection">Connections</Link>
              </li>
              <li>
                <Link to="/requests">Requests</Link>
              </li>
              <li>
                <button type="button" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar;
