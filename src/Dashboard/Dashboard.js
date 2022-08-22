import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div class="drawer drawer-mobile mt-10 mb-20">
        <input id="my-drawer" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content">
          {/* <!-- Page content here --> */}
          <h1 className='text-2xl text-center text-blue-700 uppercase font-bold'>WELCOME To your Dashboard</h1>
         <Outlet></Outlet>
        </div> 
        <div class="drawer-side">
          <label for="my-drawer" class="drawer-overlay"></label>
          <ul class="menu p-4 overflow-y-auto w-30 bg-base-100 text-base-content">
            {/* <!-- Sidebar content here --> */}
            <li className='text-secondary font-bold'><Link to='/dashboard'>MY PROFILE</Link></li>
            <li className='text-secondary font-bold'><Link to='/dashboard/addProduct'>ADD PRODUCT</Link></li>
            <li className='text-secondary font-bold'><Link to='/dashboard/manageProduct'>MANAGE PRODUCT</Link></li>
            <li className='text-secondary font-bold'><Link to='/dashboard/blog'>ADD BLOG</Link></li>
            <li className='text-secondary font-bold'><Link to='/dashboard/manageBlog'>MANAGE BLOG</Link></li>
            <li className='text-secondary font-bold'><Link to='/dashboard/user'>ALL USER</Link></li>
          </ul>
        </div>
      </div>
    );
};

export default Dashboard;