import BrandLogo from './components/BrandLogo';
import {Link} from 'react-router-dom';

function NavBar () {
    return (
        <>
      <div className="navbar bg-base-100 shadow-sm px-4">
        <div className="flex-1 flex items-center gap-3">
         <Link to="/"><BrandLogo /></Link> 
        </div>
        <div className="flex gap-2 items-center">
          <div className="dropdown dropdown-end">            
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="User Avatar"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
              <li>
               
                 <Link to="/profile">Profile</Link>
                
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
        </>
    )
}

export default NavBar;