import react from 'react'
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
        <aside id='sidebar'>
          <div id='top-sidebar'>
            <form>
              <input placeholder='Search..' type='text' className='form-control' />
            </form>
          </div>
          <div id='bottom-sidebar'>
            <ul>
              <li><Link to="/users"><i className='fa fa-users'></i>Users</Link></li>
              <li><Link to="/requests"><i className='fa fa-cog'></i>Vendor Requests</Link></li>
              <li><Link to="/venues"><i className='fa fa-cog'></i>Venues</Link></li>
              <li><Link to="/BridalMakeups"><i className='fa fa-cog'></i>BridalMakeups</Link></li>
              <li><Link to="/Groomwears"><i className='fa fa-cog'></i>Groomwears</Link></li>
              <li><Link to="/Bridalwears"><i className='fa fa-cog'></i>Bridalwears</Link></li>
              <li><Link to="/Mehndis"><i className='fa fa-cog'></i>Mahndis</Link></li>
              <li><Link to="/Photographers"><i className='fa fa-cog'></i>Photographers</Link></li>
              <li><Link to="/Planners"><i className='fa fa-cog'></i>Planners</Link></li>
              <li><a><i className='fa fa-sign-out'></i>Logout</a></li>
            </ul>
          </div>
        </aside>
  );
}

export default Sidebar;
