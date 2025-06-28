import React, { useState, useEffect, Fragment } from 'react';
import { adminDropDownMenus } from "../constants/menus.js";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);

  const [displayedUsername, setDisplayedUsername] = useState(user?.username || '');
  const [displayedEmail, setDisplayedEmail] = useState(user?.email || '');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    newsletter: true
  });

  useEffect(() => {
    setDisplayedUsername(formData.username || user?.username || '');
    setDisplayedEmail(formData.email || user?.email || '');
  }, [formData, user]);

  return (
    <Fragment>
      <aside className="ap mradmin responsive-sidebar hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div className=' '>
          <div className=" items-center space-x-6">
            <div className="eleme w-24 h-24 rounded-full bg-gray-200 overflow-hidden">
              <img src={user?.profileImage} alt="Profile" className="elem" />
            </div>
            <div className="ele">
              <h1 className="p h1 hv text-2xl font-semibold">{displayedUsername}</h1>
              <p className="p text-gray-600">{displayedEmail}</p>

            </div>
          </div>

          {adminDropDownMenus.map((item, index) => (
            <Link
              key={index}
              className="hv active custom-container cus dropdow-items text-body-medium gap-4 menu-item"
              to={item.path}
            >
              <h6>{item.label}</h6>
            </Link>
          ))}
        </div>
      </aside>
    </Fragment>
  );
};

export default Sidebar;
